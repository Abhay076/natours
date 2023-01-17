const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = async (req, res) => {
  console.log(req.requestTime);
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      data: {
        err
      }
    });
  }
};

exports.getTour = (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success'
  });
};

exports.createTour = async (req, res) => {
  // console.log(req.body);

  // const newTour = Tour.create({req.body})
  try {
    const newTour = await Tour.create(req.body);
    res.json({
      status: 'success',
      data: {
        newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      message: err
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
