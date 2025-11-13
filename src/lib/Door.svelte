
<script>
	import { createEventDispatcher, onMount } from 'svelte';

	// Props
	// day: number from 1-24 indicating when the door becomes interactable
	export let day = 1;

	// Optional override for the current date (useful for testing). Can be a Date or a parsable date string.
	export let now = undefined;

	// Force the door to be open (useful in dev or stories)
	export let forceOpen = false;

	// Optional prefix for localStorage keys
	export let storageKeyPrefix = 'christmas25-door-';

	const dispatch = createEventDispatcher();

	// Derived reactive values
	$: current = now ? new Date(now) : new Date();
	$: isDecember = current.getMonth() === 10; // JS months are 0-11
	$: interactable = forceOpen || (isDecember && current.getDate() >= Number(day));

	// Local UI state: whether the door has been opened by the user
	let opened = false;

	$: storageKey = storageKeyPrefix + Number(day);

	// Read persisted state on mount (browser only)
	onMount(() => {
		if (typeof window === 'undefined') return;
		try {
			const v = localStorage.getItem(storageKey);
			if (v !== null) opened = v === 'true';
		} catch (e) {
			// ignore localStorage errors
		}
	});

	function persistOpened() {
		try {
			localStorage.setItem(storageKey, String(opened));
		} catch (e) {
			// ignore write errors (e.g., storage disabled)
		}
	}

	function handleClick() {
		if (!interactable) return;
		opened = !opened;
		persistOpened();
		dispatch('open', { day: Number(day), opened });
	}
</script>

<style>
	.door {
		display: inline-block;
		text-align: center;
		margin: 0.5rem;
	}

	.door-button {
		padding: 0.6rem 1rem;
		border-radius: 6px;
		border: 1px solid #444;
        color: var(--button-text, #000);
		background: var(--button-bg, #f2f2f2);
		cursor: pointer;
		font-weight: 600;
	}

	.door-button[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.locked-note {
		font-size: 0.85rem;
		color: #666;
		margin-top: 0.4rem;
	}

	.content {
		margin-top: 0.6rem;
	}
</style>

<div class="door" aria-live="polite">
	{#if interactable}
		<button
			class="door-button"
			on:click={handleClick}
			aria-pressed={opened}
			aria-label={opened ? `Close door ${day}` : `Open door ${day}`}>
			{#if opened}
				Close door {day}
			{:else}
				Open door {day}
			{/if}
		</button>

		<div class="content">
			{#if opened}
				<slot>
					<!-- Default revealed content if none provided -->
                            <div>You opened door {day} — add content via slot.</div>
                </slot>
            {/if}
        </div>
    {:else}
		<button class="door-button" disabled aria-disabled="true">
			Locked — available Dec {day}
		</button>
		<div class="locked-note">This door will be interactable on December {day}.</div>
	{/if}
</div>
