<script lang="ts">
  // versteckter Link als Props
  export let href = "https://isitchristmas.com/";
  export let label = "Geheimer Weihnachtslink";

  const candles = [0, 1, 2, 3];
  let lit = [false, false, false, false];
  let revealed = false;

  function toggle(index: number) {
    // Kerzen anzünden oder löschen
    lit[index] = !lit[index];

    // Link nur zeigen, wenn alle Kerzen brennen
    revealed = lit.every(Boolean);
  }
</script>

<style>
  .christmas-wrapper {
    position: relative;
    min-height: 320px;
    padding: 24px 16px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    border-radius: 18px;
    background: radial-gradient(circle at top, #233b5f 0%, #101827 45%, #050814 100%);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
    overflow: hidden;
    color: #f9fafb;
    text-align: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  }



  .title {
    position: relative;
    font-size: 1.1rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #e5e7eb;
  }

  .title span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .title-emoji {
    font-size: 1.5rem;
    filter: drop-shadow(0 0 6px rgba(252, 211, 77, 0.8));
  }

  .wreath-area {
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 20%, #234c34 0%, #0f3322 45%, #081915 100%);
    box-shadow:
      0 0 0 4px rgba(16, 185, 129, 0.3),
      0 0 30px rgba(16, 185, 129, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wreath-ring {
    position: absolute;
    inset: 18px;
    border-radius: 50%;
    border: 10px solid rgba(22, 163, 74, 0.6);
    box-shadow:
      0 0 0 3px rgba(5, 46, 22, 0.9),
      inset 0 0 20px rgba(6, 95, 70, 0.9);
  }

  .wreath-deco {
    position: absolute;
    inset: 32px;
    border-radius: 50%;
    pointer-events: none;
    background-image:
      radial-gradient(circle at 10% 20%, #f97316 0, transparent 60%),
      radial-gradient(circle at 80% 30%, #facc15 0, transparent 60%),
      radial-gradient(circle at 20% 80%, #ef4444 0, transparent 60%),
      radial-gradient(circle at 70% 75%, #22c55e 0, transparent 60%);
    opacity: 0.9;
  }

  .candles {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .candle {
    position: absolute;
    width: 32px;
    height: 70px;
    border-radius: 10px;
    background: linear-gradient(to bottom, #fef2f2, #fee2e2);
    box-shadow: 0 0 10px rgba(248, 250, 252, 0.4);
    cursor: pointer;
    user-select: none;
    -webkit-user-drag: none;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    transform-origin: center bottom;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .candle:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 0 16px rgba(248, 250, 252, 0.6);
  }

  .candle.lit {
    background: linear-gradient(to bottom, #fefce8, #fee2e2);
  }

  .candle-base {
    position: absolute;
    bottom: -10px;
    left: -6px;
    right: -6px;
    height: 14px;
    border-radius: 999px;
    background: radial-gradient(circle at 50% 0, #92400e 0, #451a03 60%);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  }

  .flame {
    margin-top: -14px;
    width: 16px;
    height: 24px;
    border-radius: 50% 50% 50% 50%;
    background: radial-gradient(circle at 50% 20%, #fbbf24 0, #f97316 45%, rgba(220, 38, 38, 0.2) 100%);
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.9);
    opacity: 0;
    transform-origin: center bottom;
    transform: scale(0.6);
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  .candle.lit .flame {
    opacity: 1;
    transform: scale(1);
    animation: flicker 0.23s infinite alternate;
  }

  @keyframes flicker {
    from {
      transform: scale(1) translateY(0);
      filter: drop-shadow(0 0 10px rgba(252, 211, 77, 0.9));
    }
    to {
      transform: scale(0.93) translateY(1px);
      filter: drop-shadow(0 0 6px rgba(252, 211, 77, 0.75));
    }
  }

  .candle-0 {
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
  }

  .candle-1 {
    top: 70px;
    right: 34px;
  }

  .candle-2 {
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
  }

  .candle-3 {
    top: 70px;
    left: 34px;
  }

  .hint {
    position: relative;
    font-size: 0.85rem;
    color: #e5e7eb;
    opacity: 0.9;
  }

  .hint span {
    background: rgba(15, 23, 42, 0.6);
    padding: 4px 10px;
    border-radius: 999px;
    backdrop-filter: blur(4px);
  }

  .secret-link-wrapper {
    position: relative;
    margin-top: 8px;
    min-height: 32px;
  }

  .secret-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    background: linear-gradient(to right, #f97316, #22c55e);
    color: #0b1120;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    box-shadow:
      0 0 16px rgba(248, 250, 252, 0.4),
      0 0 28px rgba(248, 250, 252, 0.3);
    transform-origin: center;
    animation: popIn 440ms ease-out;
  }

  @keyframes popIn {
    0% {
      transform: scale(0.4) translateY(12px);
      opacity: 0;
    }
    70% {
      transform: scale(1.06) translateY(0);
      opacity: 1;
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  .secret-link-emoji {
    font-size: 1.2rem;
  }
</style>

<div class="christmas-wrapper">

  <div class="title">
    <span>
      <span class="title-emoji">🕯️</span>
      Adventskranz Rätsel
      <span class="title-emoji">🎄</span>
    </span>
  </div>

  <div class="wreath-area" aria-label="Adventskranz">
    <div class="wreath-ring"></div>
    <div class="wreath-deco"></div>

    <div class="candles">
      {#each candles as c}
        <button
          type="button"
          class="candle candle-{c} {lit[c] ? 'lit' : ''}"
          on:click={() => toggle(c)}
          aria-label={`Kerze ${c + 1} ${lit[c] ? 'löschen' : 'anzünden'}`}
          draggable="false"
        >
          <div class="flame"></div>
          <div class="candle-base"></div>
        </button>
      {/each}
    </div>
  </div>

  <div class="hint">
    <span>
      Zünde alle vier Kerzen an und dein geheimer Weihnachtslink erscheint
    </span>
  </div>

  <div class="secret-link-wrapper">
    {#if revealed}
      <a class="secret-link" href={href} rel="noopener noreferrer" target="_blank">
        <span class="secret-link-emoji">✨</span>
        <span>{label}</span>
        <span class="secret-link-emoji">🎁</span>
      </a>
    {/if}
  </div>
</div>
