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
	const base = import.meta.env.BASE_URL + '/throwback/2/';

	const chapterTwo = [
		"01_chips.jpg",
		"chips.jpg",
		"machu picchu wandern.mp4",
		"wanderhund.mp4",
		"machu.mp4",
		"8.jpg",
		"tiny dog.mp4",
		"fresh dog.mp4",
		"vinicunca.mp4",
		"10.jpg",
		
		"11.jpg",
		"island.mp4",
		"zoo.mp4",
		"12.jpg",
		"dickes alpaka.mp4",
		"sweeter dog.mp4",
		"karte zoo.mp4",
		"roomtour luxus.mp4",
		"birthday vid.mp4",
		"nice dinner.mp4",
		"sweeter dog 2.mp4",
		"plin isst.mp4",
	]
document.addEventListener("DOMContentLoaded", () => {
		const vids = document.querySelectorAll("video");
		vids.forEach(v => {
			v.volume = 0.5;
		});
	});
</script>

<div class="peruWrapper">
	<h3>Peru Throwback Pt. 2</h3>
	{#each chapterTwo as media}
	<figure>
		{#if media.endsWith(".jpg")}
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
