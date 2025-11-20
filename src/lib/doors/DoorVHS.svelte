<div class="pdf-wrapper">
  <!--
    Try to hide viewer chrome with URL fragment parameters. Note: support
    depends on the browser's built-in PDF viewer. Chrome's built-in viewer may
    ignore some parameters. The file should live in `public/doors/Alles Gute!.pdf`
    and is referenced here as /doors/Alles%20Gute!.pdf (space encoded).
  -->
  <iframe
    src="/doors/VHS.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit"
    class="pdf-viewer"
    title="PDF viewer"
    aria-label="PDF viewer"
  ></iframe>

  <!-- embed fallback for browsers that handle application/pdf better -->
  <noscript>
    <embed src="/doors/Alles%20Gute!.pdf" type="application/pdf" class="pdf-viewer" />
  </noscript>
</div>

<style>
  :global(.pdf-wrapper) {
    position: relative;
    width: 100%;
    height: 70vh; /* full viewport height so the PDF fills the area */
    overflow: hidden;
  }

  :global(.pdf-viewer) {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  /* If the PDF viewer injects its own toolbar in the page, try to hide
     common selectors (best-effort; may not work across all viewers). */
  /* :global(.pdf-viewer)::-webkit-media-controls { display: none !important; } */
  /* :global(.pdf-viewer)::-internal-media-controls-overlay-cast-button { display: none !important; } */
</style>
