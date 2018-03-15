#! /usr/bin/env node
/* jshint esnext:true */

const LineInputStream = require('line-input-stream'),
    fs = require('fs'),
    argv = require('yargs')
        .usage('ndjson2geojson [filename.json]\n\nConverts newline-delimited GeoJSON file to regular GeoJSON.')
        .argv;

let filename = argv._[0];
let source;

if (filename) {
    source = fs.createReadStream(filename).on('error', ()=>{
        console.error("Couldn't open file.");
        process.exit(1);
    });
} else {
    source = process.stdin;
}

let prev;
const stream = LineInputStream(source)
    .setEncoding("utf8")
    .on("error", console.error)
    .on("line", function(line) {
        if (prev !== undefined) {
            console.log('        ', prev + ',');
        }
        prev = line;
    }).on("end", function() {
        console.log('        ', prev);
        console.log('    ]');
        console.log('}');

    });
 
if(stream.readable) {
    console.log(
    `{
    "type": "FeatureCollection",
    "features": [`);
}