#! /usr/bin/env node
/* jshint esnext:true */
const argv = require('yargs')
    .usage('geojson2ndjson filename.geojson\n\nConverts GeoJSON file to newline-delimited GeoJSON, one line per feature.')
    .demand(1)
    .argv;

let filename = argv._[0];
let source = require('fs').createReadStream(filename).on('error', ()=>{
    console.error("Couldn't open file.");
    process.exit(1);
});

source.pipe(require('JSONStream').parse('features.*'))
    .on('data', data => { console.log(JSON.stringify(data)); })
    .on('error', console.error);