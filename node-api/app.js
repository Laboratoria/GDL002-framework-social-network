const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan'); //Crea una nueva función de middleware, registra el acceso a todas las rutas e imprimirlas por pantalla. Se llamará a la función de formato con tres argumentos tokens, req y res, donde tokens es un objeto con todos los tokens definidos, req es la solicitud HTTP y res es la respuesta HTTP. Se espera que la función devuelva una cadena que será la línea de registro, o undefined / null para omitir el registro
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//db
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true,  useCreateIndex: true })
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);   
});


//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
//apiDocs
app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err){
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: 'Unauthorized!'});
    }
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node js API es listengin on port: ${port}`);
});