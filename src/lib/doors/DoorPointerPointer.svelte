<script>
    import { onMount, onDestroy } from 'svelte';

    // default to pointerpointer, but can be overridden if needed
    export let src = 'https://pointerpointer.com/';
    export let height = '600px';

    let loaded = false;
    let failed = false;
    let timeoutId;

    function handleLoad() {
        loaded = true;
        failed = false;
        clearTimeout(timeoutId);
    }

    onMount(() => {
        // If iframe doesn't load within 3s, show fallback (likely due to X-Frame-Options)
        timeoutId = setTimeout(() => {
            if (!loaded) failed = true;
        }, 3000);
    });

    onDestroy(() => clearTimeout(timeoutId));
</script>

<style>
    .container {
        width: 100%;
        height: var(--height);
        max-width: 100%;
        position: relative;
        border: 1px solid #e6e6e6;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
    }

    iframe {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
    }

    .fallback {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(255,255,255,0.95);
        text-align: center;
        font-size: 14px;
        color: #222;
    }

    .fallback a {
        color: #0366d6;
        text-decoration: none;
        margin-left: 0.25rem;
    }
</style>

<div class="container" style="--height: {height}">
    <iframe
        src={src}
        title="PointerPointer"
        on:load={handleLoad}
        sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
    {#if failed}
        <div class="fallback" role="status" aria-live="polite">
            Embedding blocked or failed. Open PointerPointer in a new tab:
            <a href={src} target="_blank" rel="noopener noreferrer">{src}</a>
        </div>
    {/if}
</div>