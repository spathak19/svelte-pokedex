import { writable } from "svelte/store";
export const pokemon = writable([]);
const fetchPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=100";
    const res = await fetch(url);
    const data = await res.json();
    const loadedPokemon = data.results.map(p => {
        let splitUrl = p.url.split("/");
        let id = splitUrl[splitUrl.length - 2];
        return {
            id: id,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        }
    });
    pokemon.set(loadedPokemon);
};

fetchPokemon();