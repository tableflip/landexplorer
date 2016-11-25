# Shared Assets frontend

Frontend for the [Shared Assets](https://github.com/tableflip/workplan/blob/master/shared-assets/tableflip-shared-assets-workplan-001.md) project, to display geographical data in a map interface.

* Clone this repo.
* `npm i`
* `npm run build`

The static site will be output at `dist/index.html`.

To watch for changes and rebuild:

`npm run watch`

## Datasets

Shared assets has identified groups of data sets and sources that deserve a wider audience

https://docs.google.com/spreadsheets/d/1TuywMaFP1TjF0RgccEaDeUJDWTUUZfyk8oDHgZpKm1E/edit#gid=0

Base map info comes from Mapbox Streets v7 & Mapbox terrain
- https://www.mapbox.com/vector-tiles/mapbox-streets-v7/#layer-reference
- https://www.mapbox.com/vector-tiles/mapbox-terrain/#layer-reference

Additional open data is being added as mapbox vector tilesets.

## Further reading

- **Open data catalogue** http://environment.data.gov.uk/ds/catalogue/#/catalogue
- Dealing with INSPIRE land reg polygons: http://anna.ps/blog/how-to-use-land-registry-data-to-explore-land-ownership-near-you
- Defra magicmap: http://magic.defra.gov.uk/MagicMap.aspx
