const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

const port = 8000;

app.use(morgan('dev'));
//middleware 1

//for handling middleware
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("middleware is called");
//   next()
// })
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
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
const getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt:req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Not found',
      message: 'Id Invalid',
    });
  }
  const tour = tours.find((ele) => ele.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
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
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(400).json({
      status: 'Not found',
      message: 'ID Invalid',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Here Updated Tour....',
    },
  });
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(400).json({
      status: 'Not found',
      message: 'ID Invalid',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
// //get all tour
// app.get('/api/v1/tours', getAllTour);
// //create
// app.post('/api/v1/tours', createTour);
// //getTour
// app.get('/api/v1/tours/:id', getTour);
// //update
// app.patch('/api/v1/tours/:id', updateTour);
// //delete
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTour).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`App is running on ${port}.....`);
});
