import React, { Component } from 'react';

interface SearchPropTypes {
    searchPoke: Function,
    validSearch: boolean
}

class Search extends Component<SearchPropTypes> {
    state = {
        title: ''
    }

    onEncounter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.searchPoke(this.state.title);
        this.setState({ title: '' });
        let searchbar = document.getElementById('search') as HTMLInputElement;
        searchbar.value = '';
    }

    onType = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ [e.currentTarget.name]: e.currentTarget.value } );

    render () {
        return (
            <form onSubmit={this.onEncounter}>
                <input
                    type="text"
                    name="title"
                    id="search"
                    className="search box-rounded white-bg center text-center block w-25"
                    placeholder="Enter a Pokémon"
                    onChange={(e) => this.onType(e)}
                />
                <button
                    type="submit"
                    className="box-md box-rounded crimson-l-bg center text-center block">
                    Encounter!
                </button>
            </form>
        )
    }
}

export default Search