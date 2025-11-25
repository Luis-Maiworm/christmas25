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
  import DoorPointerPointer from './lib/doors/DoorPointerPointer.svelte';
  import DoorPeruThrowback from './lib/doors/DoorPeruThrowback.svelte';
    import DoorQuiz from './lib/doors/DoorQuiz.svelte';
  import DoorPeruThrowback2 from './lib/doors/DoorPeruThrowback2.svelte';
  import DoorPeruThrowback3 from './lib/doors/DoorPeruThrowback3.svelte';
  import DoorIsItChristmas from './lib/doors/DoorIsItChristmas.svelte';
  import DoorIsItChristmas2 from './lib/doors/DoorIsItChristmas2.svelte';
  const bgVideoSrc = import.meta.env.BASE_URL + '/dialog-background.mp4';
  
  // @ts-ignore
  const doorMap = new Map([
    [0, DoorHelp],
    [1, DoorMate],
    [2, DoorQRCodeWebsite],
    [3, Door01099],
    [4, DoorQuiz],
    [5, DoorWeisheit],
    [6, DoorCafe],
    [7, DoorGemeinschaftskonto],
    [8, DoorKrppelchen], // Kräppelchen -> für den 10.
    [9, DoorGlhwein], // Glühwein
    [10, DoorQRCodeRoute], // 10!
    // [11, DoorPodcast?],
    [12, DoorStickerSammlung],
    [13, DoorSpotify],
    [14, DoorGemeinschaftskonto],
    [15, DoorImageCute],
    [16, DoorPeruThrowback],
    [17, DoorPointerPointer],
    [18, DoorCuteAnimals],
    [19, DoorPeruThrowback2],
    [20, DoorIsItChristmas],
    [21, DoorGemeinschaftskontoAdd],
    // [22, DoorHelp],
    [23, DoorPeruThrowback3],
    [24, DoorVHS],
    [25, DoorIsItChristmas2],
  ]);

  // precompute ordered entries for iteration (by day key)
  const doorEntries = Array.from(doorMap.entries()).sort((a, b) => a[0] - b[0]);

  // shuffle a copy for a randomized layout (Fisher-Yates)
  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const doorEntriesRandom = shuffle(doorEntries);
  const now = new Date(2025, 11, 25, 18, 0, 0);
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
      {#each doorEntriesRandom as [day, DoorComponent]}
        <AnimatedDoor
        now={now}
        day={day}
        let:opened>
          <svelte:component this={DoorComponent} opened={opened} day={day}/>
        </AnimatedDoor>
      {/each}
      {#if now >= new Date(2025, 11, 24)}
        <AnimatedDoor
          now={now}
          day={25}
          let:opened>
          <DoorHelp opened={opened} day={25} />
        </AnimatedDoor>
      {/if}
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
