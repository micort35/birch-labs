import React, { Component }from 'react';

interface TIPropTypes {
    name: string,
    placeholder: string,
    classes: string,
    onChange: Function
}

class TextInput extends Component<TIPropTypes> {
    render () {
        return (
            <input
                type="text"
                name={this.props.name}
                placeholder = {this.props.placeholder}
                className = {this.props.classes}
                onChange={(e) => this.props.onChange(e)}
            />
        )
    }
}

export default TextInput