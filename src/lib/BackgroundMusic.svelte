<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // simple background audio: no UI, no storage, autoplay fallback
  export let src = "jingle.mp3";
  export let volume = 0.3;

  let audio: HTMLAudioElement;

  onMount(() => {
    if (audio) {
      audio.volume = volume;
      audio.loop = true;

      const tryPlay = () => {
        audio.play().catch(() => {});
        document.removeEventListener('click', tryPlay);
      };

      // attempt to play immediately; if blocked, retry on first user click
      audio.play().catch(() => {
        document.addEventListener('click', tryPlay);
      });
    }
  });

  onDestroy(() => {
    if (audio) {
      audio.pause();
      audio.src = '';
    }
  });
</script>

<!-- Unsichtbares Audioelement, läuft automatisch falls erlaubt -->
<audio bind:this={audio} src={src} style="display:none"></audio>

