var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors')
var app = express()


app.use(bodyParser.json());
// JavaScript Document
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "https://webdevbootcamp-mazenoncloud9.c9users.io:8081");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Credentials", true);
   next();
});


//7 Restful Routes are: 1) index /app-name get, list all values 2) new /app-name/new get show new form,  3) create /app-name post create item then redirect
//4) show  /app-name/:id get show info about one item // 5) edit app-name/:id/edit show edit form for one value get 
//6)  update app-name/:id put update value then redirect 7) delete app-name/:id destroy delete then redirect
var mongoose = require("mongoose");
var url = process.env.DATABASEURL || "mongodb://localhost/restfulrouting";
mongoose.connect(url);
var restfulSchema = new mongoose.Schema({ firstname: String, lastname: String });
//RestFul - 1 - Index Load all values
var people = mongoose.model("people", restfulSchema);


//Restful - 2 - New Form
app.get('/RestFulRouting/new', function(req, res) {

   people.find(function(err, succ) {
      if (err) {
         console.log("You have an error in your statement");
      }
      else {
         console.log("Your Page Has Loaded ");
      }
      res.render("indextemplate", { people: succ, mode: 4 });
   });

});

//Restful - 3 - Create a new Value then Redirect
app.post('/RestFulRouting/', function(req, res) {

   var firstname = req.body.firstname;
   var lastname = req.body.lastname;
   var newValue = { firstname: firstname, lastname: lastname };
   people.create(newValue, function(err, succ) {
      if (err) {
         console.log("You have an error");
      }
      else {
         res.send(succ);
      }
   });

});

//Restful -Show - 4 - Display one Item by ID
app.get('/restfulrouting/:user_id/show', function(req, res) {
   var user_id = req.params.user_id;
   people.find({ _id: user_id }, function(err, succ) {
      if (err) {

      }
      else {

         res.send(succ);
      }
   });

});

//Restful - 5 - Edit load edit form
app.get('/restfulrouting/:user_id/edit', function(req, res) {
   var user_id = req.params.user_id;
   res.redirect("/RestFulRouting/" + user_id + "/show");
});

//Restful -Show - 6 - Edit one value
app.post('/restfulrouting/:user_id/edit', function(req, res) {
   var user_id = req.params.user_id;
   var firstname = req.body.firstname;
   var lastname = req.body.lastname;
   var newdata = { firstname: firstname, lastname: lastname };
   people.findByIdAndUpdate(user_id, newdata, { new: true })
      .then(function(succ) {
         res.json(succ);
      })
      .catch(function(err) {
         res.send(err);
      })
});


//Restful -Show - 7 - Destroy
app.post('/restfulrouting/:user_id/distroy', function(req, res) {
   var user_id = req.params.user_id;
   people.findByIdAndRemove(user_id, function(err, succ) {
      if (err) {
         console.log("There an is error in your program")
      }
      else {
         res.send(succ);
      }

   });

})

// AJAX FUNCTIONS FOR REACT

app.get("/loadallusers/", function(req, res) {


   people.find(function(err, succ) {

      if (err) {
         console.log("you have an error");
      }
      else {

         res.send(succ)
      }

   }); // end of find   

});

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   const path = require('path');
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })
}


app.listen(process.env.PORT)
