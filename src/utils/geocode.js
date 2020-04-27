const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFuZ2FsZSIsImEiOiJjazk4NXp1ZWowdXBuM2hwYzM3cnQ1dmNjIn0.0kzlqIOHkPRJhu6xV1L7xQ&limit=1'
    
    request({url:url, json:true },(error, {body}) =>{
        if(error){
            callback('únable to connect to location services.',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location.Try another search.',undefined)
        }else{
            callback(undefined,{
                latitude :body.features[0].center[0],
                longitude :body.features[0].center[1],
                location :body.features[0].place_name
            })
        }
    })
}

module.exports = geocode