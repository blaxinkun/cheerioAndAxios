// with this program we can get the price list of one site by Url, using
// the libraries axios and cheerios.
// I was trying to do the task as you asked me but I couldn't get the loyalty points because
//  I couldn't log in for the CSRF Token security.

// localhost:3000/price


const cheerio = require('cheerio');
const axios = require('axios').default;
const express = require('express')
const app = express()
const port = 3000

const url = 'https://shop.mydespar.it/spesa-consegna-domicilio/70033/frutta_277?search=&Other=IsBio&Other=IsVeggie&CategoryName=Frutta%2Bsecca';

let processProductObject = ($, productObject) => {
  let title = $(productObject).find('h3').text().trim();
  let price = $(productObject).find('span.price').text().trim();
  
  return `  ${title}: ${price}`;
  
};


function parseHTML (responseData) {
  let $ = cheerio.load(responseData);
      
  return $(".product-info") 
    .toArray()
    .map((productObject) => processProductObject($, productObject));
};


axios.get(url)
  .then(function(response) {
      console.log(parseHTML(response.data));
    })
    
// api with express 

    app.get('/price', (req, res) => {
  axios.get(url)
    .then(function(response) {
      res.json(parseHTML(response.data));
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
