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

	figure:nth-child(1) img  { transform: scale(1.0) rotate(-12.5deg); }
	figure:nth-child(2) img  { transform: scale(1.0) rotate(-9.722222deg); }
	figure:nth-child(3) img  { transform: scale(1.0) rotate(-6.944444deg); }
	figure:nth-child(4) img  { transform: scale(1.0) rotate(-4.166667deg); }
	figure:nth-child(5) img  { transform: scale(1.0) rotate(-1.388889deg); }
	figure:nth-child(6) img  { transform: scale(1.0) rotate(1.388889deg); }
	figure:nth-child(7) img  { transform: scale(1.0) rotate(4.166667deg); }
	figure:nth-child(8) img  { transform: scale(1.0) rotate(6.944444deg); }
	figure:nth-child(9) img  { transform: scale(1.0) rotate(9.722222deg); }
	figure:nth-child(10) img { transform: scale(1.0) rotate(12.5deg); }

	/* repeat pattern for 11-20 */
	figure:nth-child(11) img { transform: scale(1.0) rotate(-12.5deg); }
	figure:nth-child(12) img { transform: scale(1.0) rotate(-9.722222deg); }
	figure:nth-child(13) img { transform: scale(1.0) rotate(-6.944444deg); }
	figure:nth-child(14) img { transform: scale(1.0) rotate(-4.166667deg); }
	figure:nth-child(15) img { transform: scale(1.0) rotate(-1.388889deg); }
	figure:nth-child(16) img { transform: scale(1.0) rotate(1.388889deg); }
	figure:nth-child(17) img { transform: scale(1.0) rotate(4.166667deg); }
	figure:nth-child(18) img { transform: scale(1.0) rotate(6.944444deg); }
	figure:nth-child(19) img { transform: scale(1.0) rotate(9.722222deg); }
	figure:nth-child(20) img { transform: scale(1.0) rotate(12.5deg); }

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
	const base = import.meta.env.BASE_URL + '/throwback/3/';

	const chapterOne = [
		"colca.jpg",
		"colca canyon.mp4",
		"falke.mp4",
		"ice.jpg",
		"plin alpaka.mp4",
		
		
		"cart desert.mp4",
		"desert.jpg",
		"wüste.mp4",
		"desert 2.jpg",
		"desert 3.jpg",
		"pisco.mp4",
		"pisco fest.jpg",
		"pisco fest og.jpg",
		"plims ica.jpg",
		"plin trinkt.mp4",

		"paracas.jpg",
		"paracas bogen.jpg",
		"plin motorroller.mp4",
		"plin bikini.mp4",
		"plim am strand.mp4",
		"plin moves.mp4",
		
		"plin regendings.mp4",
		"plin sda.mp4",
		
		"100.png",
	]

document.addEventListener("DOMContentLoaded", () => {
		const vids = document.querySelectorAll("video");
		vids.forEach(v => {
			v.volume = 0.5;
		});
	});
</script>

<div class="peruWrapper">
	<h3>Peru Throwback Pt. 3</h3>

	{#each chapterOne as media}
	<figure>
		{#if media.endsWith(".jpg") || media.endsWith(".png")}
			<img src={base + media} alt="" />
		{:else}
			<video
				class="media"
				src={base + media}
				playsinline
				controls
				preload="metadata"
			>
				<track
				kind="captions"
				src={"/throwback/1/" + media.replace(".mp4", ".vtt")}
				srclang="en"
				label="captions"
			/>
			</video>
		{/if}
	</figure>
	{/each}
</div>
