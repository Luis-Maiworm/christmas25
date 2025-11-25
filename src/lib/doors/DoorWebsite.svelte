<script>
    // Links die du von außen übergeben kannst
    // zum Beispiel <ChristmasSearch giftLinks={["/door/1", "/door/2", "/door/3"]} />
    export let giftLinks = [
        "https://www.top-rated.online/",
        "https://whatthefuckshouldimakefordinner.com/",
        "https://goblin.tools/"
    ];

    // Einfaches Gitter mit ein paar Weihnachtswörtern
    // Die Startfelder von "STAR", "GIFT" und "SNOW" enthalten die versteckten Links
    const cells = [
        { id: 0,  char: "S", special: 0 },
        { id: 1,  char: "T", special: null },
        { id: 2,  char: "A", special: null },
        { id: 3,  char: "R", special: null },
        { id: 4,  char: "X", special: null },

        { id: 5,  char: "G", special: 1 },
        { id: 6,  char: "I", special: null },
        { id: 7,  char: "F", special: null },
        { id: 8,  char: "T", special: null },
        { id: 9,  char: "Y", special: null },

        { id: 10, char: "S", special: 2 },
        { id: 11, char: "N", special: null },
        { id: 12, char: "O", special: null },
        { id: 13, char: "W", special: null },
        { id: 14, char: "Z", special: null },

        { id: 15, char: "E", special: null },
        { id: 16, char: "L", special: null },
        { id: 17, char: "F", special: null },
        { id: 18, char: "E", special: null },
        { id: 19, char: "N", special: null },

        { id: 20, char: "H", special: null },
        { id: 21, char: "O", special: null },
        { id: 22, char: "L", special: null },
        { id: 23, char: "L", special: null },
        { id: 24, char: "Y", special: null }
    ];

    let activeId = null;
    let found = new Set(); // speichert gefundene Indexe 0 1 2

    function handleClick(cell) {
        activeId = cell.id;

        // kleine Glitzerbewegung nur visuell
        if (cell.special !== null && giftLinks[cell.special]) {
            found.add(cell.special);
            // neue Instanz erzeugen damit Svelte das Set registriert
            found = new Set(found);
        }
    }

</script>

<style>
    .puzzle-wrapper {
        max-width: 420px;
        margin: 0 auto;
        padding: 18px 20px 24px;
        border-radius: 16px;
        background: radial-gradient(circle at top, #fffbf0 0%, #f6e6ff 46%, #dde9ff 100%);
        box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
        position: relative;
        overflow: hidden;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    }

    .puzzle-wrapper::before {
        content: "❄";
        position: absolute;
        font-size: 72px;
        opacity: 0.08;
        top: -10px;
        right: 20px;
    }

    h2 {
        margin: 0 0 8px;
        font-size: 1.3rem;
        text-align: center;
        color: red;
    }

    .hint {
        font-size: 0.9rem;
        text-align: center;
        margin-bottom: 14px;
        color: #5b3b4d;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(5, 52px);
        grid-auto-rows: 52px;
        gap: 6px;
        justify-content: center;
        margin-bottom: 16px;
    }

    .cell {
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.92);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
        transform: translateY(0);
        transition:
            transform 0.12s ease,
            box-shadow 0.12s ease,
            background 0.15s ease,
            border-color 0.15s ease;
        user-select: none;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: red;
    }

    .cell span {
        pointer-events: none;
    }

    .cell:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.12);
    }

    .cell.active {
        background: linear-gradient(135deg, #ffdee9, #b5fffc);
        border-color: #f35a8f;
        box-shadow: 0 0 0 2px rgba(243, 90, 143, 0.5);
    }

    .cell.found {
        background: linear-gradient(135deg, #ffe4b3, #ffd4f5);
        border-color: #f1b500;
    }

    .word-hints {
        font-size: 0.9rem;
        text-align: center;
        margin-bottom: 10px;
        color: #63435f;
    }

    .word-hints span {
        font-weight: 600;
        color: #b1204b;
    }

    .gifts {
        margin-top: 10px;
        display: grid;
        gap: 8px;
    }

    .gift-tag {
        padding: 8px 10px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    .gift-tag::before {
        content: "🎁";
    }

    .gift-tag a {
        font-weight: 600;
        text-decoration: none;
        color: #b1204b;
    }

    .gift-tag a:hover {
        text-decoration: underline;
    }

    .progress {
        margin-top: 6px;
        font-size: 0.8rem;
        text-align: center;
        color: #7c5672;
    }
</style>

<div class="puzzle-wrapper">
    <h2>Nordpol Buchstabensuche</h2>
    <p class="hint">
        Drei kleine Weihnachtswege führen zu versteckten Geschenken.  
        Klicke im Gitter auf Buchstaben und lausche auf das Klingeln im Bauchgefühl.
    </p>

    <p class="word-hints">
        Es verstecken sich <span>STAR</span>, <span>GIFT</span> und <span>SNOW</span>.
        Die Startbuchstaben sind magisch.
    </p>

    <div class="grid">
        {#each cells as cell}
            <button
                type="button"
                class="cell {cell.id === activeId ? 'active' : ''} {cell.special !== null && found.has(cell.special) ? 'found' : ''}"
                on:click={() => handleClick(cell)}
            >
                <span>{cell.char}</span>
            </button>
        {/each}
    </div>

    <div class="gifts">
        {#each [0,1,2] as idx}
            {#if giftLinks[idx] && found.has(idx)}
                <div class="gift-tag">
                    <!-- <span>{giftLabel(idx)}:</span> -->
                    <a href={giftLinks[idx]}>
                        Zum geheimen Link {idx + 1}
                    </a>
                </div>
            {/if}
        {/each}
    </div>

    <p class="progress">
        Gefundene Geschenke: {found.size} von {Math.min(3, giftLinks.length)}
    </p>
</div>
