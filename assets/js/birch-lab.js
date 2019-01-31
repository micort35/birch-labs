const P = new Pokedex.Pokedex();

$(document).ready(function() {
    let team = [];
    const input = $('#entry')[0];
    input.addEventListener('keypress', async function(e){
        if(e.keyCode == 13){
            e.preventDefault();
            let mon = null;
            try{
                mon = await P.getPokemonByName(input.value.toLowerCase());
                input.value = '';
            } catch{
                alert('Invalid Name');
                return;
            }

            //ensure no duplicate
            if($('#' + mon.name).length != 0){
                alert('No duplicates');
                return;
            //ensure valid team size
            } else if($("#team > div").length == 6){
                alert('No more than six team members');
                return;
            } else {
                team.push(mon);
                createCard(mon.name);
                fillCard(mon);
                $('#generator')[0].className = 'btn btn-success d-inline-block mb-5';
                console.log(team);
            }
        }
    });

    const clear = $('#clear')[0];
    clear.addEventListener('click', function(e){
        $('#team').html('');
        $('#generator')[0].className = 'btn btn-success d-none mb-5';
        $('#aggregates').html('');
    })

    const gen = $('#generator')[0];
    gen.addEventListener('click', function(e){
        if($('#team-vis').length == 0){
            avgStats(team);
        }
    });
})

function createCard(name){
    //create card and append the four sections
    const card = document.createElement('div');
    const identity = document.createElement('div');
    const info = document.createElement('div');
    const moves = document.createElement('div');
    const statvis = document.createElement('div');

    card.className = 'mon-card';
    card.id = name;
    identity.className = 'top-left text-center';
    info.className = 'd-flex middle justify-content-around';
    moves.className = 'd-flex flex-column top-right justify-content-around';
    statvis.className = 'bottom';

    $('#team')[0].append(card);
    $('#' + name)[0].append(identity);
    $('#' + name)[0].append(info);
    $('#' + name)[0].append(moves);
    $('#' + name)[0].append(statvis);
}

function fillCard(mon){
    //apply appropriate features to each section of card
    const name = document.createElement('span');
    const sprite = document.createElement('img');
    const ability = document.createElement('input');
    const item = document.createElement('input');
    const nature = document.createElement('input');
    const ctx = document.createElement('canvas');

    sprite.className = 'd-block mx-auto';
    sprite.src = mon.sprites.front_default;
    sprite.addEventListener('click', function(e){
        if(sprite.src == mon.sprites.front_default){
            sprite.src = mon.sprites.front_shiny;
        } else if(sprite.src == mon.sprites.front_shiny){
            sprite.src = mon.sprites.front_default;
        }
    })
    name.innerHTML = mon.name.charAt(0).toUpperCase() + mon.name.slice(1);
    ability.className = 'form-control form-control-sm w-30';
    ability.placeholder = 'ability';
    item.className = 'form-control form-control-sm w-30';
    item.placeholder = 'item';
    nature.className = 'form-control form-control-sm w-30';
    nature.placeholder = 'nature';
    ctx.className = 'h-100 w-100';

    $('#' + mon.name + ' .top-left')[0].append(name);
    $('#' + mon.name + ' .top-left')[0].append(sprite);
    let types = [];
    for(let i=0; i<mon.types.length; i++){
        types[i] = document.createElement('span');
        types[i].innerHTML = mon.types[i].type.name.charAt(0).toUpperCase() + mon.types[i].type.name.slice(1);
        typify(types[i]);
        $('#' + mon.name + ' .top-left')[0].append(types[i]);
    }


    $('#' + mon.name + ' .middle')[0].append(ability);
    $('#' + mon.name + ' .middle')[0].append(item);
    $('#' + mon.name + ' .middle')[0].append(nature);

    let moveset = [];
    for(let j=0; j<4; j++){
        moveset[j] = document.createElement('input');
        moveset[j].className = 'form-control form-control-sm w-75 mx-auto mb-1';
        moveset[j].placeholder = 'Move ' + (j+1);
        $('#' + mon.name + ' .top-right')[0].append(moveset[j]);
    }

    $('#' + mon.name + ' .bottom')[0].append(ctx);
    let bars = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'ATK', 'SPA', 'DEF', 'SPD', 'SPE'],
            datasets: [
                {
                    backgroundColor: ['#FF5959', '#F5AC78', '#FAE078', '#9DB7F5', '#A7DB8D', '#FA92B2'],
                    data: [
                        mon.stats[5].base_stat,
                        mon.stats[4].base_stat,
                        mon.stats[3].base_stat,
                        mon.stats[2].base_stat,
                        mon.stats[1].base_stat,
                        mon.stats[0].base_stat
                    ]
                }
            ]
        },
        options: {
            legend: {display: false},
            title: {
                display: false
            }
        }
    });
}

function typify(type){
    //apply type-specific styling
    type.className = 'type';
    typename = type.innerHTML;
    if(typename == 'Water'){
        type.style.backgroundColor = '#6890F0';
    } else if(typename == 'Fire'){
        type.style.backgroundColor = '#F08030';
    } else if(typename == 'Grass'){
        type.style.backgroundColor = '#78C850';
    } else if(typename == 'Flying'){
        type.style.backgroundColor = '#A890F0';
    } else if(typename == 'Fighting'){
        type.style.backgroundColor = '#C03028';
    } else if(typename == 'Dark'){
        type.style.backgroundColor = '#705848';
    } else if(typename == 'Ice'){
        type.style.backgroundColor = '#98D8D8';
    } else if(typename == 'Dragon'){
        type.style.backgroundColor = '#7038F8';
    } else if(typename == 'Fairy'){
        type.style.backgroundColor = '#EE99AC';
    } else if(typename == 'Ghost'){
        type.style.backgroundColor = '#705898';
    } else if(typename == 'Poison'){
        type.style.backgroundColor = '#A040A0';
    } else if(typename == 'Steel'){
        type.style.backgroundColor = '#B8B8D0';
    } else if(typename == 'Rock'){
        type.style.backgroundColor = '#B8A038';
    } else if(typename == 'Electric'){
        type.style.backgroundColor = '#F8D030';
    } else if(typename == 'Ground'){
        type.style.backgroundColor = '#E0C068';
    } else if(typename == 'Bug'){
        type.style.backgroundColor = '#A8B820';
    } else if(typename == 'Normal'){
        type.style.backgroundColor = '#A8A878';
    } else if(typename == 'Psychic'){
        type.style.backgroundColor = '#F85888';
    }
}

function avgStats(mons){
    //calculate averages
    let data = [0, 0, 0, 0, 0, 0];
    for(let i = 0; i < mons.length; i++){
        for(let j = 0; j < 6; j++){
            data[5-j] += mons[i].stats[j].base_stat;
        }
    }
    for(let k = 0; k < data.length; k++){
        data[k] = (data[k]/mons.length).toFixed(2);
    }

    const ctx = document.createElement('canvas');
    ctx.id = 'team-vis';
    $('#aggregates')[0].append(ctx);
    let bars = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'ATK', 'SPA', 'DEF', 'SPD', 'SPE'],
            datasets: [
                {
                    backgroundColor: ['#FF5959', '#F5AC78', '#FAE078', '#9DB7F5', '#A7DB8D', '#FA92B2'],
                    data: data
                }
            ]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Average Team Base Stats"
            }
        }
    })
}