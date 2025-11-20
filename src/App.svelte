<script>
    import Snowflakes from './lib/Snowflakes.svelte';
    import Lights from './lib/Lights.svelte';
  import AnimatedDoor from './lib/AnimatedDoor.svelte';
    import BackgroundMusic from './lib/BackgroundMusic.svelte';
  import DoorQRCodeWebsite from './lib/doors/DoorQRCodeWebsite.svelte';
  import DoorMate from './lib/doors/DoorMate.svelte';
  import Door01099 from './lib/doors/Door01099.svelte';
  import DoorCuteAnimals from './lib/doors/DoorCuteAnimals.svelte';
  import DoorWeisheit from './lib/doors/DoorWeisheit.svelte';
  import DoorCafe from './lib/doors/DoorCafe.svelte';
  import DoorSpotify from './lib/doors/DoorSpotify.svelte';
  import DoorQRCodeRoute from './lib/doors/DoorQRCodeRoute.svelte';
  import DoorImageCute from './lib/doors/DoorImageCute.svelte';
  import DoorStickerSammlung from './lib/doors/DoorStickerSammlung.svelte';
  import DoorGifSammlung from './lib/doors/DoorGifSammlung.svelte';
  import DoorGemeinschaftskonto from './lib/doors/DoorGemeinschaftskonto.svelte';
  import DoorGemeinschaftskontoAdd from './lib/doors/DoorGemeinschaftskontoAdd.svelte';
  import DoorKrppelchen from './lib/doors/DoorKräppelchen.svelte';
  import DoorHelp from './lib/doors/DoorHelp.svelte';
  import DoorGlhwein from './lib/doors/DoorGlühwein.svelte';
  import DoorVHS from './lib/doors/DoorVHS.svelte';
  const bgVideoSrc = '/dialog-background.mp4';
  // hardcoded map: day (1..24) -> Svelte component
  // Edit these assignments to control which component appears for each day.
  const doorMap = new Map([
    [0, DoorHelp],
    [1, DoorMate],
    [2, DoorQRCodeWebsite],
    [3, Door01099],
    [4, DoorCuteAnimals],
    [5, DoorWeisheit],
    [6, DoorCafe],
    [7, DoorGemeinschaftskonto],
    [8, DoorKrppelchen], // Kräppelchen -> für den 10.
    [9, DoorGlhwein], // Glühwein
    [10, DoorQRCodeRoute], // 10!
    [11, DoorHelp],
    [12, DoorHelp],
    
    [13, DoorSpotify],
    [14, DoorGemeinschaftskonto],
    [15, DoorImageCute],
    [16, DoorGifSammlung],
    [17, DoorHelp],
    [18, DoorHelp],
    [19, DoorHelp],
    [20, DoorStickerSammlung],
    [21, DoorGemeinschaftskontoAdd],
    [22, DoorHelp],
    [23, DoorHelp],
    [24, DoorVHS],
  ]);

  // precompute ordered entries for iteration
  const doorEntries = Array.from(doorMap.entries()).sort((a, b) => a[0] - b[0]);
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

      <!-- use a list of component constructors so each slot can render a variable component -->
      {#each doorEntries as [day, DoorComponent]}
        <AnimatedDoor day={day} let:opened>
          <svelte:component this={DoorComponent} opened={opened} day={day}/>
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
  h1 {
    font-size: 2rem;
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
