const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const app = express();

mongoose.connect(process.env.CONNECT || 'mongodb+srv://hanane:Mongo1@cluster0.sydehoi.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(cors('http://localhost:'));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, x-client-key, x-client-token, x-client-secret, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

//app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/book', bookRoutes);

//app.use('/images', express.static(path.join(__dirname, 'images')));*/

module.exports = app;