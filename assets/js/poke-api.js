const pokeApi = {}

function convertPokeApi(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetails.name
    pokemon.number = pokeDetails.id

    pokemon.height = pokeDetails.height
    pokemon.weight = pokeDetails.weight

    const abilities = pokeDetails.abilities.map((slot) => slot.ability.name)
    pokemon.abilities = abilities

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.img = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApi)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.log(error))
}
