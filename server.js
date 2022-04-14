const express = require('express');
const notesRoute = require('./routes/notes');
const indexRoute = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', notesRoute);
app.use('/', indexRoute);

app.listen(PORT, () => {
    console.log(`Now listening on PORT: ${PORT}`);
});