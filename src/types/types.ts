export interface PokemonData {
    readonly name: string,
    sprites: {
        readonly regular: string,
        readonly shiny: string,
        active: string
    },
    readonly types: Array<string>,
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