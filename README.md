# Shared Assets - Land Explorer

Web frontend for http://landexplorer.uk - Helping surface open data about land in the UK.

<img src="http://landexplorer.uk/svg/land-explorer-logo.svg" width="202" height="34" />

## Getting started

With `node` > 6.0 and `npm` > 3.0 installed:

- Clone this repo.
- `npm install`
- `npm run watch`

That'll serve up the site at http://localhost:3000 in dev mode with hot-reloading goodness.

The site is built from code in the `src` directory and output as a static website to `dist`.

## Related projects

- [landexplorer-api](https://github.com/tableflip/landexplorer-api) - Graphql api for the data
- [landexplorer-infrastructure](https://github.com/tableflip/landexplorer-infrastructure) - Ansible deploy playbook for getting live.

## Open Data

Shared assets has identified groups of data sets and sources that deserve a wider audience

https://docs.google.com/spreadsheets/d/1TuywMaFP1TjF0RgccEaDeUJDWTUUZfyk8oDHgZpKm1E/edit#gid=0

Simple datasets are imported as vector tile layers to mapbox.

Base map info comes from Mapbox Streets v7 & Mapbox terrain
- https://www.mapbox.com/vector-tiles/mapbox-streets-v7/#layer-reference
- https://www.mapbox.com/vector-tiles/mapbox-terrain/#layer-reference

See also:

- **Open data catalogue** http://environment.data.gov.uk/ds/catalogue/#/catalogue
- Dealing with INSPIRE land reg polygons: http://anna.ps/blog/how-to-use-land-registry-data-to-explore-land-ownership-near-you
- Defra magicmap: http://magic.defra.gov.uk/MagicMap.aspx

## Landexplorer API

Datasets that are too large or require complex queries are imported to Postgres DB with PostGIS and exposed via a graphql api at http://api.landexplorer.uk/graphiql

The API spec is an **alpha** release and **will change**. It currently provides an INSPIRE ID for a give point in the UK.

## Credits

<img src="http://landexplorer.uk/svg/sharedassets-logo-black.svg" width="220" />

Land Explorer is a [Shared Assets] project.

Built by [Outlandish] and [TABLEFLIP].

[Shared Assets]: http://www.sharedassets.org.uk/
[Outlandish]: http://outlandish.com/
[TABLEFLIP]: https://tableflip.io/
