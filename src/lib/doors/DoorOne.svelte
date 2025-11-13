

<script>
    import Dialog from '../Dialog.svelte';
    let dlg = null;

    function openDialog() {
        if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    }

    function closeDialog() {
        if (dlg && typeof dlg.close === 'function') dlg.close();
    }
</script>

<style>
.surprise-wrapper {
        padding: 1rem;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
}

.open-btn {
    display: inline-block;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    background: #ffffff22;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer;
}

.dialog-content {
    padding: 1rem 1.2rem;
}

.dialog-actions {
    margin-top: 0.6rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.dialog-close {
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
    border: none;
    background: #d91031;
    color: #fff;
    cursor: pointer;
}

</style>

<div class="surprise-wrapper">
        <p>Surprise for Day 1!</p>
    <button type="button" class="open-btn" on:click|stopPropagation={openDialog} aria-haspopup="dialog">Open detail</button>

        <Dialog bind:dialog={dlg}>
            <div class="dialog-content">
                <h3>Day {1} Surprise</h3>
                <p>This is a small dialog for the day's surprise. You can put anything here (images, links, text).</p>
                <div class="dialog-actions">
                      <button type="button" class="dialog-close" on:click|stopPropagation={closeDialog}>Close</button>
                </div>
            </div>
        </Dialog>
</div>