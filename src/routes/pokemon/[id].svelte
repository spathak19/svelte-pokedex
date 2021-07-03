<script context="module">
	export async function load({ page }) {
		const id = page.params.id;
		const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
		const res = await fetch(url);
		const pokeman = await res.json();
		return { props: { pokeman } };
	}
</script>

<script>
	import Title from '../../components/title.svelte';
	export let pokeman;
</script>

<svelte:head>
	<title>Pokedex - {pokeman.name}</title>
</svelte:head>

<Title title={pokeman.name} />
<div class="flex flex-col items-center">
	<p>
		Type: <strong>
			{#each pokeman.types as types}
				{types.type.name}{types.slot === 2 ? '' : ', '}
			{/each}
		</strong>
		| Height: <strong>{pokeman.height}</strong>
		| Weight: <strong>{pokeman.weight}</strong>
	</p>
	<img class="card-image" src={pokeman.sprites['front_default']} alt={pokeman.name} />
</div>
