require('dotenv').config();
const express= require("express");
const{PORT}=require('./config/serverConfig');
const{Airport,City}=require('./models/index');
const bodyPraser=require('body-parser');
const CityRepository=require('./repository/city-repository');
const ApiRoutes=require('./routes/index');
const city = require("./models/city");
const db= require("./models/index");

const setupAndStartServer=async()=>{
    //create the express object 
    const app=express();

    //middlewares
    app.use(bodyPraser.json());
    app.use(bodyPraser.urlencoded({extended:true}));

    app.use('/api',ApiRoutes);
    //start the server 
    app.listen(PORT,async()=>{
        console.log(`Server started on port ${PORT}`);
        
        // if(process.env.SYNC_DB){
        //     db.sequelize.sync({alter:true});
        // }
        
    });
}

setupAndStartServer();
