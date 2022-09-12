const { deepEqual } = require('assert');
const Page = require("./page");
let imdbDate, imdbCountry
let relDateWiki, wikiDate, wikiCountry
let months = {
    'January': 1, 'February': 2, 'March': 3,
    'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8,
    'October': 9, 'November': 10, 'December': 11
}

class MovieDetails extends Page {
    /**
     * define selectors using getter methods
     */
    get searchInputIMDB() {
        return $('#suggestion-search');
    }

    get searchResultIMDB() {
        return $('.imdb-header__search-menu a.searchResult--const')
    }

    get releaseDateIMDB() {
        return $('a.ipc-metadata-list-item__list-content-item--link[href$="tt_dt_rdat"]')
    }

    get releaseCountryListIMDB() {
        return $$('td.release-date-item__country-name')
    }

    get releaseDateListIMDB() {
        return $$('td.release-date-item__date')
    }

    get countryIMDB() {
        return $('a.ipc-metadata-list-item__list-content-item[href$="cn"]')
    }

    get searchInputWiki() {
        return $('input#searchInput')
    }

    searchResultWiki(lastWord) {
        return $(`a[href*="${lastWord}"] .suggestion-text`)
    }

    get releaseDateWikiSelector() {
        return $$('th.infobox-label')
    }

    get releaseDateWiki() {
        return $$('th.infobox-label+td')
    }

    get countryWiki() {
        return $$('.infobox-data')
    }

    get imdbDateReturn() {
        return imdbDate
    }

    get wikiDateReturn() {
        return wikiDate
    }

    get imdbCountryReturn() {
        return imdbCountry
    }

    get wikiCountryReturn() {
        return wikiCountry
    }

    open(webpage) {
        browser.maximizeWindow()
        return super.open(webpage)
    }

    getDetailsIMDB(movieName) {
        browser.waitUntil(() => this.searchInputIMDB.isDisplayed(), { timeout: 5000, timeoutMsg: 'Homepage still not loaded' })
        this.searchInputIMDB.setValue(movieName)
        browser.waitUntil(() => this.searchResultIMDB.isDisplayed(), { timeout: 5000, timeoutMsg: 'Please check the movie name and try again' })
        this.searchResultIMDB.click()
        browser.waitUntil(() => this.releaseDateIMDB.isDisplayed(), { timeout: 5000, timeoutMsg: 'Homepage still not loaded' })
        imdbCountry = this.countryIMDB.getText()
        this.releaseDateIMDB.click()
        let relDateIMDB
        for (let index = 0; index < this.releaseCountryListIMDB.length; index++) {
            if (this.releaseCountryListIMDB[index].getText().toLowerCase() == 'india') {
                relDateIMDB = this.releaseDateListIMDB[index].getText()
                break
            }
        }
        imdbDate = new Date(relDateIMDB.split(' ')[2], months[relDateIMDB.split(' ')[1]], relDateIMDB.split(' ')[0])
    }

    getDetailsWiki(movieName) {
        browser.waitUntil(() => this.searchInputWiki.isDisplayed(), { timeout: 5000, timeoutMsg: 'Homepage still not loaded' })
        this.searchInputWiki.setValue(movieName)
        browser.waitUntil(() => this.searchResultWiki(movieName.split(' ').pop()).isDisplayed(), { timeout: 5000, timeoutMsg: 'Please check the movie name and try again' })
        this.searchResultWiki(movieName.split(' ').pop()).click()
        for (let index = 0; index < this.releaseDateWikiSelector.length; index++) {
            if (this.releaseDateWikiSelector[index].getText().toLowerCase().includes('release date')) {
                relDateWiki = this.releaseDateWiki[index].getText()
            }
            if (this.releaseDateWikiSelector[index].getText().toLowerCase().includes('country')) {
                wikiCountry = this.countryWiki[index].getText()
            }
        }
        wikiDate = new Date(relDateWiki.split(' ')[2], months[relDateWiki.split(' ')[1]], relDateWiki.split(' ')[0])
    }
}
module.exports = new MovieDetails()