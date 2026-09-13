import express from 'express';

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my Cat API!');
});

app.get('/api/v1/cats', (req, res) => {
  const cat = {
    cat_id: 501,
    name: 'Milo',
    birthdate: '2021-09-18',
    weight: 5.2,
    owner: 'Nadia',
    image: 'https://loremflickr.com/320/240/cat',
  };

  res.json(cat);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});