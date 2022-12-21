const express = require('express');

const app = express();

const port = 8000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ Messages: 'Hello from the server side', app: 'Natours' });
});


app.post('/', (req, res) => {
    res.end('U can post!!');
})

app.listen(port, () => {
  console.log(`App is running on ${port}.....`);
});
