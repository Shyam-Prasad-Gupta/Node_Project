const express = require('express');

var webapp = express();

webapp.get('/', (req, res) => {
    res.send({
        names:
            [
                {
                    name: "shyam",
                    age: 28
                },
                {
                    name: "ram",
                    age: 30
                },
                {
                    name: "sumit",
                    age: 12
                },
                {
                    name: "ritika",
                    age: 6
                }
            ]
    });
});

webapp.get('/greet', (req, res) => {
    res.send('Hello, Samta Express........\n LOL');
});

webapp.get('/greet/html', (req, res) => {
    res.send('<h1>Hello, Samta Express........\n LOL</h1><h2>Hello, Samta Express........\n LOL</h2><h3>Hello, Samta Express........\n LOL</h3>');
});
debugger;
console.log(__dirname);
webapp.use(express.static('F:\\My_projects\\nodejs_projects\\node-web-server\\html-pages'));
webapp.get('/staticpage', (req, res) => {
    res.render(__dirname + '/html-pages/help.html');
});

webapp.listen(3000, () => {
    console.log('server is up and running.')
});