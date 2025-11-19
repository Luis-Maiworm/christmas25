<script>
    import Snowflakes from './lib/Snowflakes.svelte';
    import Lights from './lib/Lights.svelte';
    import AnimatedDoor from './lib/AnimatedDoor.svelte';
    import DoorOne from './lib/doors/DoorOne.svelte';
    import BackgroundMusic from './lib/BackgroundMusic.svelte';
    // Hintergrundvideo aus public/ (Vite serviert /dialog-background.mp4)
    const bgVideoSrc = '/dialog-background.mp4';
    // const bgVideoSrc = '/background.mp4';
</script>

<!-- Fullscreen background video -->
<video class="app-bg" src={bgVideoSrc} autoplay muted loop playsinline aria-hidden="true"></video>
<!-- optional overlay um das Video abzudunkeln -->
<div class="app-bg-overlay" aria-hidden="true"></div>

<div class="app-content">
  <Snowflakes />
  <Lights />
  <!-- <BackgroundMusic /> -->

  <main>
    <h1>(Adventskalender 2025)</h1>
    <div class="door-container">

      {#each Array.from({ length: 24 }, (_, i) => i + 1) as day}
      <AnimatedDoor day={day}>
        <DoorOne />
      </AnimatedDoor>
      {/each}
    </div>

  </main>
</div>

<style>

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.door-container {
  display: grid;
  padding: 2rem;
  /* explicit 5 columns x 5 rows grid */
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  /* tighter fixed row height to make rows closer */
  grid-template-rows: repeat(5, 120px);
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
}

/* Responsive: on small screens show 2 columns per row */
@media (max-width: 640px) {
  .door-container {
    padding: 1.5rem;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    /* let rows size automatically to content height */
    grid-auto-rows: 120px;
    grid-template-rows: none;
    gap: 0.5rem;
    justify-items: center;
    align-items: center;
  }
  /* slightly reduce main padding on small screens */
  main {
    padding: 0.5rem;
  }
}

/* background video + overlay styling */
.app-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}
.app-bg-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.32);
  z-index: 1;
  pointer-events: none;
}
.app-content {
  position: relative;
  z-index: 2; /* sits above video + overlay */
}

</style>
