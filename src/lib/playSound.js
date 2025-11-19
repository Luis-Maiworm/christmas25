/**
 * Small audio helper to create and control Audio objects.
 * - Reuses Audio instances per-src to avoid duplicate downloads.
 * - Provides play/pause/stop/setVolume/unload helpers.
 * - Handles autoplay blocking by scheduling a retry on first user gesture.
 *
 * Usage:
 * import { createSound, playSound } from './lib/playSound.js';
 * const s = createSound('/assets/click.mp3', { volume: 0.6 });
 * // attempt to play and optionally handle a rejected play() promise
 * s.play().catch(() => {});
 *
 * or quick-play:
 * playSound('/assets/jingle.mp3', { volume: 0.3, loop: true });
 */

const registry = new Map(); // src -> HTMLAudioElement

/**
 * @typedef {Object} SoundOptions
 * @property {number} [volume]
 * @property {boolean} [loop]
 * @property {boolean} [preload]
 * @property {boolean} [autoplay]
 * @property {boolean} [overlap]
 */

const CUSTOM_VOLUME = 1;

/**
 * Create (or reuse) an audio controller for a given src
 * @param {string} src - URL to the audio file
 * @param {SoundOptions} [opts]
 */
export function createSound(src, opts = {}) {
  const { volume = CUSTOM_VOLUME, loop = false, preload = true } = opts;

  let audio = registry.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = preload ? 'auto' : 'none';
    registry.set(src, audio);
  }

  audio.loop = !!loop;
  audio.volume = typeof volume === 'number' ? volume : CUSTOM_VOLUME;

  let pendingTryPlay = null;

  function _scheduleTryPlay() {
    if (pendingTryPlay) return;
    const tryPlay = () => {
      audio.play().catch(() => {});
      document.removeEventListener('click', tryPlay);
      pendingTryPlay = null;
    };
    pendingTryPlay = tryPlay;
    document.addEventListener('click', tryPlay, { once: true });
  }

  return {
    /**
     * Attempt to play the audio. Returns the play() promise or rejects if play blocked.
     * If blocked, a retry on user click is scheduled.
     */
    play() {
      try {
        const p = audio.play();
        // some browsers return undefined for play(); normalize to Promise
        if (p && typeof p.then === 'function') {
          return p.catch((err) => {
            // schedule a retry on user gesture
            _scheduleTryPlay();
            throw err;
          });
        }
        return Promise.resolve();
      } catch (err) {
        _scheduleTryPlay();
        return Promise.reject(err);
      }
    },
    pause() {
      audio.pause();
    },
    stop() {
      audio.pause();
      try { audio.currentTime = 0; } catch (e) {}
    },
    setVolume(v) {
      audio.volume = Math.max(0, Math.min(1, Number(v) || 0));
    },
    isPlaying() {
      return !!audio && !audio.paused && !audio.ended;
    },
    /**
     * Remove the audio from memory. Stops playback and clears src.
     */
    unload() {
      try {
        audio.pause();
        audio.src = '';
      } catch (e) {}
      registry.delete(src);
    },
    /** direct access to the HTMLAudioElement if needed */
    audio,
  };
}

/**
 * Convenience: create and optionally play immediately.
 * @param {string} src
 * @param {{volume?:number, loop?:boolean, preload?:boolean, autoplay?:boolean}} opts
 */
export function playSound(src, opts = {}) {
  // opts: { autoplay?, overlap?, volume?, loop?, preload? }
  const { autoplay = true, overlap = false } = /** @type {any} */ (opts || {});

  // If overlap requested, create a transient Audio instance per call so multiple
  // playbacks of the same src can sound simultaneously.
  if (overlap) {
    const { volume = CUSTOM_VOLUME, loop = false, preload = true } = opts;
    const audio = new Audio(src);
    audio.preload = preload ? 'auto' : 'none';
    audio.loop = !!loop;
    audio.volume = typeof volume === 'number' ? volume : CUSTOM_VOLUME;

    let pendingTryPlay = null;
    function _scheduleTryPlay() {
      if (pendingTryPlay) return;
      const tryPlay = () => {
        audio.play().catch(() => {});
        document.removeEventListener('click', tryPlay);
        pendingTryPlay = null;
      };
      pendingTryPlay = tryPlay;
      document.addEventListener('click', tryPlay, { once: true });
    }

    const ctl = {
      play() {
        try {
          const p = audio.play();
          if (p && typeof p.then === 'function') {
            return p.catch((err) => {
              _scheduleTryPlay();
              throw err;
            });
          }
          return Promise.resolve();
        } catch (err) {
          _scheduleTryPlay();
          return Promise.reject(err);
        }
      },
      pause() {
        audio.pause();
      },
      stop() {
        audio.pause();
        try { audio.currentTime = 0; } catch (e) {}
      },
      setVolume(v) {
        audio.volume = Math.max(0, Math.min(1, Number(v) || 0));
      },
      isPlaying() {
        return !!audio && !audio.paused && !audio.ended;
      },
      unload() {
        try {
          audio.pause();
          audio.src = '';
        } catch (e) {}
      },
      audio,
    };

    if (autoplay) {
      ctl.play().catch(() => {});
    }
    return ctl;
  }

  const { autoplay: _a = true } = opts;
  const ctl = createSound(src, opts);
  if (_a) {
    // attempt to play but don't throw if blocked
    ctl.play().catch(() => {});
  }
  return ctl;
}

export default { createSound, playSound };
