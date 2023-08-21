const express = require("express");
const { doctorModel } = require("../Model/doctor.model");

const doctorRoute = express.Router();



doctorRoute.get("/appointments", async(req,res) => {
    try{
       const {specialization} = req.query;
       if(specialization){
        const doctors = await doctorModel.find({specialization});
        res.status(200).json(doctors);
       }else{
        const doctors = await doctorModel.find();
        res.status(200).json(doctors);
       }
    }catch(err){
        res.status(400).json({error:err});
    }
})

doctorRoute.get("/appointments/:name", async (req,res) => {
    try{
      const name = req.params.name;
    //   console.log(name);
      const doctors = await doctorModel.find({name:name});
    //   console.log(doctors);
      res.status(200).json(doctors);
    }catch(err){
        res.status(400).json({error:err});
    }
})


doctorRoute.post("/appointments", async(req,res) => {
    try{
       const {name, image, specialization, experience, location, date, slots, fee} = req.body;
       const doctor = new doctorModel({name, image, specialization, experience, location, date, slots, fee});
       await doctor.save();
       res.status(200).json({msg: "Doctor successfully added", doctor: req.body});
    }catch(err){
        res.status(400).json({error:err});
    }
})


doctorRoute.patch("/appointments/:id", async(req,res) => {

    try{
        const id = req.params.id;
       await doctorModel.findByIdAndUpdate({_id:id}, req.body);
       res.status(200).json({msg: "Doctor successfully edited"});
    }catch(err){
        res.status(400).json({error:err});
    }
       
})


doctorRoute.delete("/appointments/:id", async(req,res) => {
    try{
      const id = req.params.id;
      await doctorModel.findByIdAndDelete({_id:id});
      res.status(200).json({msg: "Doctor successfully removed"});
    }catch(err){
        res.status(400).json({error:err});
    }
})








module.exports = {
    doctorRoute
}