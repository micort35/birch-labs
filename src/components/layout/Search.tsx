import React, { Component } from 'react';

interface SearchProps {
    query: string,
    validSearch: boolean,
    searchPoke: Function,
    onSubmit: Function,
    onChange: Function
}

class Search extends Component<SearchProps> {
    render () { 
        return (
            <form onSubmit={(e) => this.props.onSubmit(e)}>
                <input
                    type="text"
                    name="query"
                    className={"search box-rounded white-bg center text-center block w-25 mb-1" + (this.props.validSearch ? "" : " error")} 
                    placeholder="Enter a Pokémon"
                    value={this.props.query}
                    onChange={(e) => this.props.onChange(e)}
                />
                <button
                    type="submit"
                    className="box-rounded box-md crimson-l-bg center text-center block w-15 mb-1">
                    Encounter!
                </button>
            </form>
        )
    }
}

export default Search