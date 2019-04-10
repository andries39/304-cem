const express=require('express')
const route=express.Router()
const game_controller = require('../controllers/game')

const {validate, ValidationError} = require('express-json-validator')
const gameStructure = require('../models/game').gameStructure


route.post('/create', validate(gameStructure), game_controller.create)
route.get('/all', game_controller.all)
route.get('/all/:keyword', game_controller.keywordsearch)
route.put('/update', validate(gameStructure), game_controller.update)

module.exports = route


route.use((err, req, res, next)=> {
    if(err){
        if(err instanceof ValidationError) {
            res.status(422).send({"status": 422, "description" : err.message})   
        } else {
            console.log("Error")
        }
    } else {
        next()
    }
})