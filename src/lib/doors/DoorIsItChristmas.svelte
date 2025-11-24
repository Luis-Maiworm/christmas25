<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    export let secretUrl = "https://isitchristmas.com/";
    export let secretLabel = "Dein geheimes Geschenk";

    let revealed = false;
    let hintShown = false;

    const glow = tweened(0, {
        duration: 800,
        easing: cubicOut
    });

    function handleBaubleClick(index) {
        // Die mittlere Kugel ist die richtige
        if (index === 1) {
            revealed = true;
            glow.set(1);
        } else {
            hintShown = true;
        }
    }
</script>

<style>
    .christmas-wrapper {
        position: relative;
        padding: 24px;
        border-radius: 18px;
        background: radial-gradient(circle at top, #1f3b57, #050716);
        color: #fff;
        overflow: hidden;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
        max-width: 420px;
        margin: 0 auto;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .title {
        text-align: center;
        font-size: 1.3rem;
        margin-bottom: 0.4rem;
    }

    .subtitle {
        text-align: center;
        font-size: 0.9rem;
        opacity: 0.9;
        margin-bottom: 1.4rem;
    }

    .tree-area {
        position: relative;
        margin: 0 auto;
        width: 220px;
        height: 260px;
    }

    .tree {
        position: absolute;
        inset: 0;
        margin: auto;
        width: 0;
        height: 0;
        border-left: 110px solid transparent;
        border-right: 110px solid transparent;
        border-bottom: 180px solid #16542f;
        filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    }

    .tree::before,
    .tree::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-left: 90px solid transparent;
        border-right: 90px solid transparent;
        border-bottom: 150px solid #1b6a3d;
    }

    .tree::before {
        top: -70px;
        border-left-width: 80px;
        border-right-width: 80px;
        border-bottom-width: 130px;
        border-bottom-color: #1f7c46;
    }

    .tree::after {
        top: -130px;
        border-left-width: 60px;
        border-right-width: 60px;
        border-bottom-width: 100px;
        border-bottom-color: #259553;
    }

    .trunk {
        position: absolute;
        bottom: 10px;
        left: 50%;
        width: 40px;
        height: 40px;
        transform: translateX(-50%);
        background: #5a331b;
        border-radius: 6px;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    }

    .bauble {
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.7);
        background: radial-gradient(circle at 30% 20%, #fff, rgba(255, 255, 255, 0.1));
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        backdrop-filter: blur(2px);
        user-select: none;
        -webkit-user-drag: none;
        transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    }

    .bauble:hover {
        transform: scale(1.1) translateY(-2px);
        box-shadow: 0 0 16px rgba(255, 255, 255, 0.55);
    }

    .bauble:active {
        transform: scale(0.95) translateY(1px);
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
    }

    .bauble-0 {
        top: 120px;
        left: 75px;
        background: radial-gradient(circle at 30% 20%, #ffe5f0, #e0246a);
    }

    .bauble-1 {
        top: 90px;
        right: 72px;
        background: radial-gradient(circle at 30% 20%, #fff7d9, #ffb300);
    }

    .bauble-2 {
        top: 155px;
        right: 88px;
        background: radial-gradient(circle at 30% 20%, #eaffff, #00bcd4);
    }

    .star {
        position: absolute;
        top: -140px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.6rem;
        text-shadow: 0 0 12px rgba(255, 221, 130, 0.9);
        pointer-events: none;
    }

    .present-row {
        margin-top: 260px;
        display: flex;
        justify-content: center;
        gap: 12px;
    }

    .present {
        width: 46px;
        height: 46px;
        border-radius: 10px;
        background: linear-gradient(135deg, #e53935, #8e24aa);
        position: relative;
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
    }

    .present::before,
    .present::after {
        content: "";
        position: absolute;
        background: rgba(255, 255, 255, 0.8);
    }

    .present::before {
        inset: 0 45%;
    }

    .present::after {
        inset: 45% 0;
    }

    .present-ribbon {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 26px;
        height: 16px;
        border-radius: 14px 14px 0 0;
        background: linear-gradient(135deg, #ffcdd2, #f8bbd0);
    }

    .message {
        margin-top: 1.2rem;
        font-size: 0.85rem;
        text-align: center;
        opacity: 0.9;
    }

    .hint {
        margin-top: 0.4rem;
        text-align: center;
        font-size: 0.78rem;
        opacity: 0.7;
        font-style: italic;
    }

    .secret-link {
        margin-top: 1.2rem;
        text-align: center;
    }

    .secret-link a {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        text-decoration: none;
        font-size: 0.85rem;
        background: linear-gradient(135deg, #ffb300, #ff7043);
        color: #241000;
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.45);
        user-select: none;
        -webkit-user-drag: none;
    }

    .secret-link a span {
        font-weight: 600;
    }

    .secret-link a:hover {
        transform: translateY(-1px);
    }

    .secret-link a:active {
        transform: translateY(1px) scale(0.97);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }

    .snowflake {
        position: absolute;
        top: -10px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        opacity: 0.7;
        animation: fall 8s linear infinite;
        filter: blur(0.3px);
        pointer-events: none;
    }

    .snowflake:nth-child(1) { left: 5%; animation-duration: 9s; animation-delay: 0s; }
    .snowflake:nth-child(2) { left: 20%; animation-duration: 7s; animation-delay: 2s; }
    .snowflake:nth-child(3) { left: 35%; animation-duration: 10s; animation-delay: 1s; }
    .snowflake:nth-child(4) { left: 55%; animation-duration: 8s; animation-delay: 3s; }
    .snowflake:nth-child(5) { left: 75%; animation-duration: 6s; animation-delay: 4s; }
    .snowflake:nth-child(6) { left: 90%; animation-duration: 11s; animation-delay: 1.5s; }

    @keyframes fall {
        0% {
            transform: translateY(-10px);
            opacity: 0;
        }
        10% {
            opacity: 0.9;
        }
        100% {
            transform: translateY(280px);
            opacity: 0;
        }
    }
</style>

<div class="christmas-wrapper">
    {#each Array(6) as _, i}
        <div class="snowflake"></div>
    {/each}

    <div class="title">Merry little Easter Egg</div>
    <div class="subtitle">
        Irgendwo im Baum wartet ein geheimes Geschenk
    </div>

    <div class="tree-area" aria-hidden="true">
        <div class="tree">
            <div class="star">⭐</div>
        </div>
        <div class="trunk"></div>

        <button
            class="bauble bauble-0"
            type="button"
            on:click={() => handleBaubleClick(0)}
            aria-label="Weihnachtskugel"
        >
            🎄
        </button>

        <button
            class="bauble bauble-1"
            type="button"
            on:click={() => handleBaubleClick(1)}
            aria-label="Weihnachtskugel"
        >
            🎁
        </button>

        <button
            class="bauble bauble-2"
            type="button"
            on:click={() => handleBaubleClick(2)}
            aria-label="Weihnachtskugel"
        >
            ⛄
        </button>

        <div class="present-row">
            <div class="present">
                <div class="present-ribbon"></div>
            </div>
            <div class="present">
                <div class="present-ribbon"></div>
            </div>
            <div class="present">
                <div class="present-ribbon"></div>
            </div>
        </div>
    </div>

    <div class="message">
        Drei Kugeln eine davon verrät dir mehr
    </div>

    {#if hintShown && !revealed}
        <div class="hint">
            Die goldene Kugel wirkt irgendwie besonders
        </div>
    {/if}

    {#if revealed}
        <div class="secret-link" style={`opacity: {$glow}; transform: scale(${0.96 + $glow * 0.08});`}>
            <a href={secretUrl} target="_blank" rel="noreferrer">
                <span>✨ {secretLabel}</span>
            </a>
        </div>
    {/if}
</div>
