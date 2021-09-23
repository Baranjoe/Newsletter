const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log("server is running on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Setting Up mailchimp
// https://mailchimp.com/developer/guides/create-your-first-audience/

mailchimp.setConfig({
  apiKey: "f2c7a4781ac605a3d328bfb67cae5da6-us5",
  server: "us5"
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const listId = "a95f1160a6";

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };

  // Uploading the data to the server

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    res.sendFile(__dirname + "/success.html")
     console.log(
    `Successfully added contact as an audience member. The contact's id is ${
     response.id
     }.`
    );
    }
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
     run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });

//   var data = {
//     members: [
//       {
//         email_address: email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: firstName,
//           LNAME: lastName
//         }
//       }
//     ]
//   };
//
//   const jsonData = JSON.stringify(data);
//
//   const url = "https://us5.api.mailchimp.com/3.0/lists/f2c7a4781ac605a3d328bfb67cae5da6-us5";
//
//   const options = {
//     method: "POST",
//     auth: "Baranjoe:f2c7a4781ac605a3d328bfb67cae5da6-us5"
//   }
//
//   const request = https.request(url, options, function(response){
//     response.on("data", function(data) {
//       console.log(JSON.parse(data));
//     });
//   });
//
//   request.write(jsonData);
//   request.end();
//   console.log(firstName, lastName, email);
// });


// API KEY
// f2c7a4781ac605a3d328bfb67cae5da6-us5

// AUDIENCE ID
// a95f1160a6
