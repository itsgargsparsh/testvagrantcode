const Movie = require('../pageobjects/movie')
const { deepEqual } = require('assert');
const fs = require('fs');
let movieName = JSON.parse(fs.readFileSync('test/testData/movieName.json'))
let source = JSON.parse(fs.readFileSync('test/testData/source.json'))
let imdbDate, imdbCountry
let wikiDate, wikiCountry

describe('Validate country and release date from two sources', () => {
    it('Open IMDB and fetch data', () => {
        Movie.open(source[0].source)
        Movie.getDetailsIMDB(movieName[0].movieName)
        imdbDate = Movie.imdbDateReturn
        imdbCountry = Movie.imdbCountryReturn
    });

    it('Open Wikipedia and fetch data', () => {
        Movie.open(source[1].source)
        Movie.getDetailsWiki(movieName[0].movieName)
        wikiDate = Movie.wikiDateReturn
        wikiCountry = Movie.wikiCountryReturn
    });

    it('Validate if IMDB and WIKi have same release date', () => {
        deepEqual(wikiDate, imdbDate, "Date mis match")
    });

    it('Validate if IMDB and WIKi have same Country of origin', () => {
        deepEqual(wikiCountry.toLowerCase(), imdbCountry.toLowerCase(), "Country mis match") 
    });
});