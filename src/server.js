const express = require('express');
const session = require('express-session');
const server = express();
const routes = require('./routes');
const path = require('path');

server.use(
   session({
      secret: 'qwertyuiop',
      resave: true,
      saveUninitialized: true,
   })
);

//usando template engine
server.set('view engine', 'ejs');

//Mudar a localização da pasta views (retirando a constante da pasta views das rotas)
server.set('views', path.join(__dirname, 'views'));

//habilitar arquivos estáticos
server.use(express.static('public'));

// habilitar o req.body
server.use(express.urlencoded({ extended: true }));
// server.use(bodyParser.urlencoded({ extended: true }));

//routes
server.use(routes);

server.listen(3000, () => console.log('server runnig'));
