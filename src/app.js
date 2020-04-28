const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 4000;

//Paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setuphandlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup staic directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Mrudula Bangale'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Mrudula'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'This page is for help.',
        name:'Mrudula'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You should provide the address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                addresss:req.query.address,

            })
        
        })

    })
    
//     res.send({
//         forecast: 'It is snowing ',
//         location:'philadelphia',
//         address: req.query.address
//     })
 })

app.get('/help/*',(req,res)=>{
   res.render('404',{
        title:'404',
        name:'Mrudula Bangale',
        errormessage:'Help article not found.'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mrudula Bangale',
        errormessage:'Page not Found'
    })

})

app.listen(port,()=>{
    console.log('server is up for port .'+port)
})