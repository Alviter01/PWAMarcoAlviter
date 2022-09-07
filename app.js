let pokemonsList = document.getElementById("pokemons-list");
let links = document.getElementById("links");

updatePokemons("https://pokeapi.co/api/v2/pokemon");

function updatePokemons(url) {
  if (url) {

    pokemonsList.innerHTML = "";
    fetch(url)
      .then(res => res.json())
      .then(res => {
        for (let i of res.results) {
          fetch(i.url)
            .then(x => x.json())
            .then(x => {
              let abilities = '';
              for (let j = 0; j < x.abilities.length; j++) {
                abilities += '<p>'+ x.abilities[j].ability.name +'</p>';
              }
              pokemonsList.innerHTML += '<div class="card mb-3" style="max-width: 540px;">'+
                '<div class="row g-0">'+
                  '<div class="col-md-4">'+
                    '<img src="'+x.sprites.other[`official-artwork`].front_default+'" class="img-fluid rounded-start" alt="">'+
                  '</div>'+
                  '<div class="col-md-8">'+
                    '<div class="card-body">'+
                      '<h5 class="card-title">'+x.name.toUpperCase()+'</h5>'+
                      '<h6 class="card-subtitle mb-2 text-muted">Habilidades</h6>'+
                      '<ul class="list-group">'+
                        '<li class="list-group-item">'+abilities+'</li>'+
                      '</ul>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>';
            });
        };
        links.innerHTML = (res.previous) ? `<button type="button" class="btn btn-success" onclick="updatePokemons('${res.previous}')">Atrás</button>` : "";
        links.innerHTML += (res.next) ? `<button type="button" class="btn btn-success" onclick="updatePokemons('${res.next}')">Siguiente</button>` : "";

      });
  }

}



