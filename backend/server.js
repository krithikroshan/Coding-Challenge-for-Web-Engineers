const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const passport = require("passport");
require('dotenv').config()

// const Product = require('./models/Product')

// mongoose.connect('mongodb://127.0.0.1:27017/mightyjaxx', { useNewUrlParser: true })

// mongoose.connection.once('open', () => {
//     console.log("MongoDb Connection established successfuly")
// })

// const PORT = 4000;

const app = express()
const port = process.env.PORT || 5000;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true})
.then("Connected")
.catch((err) => {
    console.error(err);
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfuly');
})

app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => {
//     Product.find((err, products) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.json(products)
//         }
//     })
// })

// app.get('/:id', (req, res) => {
//     const id = req.params.id;
//     Product.findById(id, (err, product) => {
//         res.json(product);
//     })
// })

// app.post("/create", (req, res) => {
//     const product = new Product(req.body)
//     product.save()
//     .then((product) => {
//         res.json(product)
//     })
//     .catch((err) => {
//         res.status(500).send(err.message)
//     })
// })

const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const usersRouter = require("./routes/auth");

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/users", usersRouter);

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);



app.listen(port, () => {
    console.log("Server is running on port " + port)
})