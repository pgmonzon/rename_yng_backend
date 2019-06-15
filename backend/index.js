const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('./config/config');
const eH = require('./_helpers/error');
const msj = require('./_helpers/mensajes');

// Settings
// ********
app.set('port', process.env.PORT || 3113);
process.env['USR_LOGUEADO'] = 'huésped';
process.env['ID_LOGUEADO'] = '111111111111111111111111';

mongoose.connect(config.database, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(db => console.log('MongoDB ' + mongoose.version))
  .catch(err => console.error(err));

// Middlewares
// ***********
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
// ******
app.use('/api/autorizar', require('./routes/autorizar.routes'));
// arriba de esta línea NO requiere token
app.use('/api', require('./routes/jwt.routes'));
// abajo de esta línea SI requiere token
app.use('/api/permisos', require('./routes/permisos.routes'));
app.use('/api/roles', require('./routes/roles.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

// 404 not found
// *************
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.type = 'Not Found';
  next(err);
});

// Error Handler
// *************
app.use(function(error, req, res, next) {
  msj.sendError(req, res, 'error', error.status)(error)
});

// Starting the server
// *******************
app.listen(app.get('port'), () => {
  console.log('YangeeReloaded escuchando en el', app.get('port'));
});
