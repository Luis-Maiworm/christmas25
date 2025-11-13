<script lang="ts">
  export let dialog: HTMLDialogElement;

  // programmgesteuert öffnen
  export function show() {
    dialog.showModal();
  }

  // sanft schließen
  export async function hide() {
    dialog.setAttribute('data-closing', '');
    // auf das Ende der CSS Animation warten
    await new Promise((r) => {
      const onEnd = () => {
        dialog.removeEventListener('animationend', onEnd);
        r(null);
      };
      dialog.addEventListener('animationend', onEnd, { once: true });
    });
    dialog.removeAttribute('data-closing');
    dialog.close();
  }
</script>

<dialog bind:this={dialog}>
  <slot/>
</dialog>

<style>
  dialog {
    border: 2px solid rgba(255,255,255,0.85);
    border-radius: 12px;
    padding: 1.25rem;
    max-width: 560px;
    width: 90vw;
    box-shadow: 0 12px 40px rgba(247, 246, 246, 0.35);
    position: relative;
    overflow: hidden;
  }

  dialog::backdrop {
    background: rgba(0,0,0,0);
  }

  /* Einblendung wenn open gesetzt ist */
  /* slower, more pronounced zoom-in from 0 -> 100% */
  dialog[open] {
    animation: dialog-in 420ms cubic-bezier(.06,.63,0,1) forwards;
  }
  dialog[open]::backdrop {
    animation: backdrop-in 420ms cubic-bezier(.06,.63,0,1) forwards;
  }

  /* Ausblendung während data-closing gesetzt ist */
  dialog[data-closing] {
    animation: dialog-out 220ms cubic-bezier(.06,.63,0,1) forwards;
  }
  dialog[data-closing]::backdrop {
    animation: backdrop-out 220ms cubic-bezier(.06,.63,0,1) forwards;
  }

  @keyframes dialog-in {
    from { opacity: 0; transform: translateY(8px) scale(0); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes dialog-out {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to   { opacity: 0; transform: translateY(8px) scale(0); }
  }
  @keyframes backdrop-in {
    from { background: rgba(0,0,0,0); }
    to   { background: rgba(0,0,0,.4); }
  }
  @keyframes backdrop-out {
    from { background: rgba(0,0,0,.4); }
    to   { background: rgba(0,0,0,0); }
  }

  /* subtle shiny rim */
  dialog::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 20%, transparent 45%);
    mix-blend-mode: overlay;
  }
</style>
