import React, { Component } from "react";
import ListItem from './layout/ListItem';
import TextInput from './layout/TextInput';

interface PokePropTypes {
    poke: any,
    editing: boolean,
    movePoke: Function,
    deletePoke: Function,
    editPoke: Function,
    capturePoke: Function,
    toggleShiny: Function,
    onType: Function
}

class Pokemon extends Component<PokePropTypes> {
    state = {
        name: '',
        sprites: [],
        types: [],
        moves: [],
        ability: '',
        nature: '',
        item: '',
    }

    render() {
        return (
            <>
                {
                this.props.editing ? (
                    <div className="center flex-center w-25">
                        <div>
                            <img src={this.props.poke.sprites.regular} alt="Pokémon's sprite" className="sprite"/>
                            <p className="i-block text-center cap">{this.props.poke.name}</p>
                            <ListItem items={this.props.poke.types} />
                        </div>
                        <ListItem items={this.props.poke.moves} />
                        <div>
                            <TextInput name="ability" placeholder="Ability" classes="" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onType(e)}/>
                            <TextInput name="nature" placeholder="Nature" classes="" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onType(e)}/>
                            <TextInput name="item" placeholder="Item" classes="" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.props.onType(e)}/>
                        </div>
                    </div>
                ) : (
                    <div className="separator center flex-center w-25">
                        <img src={this.props.poke.sprites.regular} alt="Pokémon's sprite" className="sprite"/>
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
                            <button type="button">
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

export default Pokemon