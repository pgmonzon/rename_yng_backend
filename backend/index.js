const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3113)

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/roles', require('./routes/roles.routes'));

//Starting the server
app.listen(app.get('port'), () => {
  console.log('Escuchando en el ', app.get('port'));
});
