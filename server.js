const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//const html = require('html');



var app = express();

app.set('view engine', 'hbs');
//with this configuration we can save all views with extension .html and still we can use hbs files 
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    if (text != undefined)
        return text.toUpperCase();
});

//userdefined middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to the server.log file.')
        }
    });
    //fs.writeFileSync('app_analytics.txt', `${now}: ${req.method} ${req.url}`);
    next();
});

//another user defined middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         maintenanceTitle: 'Site is under maintenance...'
//     });
// });

//to use express inbuilt static middleware to read or load the static contents
app.use(express.static(__dirname + '/html-pages'));


app.get('/about', (req, res) => {
    //res.send('<h1>About</h1><p>Hi, this is About page.</p>')
    res.set('Content-Type', 'text/html');
    res.render('about', {
        pageTitle: 'About Page',
        pageHeader: 'Page sweet page',
        pageBody: 'Lorem ipsum of page.',
        currentYear: new Date().getFullYear()
    }, (err, html) => {
        if (err != null)
            console.log('Got you ERROR bitch \n' + err);
        //console.log(html);
        res.send(html);
    });
});

app.get('/', (req, res) => {
    //res.send('<h1>Home</h1><p>Hi, this is home page.</p>')
    res.render('home', {
        pageTitle: 'Home Page',
        pageHeader: 'Welcome to our website',
        pageBody: 'One stop shop of all your grocery need.',
        currentYear: new Date().getFullYear()
    })
});

app.get('/name', (req, res) => {
    res.send({
        fname: "shyam",
        lname: "gupta"
    })
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/careers', (req, res) => {
    res.render('career.hbs', {
        pageTitle: 'Career Page',
        pageHeader: 'Welcome to our career section',
        pageBody: 'Career Opportunities'
    })
});

app.listen(8080, () => {
    console.log('Server is up and running on port 8080')
});