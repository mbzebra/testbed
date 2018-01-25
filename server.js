const express = require('express')
const bodyParser= require('body-parser')
const app = express()
var db
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


const MongoClient = require('mongodb').MongoClient

var db



MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) return console.log(err)
    db = client.db('testbeddb')
    app.listen(3000, () => {
    console.log('listening on 3000')
})
})




app.get('/', (req, res) => {
    var cursor = db.collection('testdataset').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here

        res.render('index.ejs', {quotes: results})

    })

})

app.post('/quotes', (req, res) => {
    db.collection('testdataset').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
res.redirect('/')
})
})




