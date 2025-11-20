<style>
	.iframe-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.iframe-wrap iframe {
		width: 100%;
		max-width: 560px;
		/* maintain 16:9 aspect ratio on supported browsers */
		aspect-ratio: 16 / 9;
		height: auto;
		border: 0;
	}

	/* small screens: reduce max width so grid cells look good */
	@media (max-width: 420px) {
		.iframe-wrap iframe {
			max-width: 320px;
		}
	}
</style>

<div class="iframe-wrap">
	<iframe width="560" height="315" src="https://www.youtube.com/embed/RhOwyHWGqWg?si=HZjqKGQ71VJnFWW9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

