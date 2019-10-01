import React, { Component } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import Search from './Search';
import Pokemon from './Pokemon';

class Team extends Component {
    state = {
        validSearch: true,
        team: [],
        editing: ''
    }

    // Create PokeAPI client
    readonly Pokedex = new Pokedex();

    addPoke = (name: string) => {
        // Check for team max and duplicates
        if (this.state.team.length === 6 || this.state.team.map((poke: any) => poke.name).includes(name)){
            this.setState({ validSearch: false });
        } else {
            this.Pokedex.getPokemonByName(name.toLowerCase())
            .then((response: Object) => {
                this.setState({ team: [...this.state.team, parsePoke(response)] });
                this.editPoke(name);
            }).catch((response: Object) => {
                this.setState( { validSearch: false });
            });
        }
    }

    deletePoke = (name: string) => {
        this.setState({ team: [...this.state.team.filter((poke: any) => poke.name !== name)]})
    }

    movePoke = (name: string, direction: number) => {
        let index = this.state.team.findIndex((poke: any) => poke.name === name);
        // Move left/up
        if (direction === -1 && index > 0) {
            this.setState( {
                team: swapElements(this.state.team, index, index-1)
            })
        // Move right/down
        } else if (direction === 1 && index < this.state.team.length-1) {
            this.setState( {
                team: swapElements(this.state.team, index, index+1)
            })
        }
    }

    editPoke = (name: string) => {
        this.setState({ editing: name });
    }

    capturePoke = (name: string) => {
        // do something
    }

    toggleShiny = (name: string) => {
        // do something
    }

    onType = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ [e.currentTarget.name]: e.currentTarget.value } );

    render () {
        return (
            <div className="center">
                <Search searchPoke={this.addPoke} validSearch/>
                {/* Render minimized representations first */}
                <div>
                    { this.state.team.map((poke: any) => (
                        poke.name !== this.state.editing &&
                            <Pokemon
                                key={poke.name}
                                poke={poke}
                                editing={poke.name === this.state.editing}
                                deletePoke={this.deletePoke}
                                movePoke={this.movePoke}
                                editPoke={this.editPoke}
                                capturePoke={this.capturePoke}
                                toggleShiny={this.toggleShiny}
                                onType={this.onType}
                            />
                    ))}
                </div>
                {/* Render the Pokemon being unedited at bottom */}
                <div>
                    { this.state.team.map((poke: any) => (
                        poke.name === this.state.editing &&
                            <Pokemon
                                key={poke.name}
                                poke={poke}
                                editing={poke.name === this.state.editing}
                                deletePoke={this.deletePoke}
                                movePoke={this.movePoke}
                                editPoke={this.editPoke}
                                capturePoke={this.capturePoke}
                                toggleShiny={this.toggleShiny}
                                onType={this.onType}
                            />
                    ))}
                </div>
            </div>
            
        )
    }
}

function parsePoke(pokeData: any) {
    const types = pokeData.types.map((type: any) => type['type']['name']);
    
    return {
        name: pokeData.name,
        sprites: {
            regular: pokeData.sprites.front_default,
            shiny: pokeData.sprites.front_shiny
        },
        types: types,
        moves: [],
        ability: pokeData.abilities[0].ability.name,
        nature: null,
        item: null
    }
}

function swapElements(arr: Array<any>, e1: number, e2: number){
    const tmp = arr[e1];
    arr[e1] = arr[e2];
    arr[e2] = tmp;
    return arr;
}

export default Team