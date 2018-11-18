"use strict";

const
    Fs = require("fs"),
    Path = require("path"),
    Args = require("./lib/arguments-parser"),
    Exif = require("fast-exif"),
    folders = Args.folders;

folders.forEach(function(folder) {
    folder.forEach(function(filename) {
        Exif.read(filename).then(exif => {
            const
                path = Path.dirname(filename),
                date = exif.exif.DateTimeOriginal,
                newFilename = getFreeName(Path.join(path, formatDate(date)));
            Fs.rename(filename, newFilename, err => {
                if (err) {
                    console.error("Unable to rename", filename);
                    console.error("  ", err);
                } else {
                    console.log(filename, " -> ", newFilename);
                }
            })
        });
    });
});


function formatDate(date) {
    const
        year = date.getFullYear(),
        month = pad(date.getMonth() + 1),
        day = pad(date.getDate()),
        hours = pad(date.getHours()),
        minutes = pad(date.getMinutes()),
        seconds = pad(date.getSeconds());
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}


function pad(num) {
    let txt = `${num}`;
    while (txt.length < 2) txt = '0' + txt;
    return txt;
}


function getFreeName(filenameWithoutExt) {
    let
        counter = 0,
        suffix = '';
    while (true) {
        const filename = `${filenameWithoutExt}${suffix}.jpg`;
        if (!Fs.existsSync(filename)) return filename;
        counter++;
        suffix = `-${counter}`;
    }
}