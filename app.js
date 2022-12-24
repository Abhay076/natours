const fs = require('fs');
const express = require('express');

const app = express();

const port = 8000;
//for handling middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ Messages: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//     res.end('U can post!!');
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Not found',
      message: 'Id Invalid'
    });
  }
  const tour = tours.find((ele) => ele.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App is running on ${port}.....`);
});
