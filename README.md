# landexplorer frontend

Web frontend for landexplorer.uk - Helping surface open data about land in the UK.

## Getting started

With `node` > 6.0 and `npm` > 3.0 installed, run:

- Clone this repo.
- `npm install`
- `npm run watch`

That'll serve up the site at http://localhost:3000 in dev mode with hot-reloading goodness.

The site is built from code in the `src` directory and output as a static website to `dist`.

## Related projects

- [landexplorer-api](https://github.com/tableflip/landexplorer-api) - Graphql api for the data
- [landexplorer-infrastructure](https://github.com/tableflip/landexplorer-infrastructure) - Ansible deploy playbook for getting live.

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
