const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscrubed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/f2c7a4781ac605a3d328bfb67cae5da6-us5";

  const options = {
    method: "POST",
    auth: "Baranjoe:f2c7a4781ac605a3d328bfb67cae5da6-us5"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  console.log(firstName, lastName, email);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});

// API KEY
// f2c7a4781ac605a3d328bfb67cae5da6-us5

// AUDIENCE ID
// a95f1160a6
