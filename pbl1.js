const axios = require('axios');
const cheerio = require('cheerio');

const url = process.argv[2]
console.log(url)

const array = []
axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const links = $('a');
        $(links).each((i, link) => {
            let href = $(link).attr('href');
            if (href !== undefined && href.includes('http')) array.push(href);

        });
        return array
    })
    .then(array => console.log(array))
    .catch(error => console.log(error))