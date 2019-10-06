import React from 'react';

function ListItem(props: any) {
    return (
        <ul>
            {props.items.map((item: string, i: number) =>
                <li key={gen_id()} className={props.classifier(item)}>{item}</li>
            )}
        </ul>
    )
}

const gen_id = () => Math.random().toString(36).substr(2, 9);

export default ListItem