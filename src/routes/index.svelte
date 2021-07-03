<script context="module">
	export async function load() {
		const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
		const res = await fetch(url);
		const data = await res.json();
		const loadedPokemon = data.results.map((p) => {
			let splitUrl = p.url.split('/');
			let id = splitUrl[splitUrl.length - 2];
			return {
				id: id,
				name: p.name,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
			};
		});
		return { props: { pokemon: loadedPokemon } };
	}
</script>

<script>
	import Title from '../components/title.svelte';
	import PokemanCard from '../components/pokemanCard.svelte';
	export let pokemon;
	let searchTerm = '';
	let filteredPokemon = [];
	$: {
		if (searchTerm) {
			console.log(searchTerm);
			filteredPokemon = pokemon.filter((p) =>
				p.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...pokemon];
		}
	}
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<Title title="Svelte Kit Pokedex" />
<input
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
	bind:value={searchTerm}
	placeholder="Search Pokemon"
/>
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>
