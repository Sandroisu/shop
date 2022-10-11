const CART_FILE_PATH = 'server/db/userCart.json'
const UTF_8 = 'UTF-8'
const fs = require('fs');
const express = require('express');
const router = express.Router();
const writer = require('./cartWriter');

router.get('/', (req, res) => {
    fs.readFile(CART_FILE_PATH, UTF_8, (error, data) => {
        if (error) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

router.post(`/:id/:name`, (req, res) => {
    writer(req, res, 'add', CART_FILE_PATH);
});
router.put(`/:id/:name`, (req, res) => {
    writer(req, res, 'change', CART_FILE_PATH);
});

router.delete(`/:id/:name`, (req, res) => {
    writer(req, res, 'remove', CART_FILE_PATH);
});

module.exports = router;
