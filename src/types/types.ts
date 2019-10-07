export interface PokemonData {
    [name: string]: string | Array<string> | Object,
    sprites: {
        readonly regular: string,
        readonly shiny: string,
        active: string
    },
    types: Array<string>,
    moves: Array<string>,
    ability: string,
    nature: string,
    item: string
    stats: {
        HP: number,
        Atk: number,
        Def: number,
        SpA: number,
        SpD: number,
        Spe: number
    }
}