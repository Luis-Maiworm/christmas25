<script lang="ts">
  import { onMount } from 'svelte';
    import { playSound } from './playSound';

  // persisted open state
  let opened = false;

  // day provided by parent (1-24)
  export let day: number = 24;
  export let storageKeyPrefix = 'christmas25-door-';
  // optional override for current time (useful for testing)
  export let now: string | Date | undefined = undefined;

  const storageKey = () => `${storageKeyPrefix}${day}`;

  // computed availability: only interactable on or after day.Dec.2025
  $: current = now ? new Date("25-12-23") : new Date();
  // $: current = now ? new Date(now) : new Date();

//   $: targetDate = new Date(2025, 11, Number(day)); // month 11 = December
  $: targetDate = new Date(2025, 10, Number(day)); // month 11 = December
  $: interactable = current >= targetDate;
//   $: interactable = true;

  // read persisted state on mount
  onMount(() => {
    try {
      const v = localStorage.getItem(storageKey());
      if (v !== null) opened = v === 'true';
    } catch (e) {
      // ignore storage errors
    }
  });

  // only show opened UI if the door is interactable (don't reveal early)
  $: displayOpened = opened && interactable;

  function persistOpened() {
    try {
      localStorage.setItem(storageKey(), String(opened));
    } catch (e) {
      // ignore quota/disabled errors
    }
  }

  export function open() {
    if (!interactable) return;
    opened = true;
    persistOpened();
  }

  export function toggle() {
    if (!interactable) return;
    // If any dialog is currently open, ignore clicks so underlying doors don't toggle.
    if (typeof document !== 'undefined' && document.querySelector('dialog[open]')) return;
  if (!opened) playSound("door.mp3", { overlap: true });
    opened = !opened;
    persistOpened();
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  }
</script>

<style>
  :root {
    --door-speed: 1s;
    --door-delay: 0.15s;
    --easing: cubic-bezier(.06,.63,0,1);
    --door-scale: 0.5; /* scale entire door (50%) */
  }

  .wrap{
    width: 200px;
    height: 200px;
    color: #fff;
    font-size: 38px;
    position: relative;
    /* margin: 10vh auto; */
    text-align: center;
    font-weight: bold;
    background: linear-gradient(135deg, rgba(169,3,41,1) 0%, rgba(143,2,34,1) 44%, rgba(109,0,25,1) 100%);
    background-size: cover;
    border: 15px solid #fff;
    text-shadow: 0 0 30px rgba(255,255,255,0.8);
    box-shadow: 0 0 10px rgba(0,0,0,0.3) inset;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    /* scale the whole door to make it smaller without rewriting dimensions */
    transform: scale(var(--door-scale));
    transform-origin: center center;
  }

  .wrap.disabled {
    filter: grayscale(100%);
    opacity: 0.65;
    cursor: not-allowed;
    /* keep accessibility but indicate disabled */
  }

  .surprise-wrapper {
  }

  .day{
    position: absolute;
    top: 0;
    left: 0;
    height: 200px;
    width: 200px;
    line-height: 180px;
    text-align: center;
    z-index: 100;
    font-weight: bold;
    color: #fff;
    font-size: 72px;
    opacity: 1;
    text-shadow: -4px 3px 0 rgba(255,255,255,0.4);
    pointer-events: none;
  }

  .left,
  .right{
    width: 100px;
    height: 200px;
    background: #d91031;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    border: 10px solid #950d23;
  }

  .left{ left: 0; transform-origin: 0% 50%; }
  .right{ right: 0; transform-origin: 100% 50%; z-index: 50; }

  .left::before,
  .left::after{
    content: "";
    position: absolute;
    width: 6px;
    height: 30px;
    background: #000;
    border-radius: 10px;
    left: -12px;
  }

  .left::after{ bottom: 0; }
  .right::before,
  .right::after{
    content: "";
    position: absolute;
    width: 6px;
    height: 30px;
    background: #000;
    border-radius: 10px;
    right: -12px;
  }

  .right::after{ bottom: 0; }

  .panel{
    width: 60px;
    height: 160px;
    background: rgba(0,0,0,0.1);
    border-top: 2px solid rgba(255,255,255,0.2);
    border-left: 2px solid rgba(255,255,255,0.2);
    border-right: 2px solid rgba(0,0,0,0.1);
    border-bottom: 2px solid rgba(0,0,0,0.1);
    position: absolute;
    top: 8px;
    left: 8px;
  }

  @keyframes open-left {
    from { transform: perspective(500px) rotateY(0deg); }
    to {
      transform: perspective(500px) rotateY(-110deg);
      background: #a70a24;
      box-shadow: 10px 0 5px rgba(0,0,0,0.1);
    }
  }

  @keyframes open-right {
    from { transform: perspective(500px) rotateY(0deg); }
    to {
      transform: perspective(500px) rotateY(110deg);
      background: #a70a24;
      box-shadow: -10px 0 5px rgba(0,0,0,0.1);
    }
  }

  @keyframes day-hide {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.6); }
  }

  .wrap.open .left{
    animation: open-left var(--door-speed) var(--easing) var(--door-delay) both 1;
  }

  .wrap.open .right{
    animation: open-right var(--door-speed) var(--easing) var(--door-delay) both 1;
  }

  .wrap.open .day{
    animation: day-hide 0.22s ease 0.1s forwards;
  }


</style>

<div
  class="wrap"
  class:open={displayOpened}
  class:disabled={!interactable}
  role="button"
  aria-expanded={displayOpened}
  aria-disabled={!interactable}
  tabindex={interactable ? 0 : -1}
  on:click={toggle}
  on:keydown={onKey}
>
  <div class="day">{day}</div>

  <span class="surprise-wrapper">
    <slot />
  </span>

  <div class="left">
    <div class="panel"></div>
  </div>
  <div class="right">
    <div class="panel"></div>
  </div>
</div>
