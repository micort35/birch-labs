import React, { Component } from "react";
import { HorizontalBar } from 'react-chartjs-2';
import { PokemonData } from "../types/types";
import ListItem from './layout/ListItem';

interface PokemonTypes {
    poke: PokemonData,
    editing: boolean,
    movePoke: Function,
    editPoke: Function,
    deletePoke: Function,
    toggleShiny: Function,
    releasePoke: Function,
    capturePoke: Function,
    onChange: Function
}

class Pokemon extends Component<PokemonTypes> {
    readonly data = {
        labels: ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe'],
        datasets: [
          {
            label: 'Base Stats',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: Object.values(this.props.poke.stats)
          }
        ]
    };

    readonly options = {
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    suggestedMin: Math.min(...this.data.datasets[0].data) - 5
                }
            }]
        }
    }

    render() {
        return (
            <>
                {
                this.props.editing ? (
                    <div className="text-center">
                        <div className="card white-bg center flex-center w-25 mt-1 mb-1">
                            <div className="card-poke text-center">
                                <p className="p-name i-block cap">{this.props.poke.name}</p>
                                <img 
                                    src={this.props.poke.sprites.active}
                                    alt="Pokémon's sprite"
                                    className="sprite"
                                    onClick={() => this.props.toggleShiny(this.props.poke.name)}
                                />
                                <ListItem items={this.props.poke.types} classifier={typify} />
                            </div>
                            <div className="card-moves">
                                <input
                                    type="text"
                                    name="move1"
                                    placeholder="Move 1"
                                    className="box-rounded box-md text-center w-95 mt-05"
                                    value={this.props.poke.moves[0]}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e, this.props.poke.name, 'moves', 0)}
                                />
                                <input
                                    type="text"
                                    name="move2"
                                    placeholder="Move 2"
                                    className="box-rounded box-md text-center w-95 mt-05"
                                    value={this.props.poke.moves[1]}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e, this.props.poke.name, 'moves', 1)}
                                />
                                <input
                                    type="text"
                                    name="move3"
                                    placeholder="Move 3"
                                    className="box-rounded box-md text-center w-95 mt-05"
                                    value={this.props.poke.moves[2]}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e, this.props.poke.name, 'moves', 2)}
                                />
                                <input
                                    type="text"
                                    name="move4"
                                    placeholder="Move 4"
                                    className="box-rounded box-md text-center w-95 mt-05"
                                    value={this.props.poke.moves[3]}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e, this.props.poke.name, 'moves', 3)}
                                />
                            </div>
                            <div className="card-modifiers flex-center">
                                <input
                                    type="text"
                                    name="ability"
                                    placeholder="Ability"
                                    className="box-rounded box-md text-center w-30 mx-025"
                                    value={this.props.poke.ability}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e, this.props.poke.name, 'ability')}
                                />
                                <input
                                    type="text"
                                    name="nature"
                                    placeholder="Nature"
                                    className="box-rounded box-md text-center w-30 mx-025"
                                    value={this.props.poke.nature}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e, this.props.poke.name, 'nature')}
                                />
                                <input
                                    type="text"
                                    name="item"
                                    placeholder="Item"
                                    className="box-rounded box-md text-center w-30 mx-025"
                                    value={this.props.poke.item}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(e, this.props.poke.name, 'item')}
                                />
                            </div>
                            <div className="card-stats">
                                <HorizontalBar data={this.data} options={this.options} />
                            </div>
                        </div>
                        <form className="i-block w-10 mx-1 mb-1" onSubmit={(e) => this.props.releasePoke(e, this.props.poke.name)}>
                            <button
                                type="submit"
                                className="box-rounded box-md negative-bg w-100">
                                Release
                            </button>
                        </form>
                        <form className="i-block w-10 mx-1 mb-1" onSubmit={(e) => this.props.capturePoke(e, this.props.poke.name, this.state)}>
                            <button
                                type="submit"
                                className="box-rounded box-md grass-bg w-100">
                                Capture!
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="center flex-center w-25 separator">
                        <img src={this.props.poke.sprites.active} alt="Pokémon's sprite" className="sprite"/>
                        <p className="poke-name i-block text-center cap">{this.props.poke.name}</p>
                        <form className="flex-center">
                            <div className="poke-move i-block">
                                <button type="button" onClick={() => this.props.movePoke(this.props.poke.name, -1)}>
                                    <i className="material-icons">arrow_drop_up</i>
                                </button>
                                <button type="button" onClick={() => this.props.movePoke(this.props.poke.name, 1)}>
                                    <i className="material-icons">arrow_drop_down</i>
                                </button>
                            </div>
                            <button type="button" onClick={() => this.props.editPoke(this.props.poke.name)}>
                                <i className="material-icons">edit</i>
                            </button>
                            <button type="button" onClick={() => this.props.deletePoke(this.props.poke.name)}>
                                <i className="material-icons">delete</i>
                            </button>
                        </form>
                    </div>
                )}
            </> 
        )
    }
}

const typify = (type: string) => 'box-rounded box-md i-block w-45 mx-025 font-sm upper ' + type

export default Pokemon