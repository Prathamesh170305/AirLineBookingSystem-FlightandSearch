const express=require('express');
const {FlightMiddlewares}=require('../../middlewares/index');
const cityController=require('../../controllers/City-controller');
const flightController=require('../../controllers/flight-controller');
const AirportController=require('../../controllers/airport-controller');

const router=express.Router();

router.post('/city',cityController.create);
router.delete('/city/:id',cityController.destroy);
router.get('/city/:id',cityController.get);
router.get('/city',cityController.getAll);
router.patch('/city/:id',cityController.update);
 
router.post('/flights',
    FlightMiddlewares.validateCreateFlight,
    flightController.create);
router.get('/flights',flightController.getAll);
router.get('/flights/:id',flightController.get);
router.patch('/flights/:id',flightController.update);

router.post('/airports',AirportController.create);

module.exports=router; 
