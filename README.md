## geojson2ndjson

Converts a GeoJSON file on disk into a newline-delimited output, following the [ndjson](http://ndjson.org/) specification. So you can combine it with the [ndjson-cli](https://www.npmjs.com/package/ndjson-cli) tools, for instance.

### Usage

```
npm install -g geojson2ndjson
geojson2ndjson myfile.geojson | ...
```

Or read from standard input:

```
cat myfile.geojson | geojson2ndjson | ...
```

Or multiple files:

```
geojson2ndjson *.geojson > everything.nd.json
```

## ndjson2geojson

Converts a line-delimited GeoJSON file on disk into regular GeoJSON output, with no validation.

### Usage

```
npm install -g geojson2ndjson
ndjson2geojson myfile.json | ...
```

Or read from standard input:

```
cat myfile.json | ndjson2geojson | ...
```

### Examples

List the properties of every feature, without the geometries:

```
geojson2ndjson myfile.geojson | ndjson-map d.properties
```

Remove every property except "name" from a GeoJSON file:

```
geojson2ndjson myfile.geojson | ndjson-map 'd.properties = {name: d.properties.name}, d' | ndjson2geojson > myfile-out.geojson
```