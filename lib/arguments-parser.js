"use strict";

const
    Fs = require("fs"),
    Path = require("path");

if (process.argv.length < 3) {
    console.error("");
    console.error("At least one argument is needed: the folder where we must rename pictures.");
    console.error("");
    process.exit(-1);
}

exports.folders = process.argv.splice(2).filter(testPathExistence).map(listJpegFiles);


function testPathExistence(path) {
    const exists = Fs.existsSync(path);
    if (!exists) {
        console.error("# Folder not found: ", path);
        return false;
    }
    const stats = Fs.statSync(path);
    if (!stats.isDirectory(path)) {
        console.error("# This is not a directory: ", path);
        return false;
    }
    return true;
}


function listJpegFiles(path) {
    const dirs = Fs.readdirSync(path).map(file => Path.join(path, file));
    return dirs.filter(file => file.toLowerCase().endsWith(".jpg"));
}