const fs = require('fs');
const moment = require('moment/moment');
const users = [{
    id: 10,
    name: "Alex"
}]

fs.readFile('server/cart.json', 'UTF-8', (error, data) => {
    if (error) {
        console.log('IO error')
    } else {
        const us = JSON.parse(data);
        us.push(JSON.parse(`{"id":11, "name":"John"}`))
        fs.writeFile('server/cart.json', JSON.stringify(us), error => {
            if (error) {
                console.log('IO exception');
            } else {
                console.log('file write success');
            }
        });
    }
});
