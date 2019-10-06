import React, { Component } from "react";
import ListItem from './layout/ListItem';
import { PokemonData } from "../types/types";

interface PokemonTypes {
    poke: PokemonData,
    editing: boolean,
    movePoke: Function,
    editPoke: Function,
    deletePoke: Function,
    toggleShiny: Function,
    capturePoke: Function,
}

class Pokemon extends Component<PokemonTypes> {
    state = {
        move1: '',
        move2: '',
        move3: '',
        move4: '',
        ability: '',
        nature: '',
        item: '',
    }

    onType = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

    render() {
        return (
            <>
                {
                this.props.editing ? (
                    <div className="text-center">
                        <div className="card white-bg center flex-center w-25 mt-1 mb-1">
                            <div className="card-poke text-center">
                                <p className="p-name i-block cap">{this.props.poke.name}</p>
                                <img src={this.props.poke.sprites.active} alt="Pokémon's sprite" className="sprite" onClick={() => this.props.toggleShiny(this.props.poke.name)} />
                                <ListItem items={this.props.poke.types} classifier={typify} />
                            </div>
                            <div className="card-moves">
                                <input type="text" name="move1" placeholder="Move 1" className="box-rounded box-md text-center w-95 mt-05" onChange={(e) => this.onType(e)} />
                                <input type="text" name="move2" placeholder="Move 2" className="box-rounded box-md text-center w-95 mt-05" onChange={(e) => this.onType(e)} />
                                <input type="text" name="move3" placeholder="Move 3" className="box-rounded box-md text-center w-95 mt-05" onChange={(e) => this.onType(e)} />
                                <input type="text" name="move4" placeholder="Move 4" className="box-rounded box-md text-center w-95 mt-05" onChange={(e) => this.onType(e)} />
                            </div>
                            <div className="card-modifiers flex-center">
                                <input type="text" name="ability" placeholder="Ability" className="box-rounded box-md text-center w-30 mx-025" onChange={(e) => this.onType(e)} />
                                <input type="text" name="nature" placeholder="Nature" className="box-rounded box-md text-center w-30 mx-025" onChange={(e) => this.onType(e)} />
                                <input type="text" name="item" placeholder="Item" className="box-rounded box-md text-center w-30 mx-025" onChange={(e) => this.onType(e)} />
                            </div>
                        </div>
                        <form className="i-block w-10 mx-1 mb-1" onSubmit={() => this.props.deletePoke(this.props.poke.name)}>
                            <button
                                type="submit"
                                className="box-rounded box-md negative-bg w-100">
                                Release
                            </button>
                        </form>
                        <form className="i-block w-10 mx-1 mb-1" onSubmit={() => this.props.capturePoke(this.props.poke.name, this.state)}>
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