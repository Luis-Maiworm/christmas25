
<script>
    import Door from './Door.svelte';
    import DoorOne from './doors/DoorOne.svelte';
    
    export let days = 24;
</script>


<style>

/* .door-list-wrapper {
    display: flex;
    justify-content: center;
} */

.door-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    padding: 1rem;
    justify-items: center;
}

</style>

<div class="door-list-wrapper">
    <div class="door-list">
        <Door day={1}>
            <DoorOne />
        </Door>
    </div>
</div>
