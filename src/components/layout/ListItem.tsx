import React from 'react';

function ListItem(props: any) {
    return (
        <ul>
            {props.items.map((item: string, i: number) =>
                <li key={i}>{item}</li>
            )}
        </ul>
    )
}

export default ListItem