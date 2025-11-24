<script>
    import { onMount, onDestroy } from "svelte";

    export let start = 1;   // erster Index
    export let count = 10;  // wie viele Sticker
    export let ext = "jpg"; // Dateiendung
    export let size = 120;  // Kantenlänge in px
    export let rightFactor = 0.95; // how far to the right stickers may go (0..1)

    let container;
    let animationId;

    const stickers = Array.from({ length: count }, (_, i) => ({
        id: i,
        src: `/public/sticker/plim_sticker_${start + i}.${ext}`
    }));

    let positions = [];
    let velocities = [];

    function initPositions() {
        if (!container) return;

        const rect = container.getBoundingClientRect();

        // Box: left boundary at 0, right boundary at a factor of available width
        const fullRangeX = Math.max(rect.width - size, 0);
        const minX = 0;
        const maxX = fullRangeX * rightFactor; // allow more room to the right

        const maxY = Math.max(rect.height - size, 0);

        positions = stickers.map(() => ({
            x: minX + Math.random() * (maxX - minX),
            y: Math.random() * maxY
        }));

        velocities = stickers.map(() => {
            const speed = 0.8 + Math.random() * 0.6;
            const dirX = Math.random() < 0.5 ? -1 : 1;
            const dirY = Math.random() < 0.5 ? -1 : 1;
            return {
                vx: speed * dirX,
                vy: speed * dirY
            };
        });
    }

    function step() {
        if (!container) return;

        const rect = container.getBoundingClientRect();

        const fullRangeX = Math.max(rect.width - size, 0);
        const minX = 0;
        const maxX = fullRangeX * rightFactor;

        const maxY = Math.max(rect.height - size, 0);

        positions = positions.map((p, i) => {
            let { x, y } = p;
            let { vx, vy } = velocities[i];

            x += vx;
            y += vy;

            if (x <= minX) {
                x = minX;
                vx = Math.abs(vx);
            } else if (x >= maxX) {
                x = maxX;
                vx = -Math.abs(vx);
            }

            if (y <= 0) {
                y = 0;
                vy = Math.abs(vy);
            } else if (y >= maxY) {
                y = maxY;
                vy = -Math.abs(vy);
            }

            velocities[i] = { vx, vy };
            return { x, y };
        });

        animationId = requestAnimationFrame(step);
    }

    function handleClick(index) {
        if (!velocities[index]) return;
        velocities[index] = {
            vx: -velocities[index].vx * 1.2,
            vy: -velocities[index].vy * 1.2
        };
    }

    onMount(() => {
        initPositions();
        animationId = requestAnimationFrame(step);

        const onResize = () => initPositions();
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    });

    onDestroy(() => {
        if (animationId) cancelAnimationFrame(animationId);
    });
</script>

<style>
    .sticker-field {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
    }

    .sticker {
        position: absolute;
        width: var(--size, 120px);
        height: var(--size, 120px);
        object-fit: contain;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.03);
        cursor: pointer;
        will-change: transform;
        transition: transform 0.08s;

        /* nicht markierbar und nicht dragbar */
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
    }

    .sticker:active {
        transform: scale(0.96);
    }
</style>

<div
    class="sticker-field"
    bind:this={container}
    style={`--size: ${size}px`}
>
    {#each stickers as sticker, i}
        {#if positions[i]}
            <img
                src={sticker.src}
                alt=""
                class="sticker"
                draggable="false"
                on:dragstart|preventDefault
                on:click={() => handleClick(i)}
                style={`left: ${positions[i].x}px; top: ${positions[i].y}px;`}
            />
        {/if}
    {/each}
</div>
