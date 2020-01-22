const axios = require('axios');
const cheerio = require('cheerio');

const processUrl = (url, maxSteps, prefix) => {   
    axios(url)
        .then(response => {
            console.log(`${prefix} - ${url.toUpperCase()}`)           
            
            const array = []
            const html = response.data;
            const $ = cheerio.load(html);
            const links = $('a');
            $(links).each((i, link) => {
                let href = $(link).attr('href');
                if (href !== undefined && href.includes('http')) array.push(href);
            });
            
            return array
        })
        .then(array => {
            let arrayCounter = 1;          
            
            array.forEach(item => {
                if (prefix === undefined) prefix = ''
                
                if (maxSteps === 0) {
                    console.log(`${prefix}.${arrayCounter} - ${item}`)
                } else if (maxSteps > 0) {                   
                    processUrl(item, maxSteps-1, `${prefix}.${arrayCounter}`)
                }
                arrayCounter++
            })
        })
        .catch(error => [])
}

const url = process.argv[2];
const steps = process.argv[3];
processUrl(url, steps);