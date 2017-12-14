var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app = express()


app.get('/scrape', function (req, res) {

    //target url
    url = 'https://www.npr.org/'

    var headline, urlSlug
    var json = {
        items: []
    }

    //managing our requests
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html)

            items = $('.story-text').toArray()

            for (let i = 0; i < items.length; i++) {
                let item = items[i]
                let article = {}

                article.headline = $('.title', item).first().text()
                article.teaser = $('.teaser', item).first().text()

                if (article.teaser) {
                    json.items.push(article)
                }
            }

            console.log(json)

            //writing to our file system
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
                console.log('File written')
            })

        }
    })

    // response to complete the circle of life
    res.send('check da console')

})

app.listen('8080')
console.log('Magic happens on port 8080')

exports = module.exports = app



//======================== CONSOLE APP ============================ //

// var express = require('express')
// var fs = require('fs')
// var request = require('request')
// var cheerio = require('cheerio')
// var app = express()

//     //target url
//     let url = 'https://www.npr.org/'

//     var headline, urlSlug
//     var json = {
//         items: []
//     }

//     //managing our requests
//     request(url, function (error, response, html) {
//         if (!error) {
//             var $ = cheerio.load(html)

//             items = $('.story-text').toArray()

//             for (let i = 0; i < items.length; i++) {
//                 let item = items[i]
//                 let article = {}

//                 article.headline = $('.title', item).first().text()
//                 article.teaser = $('.teaser', item).first().text()

//                 if (article.teaser) {
//                     json.items.push(article)
//                 }
//             }

//             console.log(json)

//             //writing to our file system
//             fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
//                 console.log('File written')
//             })

//         }
//     })


// app.listen('8080')
// console.log('Magic happens on port 8080')

// exports = module.exports = app
