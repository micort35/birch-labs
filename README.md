# Birch Labs
Statistical visualizations to assist in Pokémon team building

## Description
Sometimes it can be tough to keep track of coverages, strengths, and stat distributions of competitive Pokémon teams. Usually, players find these flaws through testing their new teams on the ladder, yet it can be aggravating to rack up losses trying out new teams. Through Birch Labs, players are able to have this data presented them to in a glance, adjusting their teams as needed to cover all bases. Coverage gaps and other flaws are pushed to the forefront in an easily readable format and aggregated stat distributions allow users to ensure their team meets their needs in terms of raw power.

## Design
The processing is all done through client-side vanilla Javascript, using the PokeAPI to pull game data as well as Chart.js and jQuery for improved efficiency and visualizations. Bootstrap is utlilized for a majority of the page's styling, only creating custom CSS where needed.

## Known Issues:
* Code needs more modularization and can be cleaned up
* Font family not extended to charts
* Certain sprites are too large (mainly S&M, shinies from newer gens)

## TODO:
* Aggregate visualizations (resists, strengths)
* Allow deletion of a single team member
* Ability to move position of cards
* Natures reflected in stats via + - on graph
* Add move coverage visualization
* Dynamic pokeball (changes to team makeup)
* Export support for Pokémon showdown

## Contributions:
* PokeAPI, [PokeAPI-JS-Wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper)