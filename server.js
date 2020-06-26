
const express = require("express");
const app = express();


app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:time", (request, response) => {
  var time = request.params.time
  var error = {"error" : "Invalid Date" };
  var unix=0;
  var utc="";
  var myDate;
  if(isNormalInteger(time)){
     
    unix=parseInt(time)
    myDate= new Date(unix)
    utc= myDate.toUTCString()
  }else{
    var date = time.split("-")
    if(date.length!=3)  response.json(error);
    if(date[0]<1||date[1]>12||date[1]<1||date[2]>[31]||date[2]<1)response.json(error);
     myDate = new Date(date[0], date[1]-1, date[2])
    unix=myDate.getTime();
    utc=myDate.toUTCString()

  }
  
  var jsonTimes = {"unix":unix,
             "utc":utc}
  response.json(jsonTimes);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}
