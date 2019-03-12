const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('./config/config');

// Settings
// ********
app.set('port', process.env.PORT || 3113)

mongoose.connect(config.database, { useNewUrlParser: true })
  .then(db => console.log('MongoDB'))
  .catch(err => console.error(err));

// Middlewares
// ***********
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
// ******
app.use('/api/autorizar', require('./routes/autorizar.routes'));
app.use('/api', require('./routes/jwt.routes'))
app.use('/api/roles', require('./routes/roles.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

// Starting the server
// *******************
app.listen(app.get('port'), () => {
  console.log('Escuchando en el ', app.get('port'));
});
