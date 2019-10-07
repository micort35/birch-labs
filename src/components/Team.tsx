import React, { Component } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import { PokemonData } from '../types/types';
import Search from './layout/Search';
import Pokemon from './Pokemon';

class Team extends Component {
    state = {
        query: '',
        validSearch: true,
        team: [],
        editing: ''
    }

    onType = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

    onTypeID = (e: React.ChangeEvent<HTMLInputElement>, id: string, property: string, index?: number) => {
        const memNum = this.state.team.findIndex((poke: PokemonData) => poke.name === id);
        let pokemon = this.state.team[memNum] as PokemonData;
        if (index !== undefined) {
            let properties = pokemon[property] as Array<String>;
            properties[index] = e.currentTarget.value;
        } else {
            pokemon[property] = e.currentTarget.value;
        }

        // Needs changing, will mess up order if editing < nth member, inefficient
        // immutability-helper
        this.setState({
            team: [...this.state.team.filter((poke: PokemonData) => poke.name !== id), pokemon]
        });
    }

    // Create PokeAPI client
    readonly Pokedex = new Pokedex();

    encounterPoke = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.addPoke(this.state.query);
        this.setState({ query: '' });
    }

    addPoke = (name: string) => {
        // Check for team max and duplicates
        if (this.state.team.length === 6 || this.state.team.map((poke: PokemonData) => poke.name).includes(name)){
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
        this.setState({ team: [...this.state.team.filter((poke: PokemonData) => poke.name !== name)]});
    }

    editPoke = (name: string) => {
        this.setState({ editing: name.toLowerCase() });
    }

    movePoke = (name: string, direction: number) => {
        const index = this.state.team.findIndex((poke: PokemonData) => poke.name === name);
        // Shift backwards
        if (direction === -1 && index > 0) {
            this.setState( {
                team: swapElements(this.state.team, index, index-1)
            });
        // Shift forwards
        } else if (direction === 1 && index < this.state.team.length-1) {
            this.setState( {
                team: swapElements(this.state.team, index, index+1)
            });
        }
    }

    toggleShiny = (name: string) => {
        const index = this.state.team.findIndex((poke: PokemonData) => poke.name === name);
        let pokemon = this.state.team[index] as PokemonData;

        pokemon.sprites.active = (pokemon.sprites.active === pokemon.sprites.regular)
            ? pokemon.sprites.shiny
            : pokemon.sprites.regular;

        // Needs changing, will mess up order if editing < nth member, inefficient
        // immutability-helper
        this.setState({
            team: [...this.state.team.filter((poke: PokemonData) => poke.name !== name), pokemon]
        });
    }

    validateAbility = (poke: PokemonData) => {
        // extend to nature and item
        let valid = false;
        this.Pokedex.getPokemonByName((poke.name as string).toLowerCase())
            .then((response: any) => {
                const abilities = response.abilities.map((ability: any) => ability['ability']['name']);
                const ability = poke.ability.toLowerCase().replace(' ', '-');
                valid = abilities.includes(ability);
            });
        return valid;
    }

    releasePoke = (e: React.FormEvent<HTMLFormElement>, name: string) => {
        e.preventDefault();
        this.deletePoke(name);
    }

    capturePoke = (e: React.FormEvent<HTMLFormElement>, name: string, edits: any) => {
        e.preventDefault();

        const index = this.state.team.findIndex((poke: PokemonData) => poke.name === name);
        let pokemon = this.state.team[index] as PokemonData;
        
        const valid = this.validateAbility(pokemon) as boolean;
        if (!valid) {
            // shake invalid comp and return
        }

        this.setState({ editing: '' });
    }

    render () {
        return (
            <div className="center">
                <Search query={this.state.query}
                    validSearch={this.state.validSearch}
                    searchPoke={this.addPoke}
                    onSubmit={this.encounterPoke}
                    onChange={this.onType}
                />
                {/* Render minimized representations first */}
                <div>
                    { this.state.team.map((poke: PokemonData) => (
                        poke.name !== this.state.editing &&
                            <Pokemon
                                key={poke.name as string}
                                poke={poke}
                                editing={poke.name === this.state.editing}
                                movePoke={this.movePoke}
                                editPoke={this.editPoke}
                                deletePoke={this.deletePoke}
                                toggleShiny={this.toggleShiny}
                                releasePoke={this.releasePoke}
                                capturePoke={this.capturePoke}
                                onChange={this.onTypeID}
                            />
                    ))}
                </div>
                {/* Render the Pokemon being unedited at bottom */}
                <div>
                    { this.state.team.map((poke: PokemonData) => (
                        poke.name === this.state.editing &&
                            <Pokemon
                                key={poke.name as string}
                                poke={poke}
                                editing={poke.name === this.state.editing}
                                movePoke={this.movePoke}
                                editPoke={this.editPoke}
                                deletePoke={this.deletePoke}
                                toggleShiny={this.toggleShiny}
                                releasePoke={this.releasePoke}
                                capturePoke={this.capturePoke}
                                onChange={this.onTypeID}
                            />
                    ))}
                </div>
            </div>
        )
    }
}

function parsePoke(response: any) {
    const types = response.types.map((type: any) => type['type']['name']);
    
    return {
        name: response.name,
        sprites: {
            regular: response.sprites.front_default,
            shiny: response.sprites.front_shiny,
            active: response.sprites.front_default
        },
        types,
        moves: ['', '', '', ''],
        ability: '',
        nature: '',
        item: '',
        stats: {
            HP: response.stats[0].base_stat,
            Atk: response.stats[1].base_stat,
            Def: response.stats[2].base_stat,
            SpA: response.stats[3].base_stat,
            SpD: response.stats[4].base_stat,
            Spe: response.stats[5].base_stat,
        }
    }
}

function swapElements(arr: Array<any>, e1: number, e2: number){
    const tmp = arr[e1];
    arr[e1] = arr[e2];
    arr[e2] = tmp;
    return arr;
}

export default Team