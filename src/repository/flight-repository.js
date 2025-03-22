const { where } = require('sequelize');
const { Flights } = require('../models/index');
const { compareTime } = require('../utils/helper');
const { Op } = require('sequelize');

class FlightRepository {

    //function for create filter
    //#-->private member function

    #createFilter(data) {
        let filter = {}; // Initialize filter object

        if (data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if (data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId; // Fixed typo
        }
        //inbetween prices
        if (data.minPrice && data.maxPrice) {
            Object.assign(filter, {
                [Op.and]: [
                    { price: { [Op.lte]: data.maxPrice } },
                    { price: { [Op.gte]: data.minPrice } }
                ]
            })
        }
        if (data.minPrice) {
            filter.price = { [Op.gte]: data.minPrice }; // Fixed minPrice filter
        }
        if (data.maxPrice) {
            filter.price = { [Op.lte]: data.maxPrice }; // Fixed maxPrice filter
        }
        return filter; // ✅ Return the filter object
    }


    async createFlight(data) {
        try {
            if (!compareTime(data.arrivalTime, data.departureTime)) {
                throw {
                    error: 'Arrival time cant be less than departure time'
                }
            }
            const flight = await Flights.create(data);
            return flight;
        }
        catch (error) {
            console.log("Something is wrong in the flight-repo(createflight) ");
            throw { error };
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        }

        catch (error) {
            console.log("Something is wrong in the flight-repo(getflight) ");
            throw { error };
        }
    }

    async getAllFlights(filter) {
        try {
            const filterObject = this.#createFilter(filter);
            const flights = await Flights.findAll({
                where: filterObject
            });
            return flights;
        }

        catch (error) {
            console.log("Something is wrong in the flight-repo(getAllflight) ");
            throw { error };
        }
    }

    async updateFlights(flightId,data){
        try {
            await Flights.update(data,{
                where:{
                    id:flightId
                }
            });
        } catch (error) {
            console.log("Something is wrong in the flight-repo(updateFlights) ");
            throw { error };
        }
    }
}


module.exports = FlightRepository;

/*
{
    where:
        {
            arrivalAirportId:2,
            departureAirportId:4,
            price:{[Op.gte]:4000}
        }
}
*/