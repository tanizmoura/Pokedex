let offset = 0
const limit = 5
const loadMoreButton = document.getElementById('loadMore')
const maxLimit = 151

function convertPokemonTypes(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<span>${type}</span>`)
}

function addCardDetails(pokemon) {
    return `<i class="bi bi-x-circle close"></i>
            <div class="${pokemon.type} box-title">
                
                <div class="number">#${pokemon.number}</div>
                
                <h2>${pokemon.name}</h2>
                <div class="type">
                     ${pokemon.types.map((type) => `<span class="${type}">${type}</span>`).join('')}
                </div>
                
                <figure>
                    <img src="${pokemon.img}"
                        alt="${pokemon.name}">
                </figure>
            </div>

            <div class="box-content">
                <table>
                    <thead>
                        <tr>
                            <th>Weight</th>
                            <th>Height</th>
                            <th>Abilities</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>${pokemon.weight}</td>
                            <td>${pokemon.height}</td>
                            <td>${pokemon.abilities.map((abilitie) => `<span>${abilitie}</span>`)}</td>
                        </tr>
                    </tbody>
                </table>
               
            </div>`
}

function loadPokemonItens(offset, limit) {

    function convertPokemonToList(pokemon) {

        return `<li class="pokemon"> <!-- Pokemon ${pokemon.number} -->
                <div class="card-pokemon ${pokemon.type}">
                    <div class="name-pokemon">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        <span class="readMore pokemon${pokemon.number}">Read more</span>
                    </div>

                    <div class="pokemon-info">
                        <div class="type">
                            ${pokemon.types.map((type) => `<span class="${type}">${type}</span>`).join('')}
                        </div>

                        <figure>
                            <img src="${pokemon.img}" alt="${pokemon.name}">
                        </figure>
                        
                    </div>
                    
                </div>
            </li>`
    }

    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        document.getElementById('pokemon-list').innerHTML += pokemonList.map(convertPokemonToList).join('')

        const pokemonMoreDetails = document.getElementById('pokemon-list')
        pokemonList.forEach(pokemon => {
            pokemonMoreDetails.addEventListener('click', function (event) {
                if (event.target.classList.contains(`pokemon${pokemon.number}`)) {
                    document.getElementById('info').innerHTML = ''
                    document.getElementById('info').innerHTML = addCardDetails(pokemon)
                    document.getElementById('info').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            })
        });

        const info = document.getElementById('info')
        info.addEventListener('click', function (event) {
            if (event.target.classList.contains(`close`)) {
                document.getElementById('info').innerHTML = ''
            }
        })

    })
        .catch((error) => console.log(error))

}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNext = offset + limit

    if (qtdRecordNext >= maxLimit) {
        const newLimit = maxLimit - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }

})










