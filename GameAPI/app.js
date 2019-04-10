const Express = require ('express')
const BodyParser = require('body-parser')
const Game = require('./routes/game')
const App = Express()

App.use(BodyParser.json())
App.use(BodyParser.urlencoded({ extended: true }))
App.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
App.use('/', Game)

const port = 5000

App.listen(port, () => {
    console.log(`Server is up and running on port numbet ${port}`)
})


