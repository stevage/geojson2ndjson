#! /usr/bin/env node
/* jshint esnext:true */
const argv = require('yargs')
    .usage('geojson2ndjson [filename.geojson]\n\nConverts GeoJSON file to newline-delimited GeoJSON, one line per feature.')
    .argv;


function processFile(filename) {
    let source;
    if (filename) {
    source = require('fs').createReadStream(filename).on('error', ()=>{
            console.error("Couldn't open file.");
            process.exit(1);
        });
    } else {
        source = process.stdin;
    }
    return new Promise((resolve, reject) => {
        source.pipe(require('JSONStream').parse('features.*'))
        .on('data', data => { console.log(JSON.stringify(data)); })
        .on('error', e => { 
            console.error(e);
            reject(e);
        }).on('end', resolve)
    });
}

async function processAll() {
    if (!filenames.length) {
        processFile()
    } else {
        return filenames.forEach(async filename => {
            await processFile(filename)
        });
    }
}

const filenames = argv._;

processAll(filenames);
