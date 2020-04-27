const request = require('request')

const forecast =(latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=47db309855920c732c10503f2e6b6435&query=' +latitude+','+longitude+'&units=f'

    request({url:url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, 'It is currently '+body.current.weather_descriptions[0] + ','+body.current.temperature+' degress out.But Feel like ' +body.current.feelslike +' degrees')

        }
    })
}

module.exports = forecast
