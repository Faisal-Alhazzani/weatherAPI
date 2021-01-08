const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){ 
    res.sendFile(__dirname + "/index.html"); 
})

app.post("/", function(req,res){ 
    const query = req.body.cityName;
    const apiKey = "";
    const url = "http://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    http.get(url, function(response){
        console.log(response.statusCode); 
        response.on("data",function(data){ 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp, desc);
            res.write("<p>The tempreture is currently "+ desc+"<p>");
            res.write("<h1> The tempreture is "+ temp+"</h1>");
            res.write("<img src="+ imageUrl+">");
            res.send();
        });
    }); 
});


app.listen(3000,function(){ 
    console.log("Server is listening on port 3000");
});

