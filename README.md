# Birch Labs
A (WIP) Pokémon team building web app focused on providing statistical visualizations.

## Description
Sometimes it can be tough to keep track of coverages, strengths, and stat distributions of competitive Pokémon teams. Usually, players find these flaws through testing their new teams on the ladder, yet it can be aggravating to rack up losses trying out new teams. Through Birch Labs, players are able to have this data presented them to in a glance, adjusting their teams as needed to cover all bases. Coverage gaps and other flaws are pushed to the forefront in an easily readable format and aggregated stat distributions allow users to ensure their team meets their needs.

## Design
The project was built using Typescript and React. For the provisioning of Pokémon data, [PokeAPI-JS-Wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper) was used. The design's foundation was based off of Google's Material Design principles, while the implementation was inspired by the retro feel of the generations before X&Y, with a color palette derived from the iconic Pokéball.

## Known Issues:
* No support for EVs
* Sprites don't show for Pokémon forms (Alolan, Greninja-Ash, etc.)
* Not very responsive yet (designed on 1920x1080)