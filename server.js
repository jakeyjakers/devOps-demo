const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const cors = require('cors')

const { ROLLBARTOKEN} = process.env

app.use(express.json())
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: ROLLBARTOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

try {
    
   const jared = undefined.length
    jared()

 } catch(error){
    rollbar.error(error)
}
const jared = true;
if (!jared){
    rollbar.error("jared is defintely true")
}

app.post('/api/pokemon', (req, res) => {
    let {name} = req.body

    const index = digimons.findIndex(digimon => {
        return digimon === name
    })

    try {
        if (index === -1 && name !== '') {
            digimon.push(name)
            res.status(200).send(digimons)
        } else if (name === ''){
            res.status(400).send('You must enter a name.')
        } else {
            res.status(400).send('That digimon already exists.')
        }
    } catch (err) {
        console.log(err)
        rollbar.log(err)
       
    }
 })
 




const pokemons = ['Metagross', 'Blastoise', 'Sneasel']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    rollbar.error("you got an error")
    
})

app.get('/api/pokemon', (req, res) => {
    res.status(200).send(pokemons)
})

app.post('/api/pokemon', (req, res) => {
   let {name} = req.body
   

   const index = pokemons.findIndex(pokemon => {
       return pokemon === name
   })

   try {
       if (index === -1 && name !== '') {
           pokemons.push(name)
           res.status(200).send(pokemons)
       } else if (name === ''){
           res.status(400).send('You must enter a name.')
           rollbar.warning('noone entered a name')
       } else {
           res.status(400).send('That pokemon already exists.')
           rollbar.error('Pokemon exists')
       } 

   } catch (err) {
       console.log(err)
      
   }
})

app.delete('/api/pokemon/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    pokemons.splice(targetIndex, 1)
    res.status(200).send(pokemons)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))
