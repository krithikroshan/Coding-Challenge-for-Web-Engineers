const router = require('express').Router();
let Category = require('../models/Category');

router.route('/').get((req, res) => {
    Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json(err))
})

router.route('/:id').get((req, res) => {
    const id = req.params.id;
    Category.findById(id, (err, category) => {
        res.json(category);
    })
})

router.route('/add').post((req, res) => {
    const category = new Category(req.body)
    console.log(res.body)
    category.save()
    .then((category) => {
        res.json(category)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

module.exports = router