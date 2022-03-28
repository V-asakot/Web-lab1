const express = require("express")
const crypto = require('crypto');
const path = require("path")
var XMLHttpRequest = require('xhr2');
const port = 5555
const app = express()

const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static(__dirname));

app.get("/", (req, response) => {
  response.sendFile(path.join(__dirname, "src/views/index.html"))
})

app.post("/", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(404);
  console.log(request.body);

  var xhr = new XMLHttpRequest();
  var url = "https://helloworldprojectt.herokuapp.com/v1/authorization";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 ) {
        
        if(xhr.status === 200) 
            response.sendFile(path.join(__dirname, "src/views/mainPage.html"));
        else 
            response.sendFile(path.join(__dirname, "src/views/error.html"));
      }
  };
  var sha1 = crypto.createHash('sha1').update(request.body.userPass).digest('hex');
  var data = JSON.stringify({"login": request.body.userLogin, "password": sha1});
  xhr.send(data);
});

app.listen(port, () => {
  console.log("Adress: localhost:"+port)
})