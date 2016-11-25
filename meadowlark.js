var express = require('express');
var fortune = require('./lib/fortune');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home');
    //res.type('text/plain');
    //res.send('Meadowlark Travel');
});

app.get('/about', function(req, res){
	res.render('about', {fortune: fortune.getFortune()});
    //res.type('text/plain');
    //res.send('О Meadowlark Travel');
});

// пользовательская страница 404
app.use(function(req, res, next){
    //res.type('text/plain');
    res.status(404);
    //res.send('404 — Не найдено');
    res.render('404');
});

// пользовательская страница 500
app.use(function(err, req, res, next){
    console.error(err.stack);
    //res.type('text/plain');
    res.status(500);
    //res.send('500 — Ошибка сервера');
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' +
      app.get('port') + '; нажмите Ctrl+C для завершения.' );
});