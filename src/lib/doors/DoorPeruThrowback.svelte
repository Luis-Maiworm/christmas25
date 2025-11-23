<style>
	.peruWrapper {
		/* background: #020520; */
		perspective: 500px;
		/* make the wrapper its own scroll container so sticky figures work reliably
		   and ensure smooth touch scrolling on mobile */
		overflow-x: hidden;
		overflow-y: auto;
		height: 80vh;
	}

	figure {
		position: sticky;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 80vh;
		margin: 0 auto;
	}

	figure:nth-child(1) img  { transform: scale(0.6) rotate(-12.5deg); }
	figure:nth-child(2) img  { transform: scale(0.6) rotate(-9.722222deg); }
	figure:nth-child(3) img  { transform: scale(0.6) rotate(-6.944444deg); }
	figure:nth-child(4) img  { transform: scale(0.6) rotate(-4.166667deg); }
	figure:nth-child(5) img  { transform: scale(0.6) rotate(-1.388889deg); }
	figure:nth-child(6) img  { transform: scale(0.6) rotate(1.388889deg); }
	figure:nth-child(7) img  { transform: scale(0.6) rotate(4.166667deg); }
	figure:nth-child(8) img  { transform: scale(0.6) rotate(6.944444deg); }
	figure:nth-child(9) img  { transform: scale(0.6) rotate(9.722222deg); }
	figure:nth-child(10) img { transform: scale(0.6) rotate(12.5deg); }

	/* keep media aspect ratio while fitting into the figure container
	   use max-width / max-height and let browser scale preserving ratio */
	figure img,
	figure video,
	figure .media {
		max-width: 80vmin;
		max-height: 44vh;
		width: auto;
		height: auto;
		object-fit: contain;
		border-radius: 3px;
		display: block;
	}
</style>
 

<script>
	// const photos = Array.from({ length: 10 }, (_, i) => `/sticker/plim_sticker_${i + 1}.jpg`);
	const path = "/throwback/"
	const photos = [ "ice", "colcatal", "ice2", "alpaka"]
	console.log(photos)
	const videos = ["vid_1", "vid_2", "vid_3"];
</script>

<div class="peruWrapper">

	{#each photos as photo}
		<figure>
			<img src={path + photo + ".jpg"} alt="" />
		</figure>
	{/each}

	{#each videos as video}
		<figure>
			<video
				class="media"
				src={path + video + ".mp4"}
				playsinline
				controls
				preload="metadata"
			>
				<!-- add a captions track to satisfy accessibility checks; replace src with an actual .vtt if available -->
				<track kind="captions" src={path + video + ".vtt"} srclang="en" label="captions" />
			</video>
		</figure>
	{/each}
</div>
