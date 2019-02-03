
const express = require('express');
const hbs     = require('hbs');
const app     = express();

const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// hbs.registerPartials(__dirname + '/views/partials')

// Set the view engine to be HBS with views in the `/views` folder
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Everything inside `/public is accessible`
/**
 * path.join returns a normalized path 
 * by merging two paths together. 
 * It can return an absolute path, 
 * but it doesn't necessarily always do so.
 * 
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Using __dirname is the absolute path to the directory containing the source file. 
 * When you use path.resolve or path.join 
 * they will return the same result if you give the same path following __dirname
 */

// console.log(__dirname)


// Route: GET /

app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => { 
  punkAPI.getBeers()
  .then(beers => { // beers is an array of objects
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom() // promises
  .then(beers => { // // beers is an array with 1 object (yes,it's stupid)
    console.log("DEBUG x",)
    res.render('random-beer', {
    beer: beers[0]
  });
})
  .catch(error => {
    console.log(error)
  })
});
app.listen(3000);
