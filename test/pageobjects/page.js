const fs = require('fs')
let source = JSON.parse(fs.readFileSync('test/testData/source.json'))
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param page base url; IMDB or Wikipedia
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    // open(page, path) {
    open(page) {
        if (page == 'IMDB') {
            return browser.url(source[0].url)
        } else {
            return browser.url(source[1].url)
        }
    }
}