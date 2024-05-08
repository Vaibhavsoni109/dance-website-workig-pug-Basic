const express = require("express");
const path = require("path");
const app = express();
// const bodyParser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
    
}
const port = 8000;


// define mongoose schema

const ConatctSchema = new mongoose.Schema({
    name: {type:String},
    phone:{type:String},
    email:{type:String},
    address:{type:String},
    desc:{type:String}
    
   
});

const Contact = mongoose.model('contact', ConatctSchema);
module.exports = Contact

app.use(express.static('static'))

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory




// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})



app.post('/contact', async (req, res) => {
    const myData ={
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        desc:req.body.desc
    }
   
    Contact.insertMany([myData]);
        res.send("this data store in the database");
  
   
    // res.status(200).render('contact.pug');
});

    app.listen(8000, () => {
        console.log(`The application started successfully on port http://localhost:${port}`);
    });