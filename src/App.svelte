<script>
    import Snowflakes from './lib/Snowflakes.svelte';
    import Lights from './lib/Lights.svelte';
    import AnimatedDoor from './lib/AnimatedDoor.svelte';
    import DoorOne from './lib/doors/DoorOne.svelte';
    import BackgroundMusic from './lib/BackgroundMusic.svelte';


    
</script>

<Snowflakes />
<Lights />
<!-- <BackgroundMusic /> -->

<main>
  <div class="door-container">

    {#each Array.from({ length: 24 }, (_, i) => i + 1) as day}
    <AnimatedDoor day={day}>
      <DoorOne />
    </AnimatedDoor>
    {/each}
  </div>

</main>

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
  padding: 5rem;
  /* explicit 5 columns x 5 rows grid */
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  /* tighter fixed row height to make rows closer */
  grid-template-rows: repeat(5, 120px);
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
}

</style>
