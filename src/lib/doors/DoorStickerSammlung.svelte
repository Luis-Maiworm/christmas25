<script>
    export let start = 1;       // first index
    export let count = 12;      // how many sequential stickers to try
    export let ext = "jpg";     // file extension (png, jpg, webp, ...)
    export let size = 120;      // visual size in px

</script>

<style>
    :global(.sticker-grid) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
        gap: 10px;
        align-items: start;
    }
    figure {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-size: 12px;
        color: var(--muted, #666);
    }
    img {
        width: var(--size, 120px);
        height: var(--size, 120px);
        object-fit: contain;
        border-radius: 6px;
        background: rgba(0,0,0,0.03);
        cursor: pointer;
        transition: transform .12s ease;
    }
    img:active { transform: scale(.98); }
    figcaption { margin-top: 6px; }
</style>

<div class="sticker-grid" style="--size: {size}px">
    {#each { length: 10 }, i}
        <figure>
            <img
                src={`/public/sticker/plim_sticker_${i+1}.jpg`}
            />
        </figure>
    {/each}
</div>