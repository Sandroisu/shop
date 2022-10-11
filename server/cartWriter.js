const fs = require('fs');
const cartUtil = require('./cartUtil');

const actions = {
    add: cartUtil.add,
    change: cartUtil.change,
    remove: cartUtil.remove,
};

const writer = (req, res, action, file) => {
    fs.readFile(file, 'UTF-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send(JSON.stringify({ result: 0, text: err }));
                } else {
                    res.send(JSON.stringify({ result: 1, text: 'SUCCESS' }));
                }
            });
        }
    })
};

module.exports = writer;