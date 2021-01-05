const express = require("express");
const app = express();
const pool = require("./db")
const hateoasLinker = require('express-hateoas-links');

app.use(express.json()); //kako bismo mogli pristupiti req.body-u u kojem su zapisani podaci od klijenta (requests)

//Routes:


//barem 5 GET krajnjih točaka

//dohvati sve: GET
app.get("/venues", async (req, res) => {
   try {
      const allVenues = await pool.query("SELECT * FROM venues");
      var venuesResponse = {
         "status": "OK",
         "message": "All venues fetched",
         "response": {
            "venues": allVenues.rows,
            "links": [{
                  "href": "venues/1",
                  "rel": "1",
                  "type": "GET"
               },
               {
                  "href": "venues/2",
                  "rel": "2",
                  "type": "GET"
               },
               {
                  "href": "venues/",
                  "rel": "/",
                  "type": "POST"
               },
               {
                  "href": "venues/1",
                  "rel": "1",
                  "type": "PUT"
               },
               {
                  "href": "venues/2",
                  "rel": "2",
                  "type": "PUT"
               },
               {
                  "href": "venues/2",
                  "rel": "2",
                  "type": "DELETE"
               }
            ]
         }
      }
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(venuesResponse);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//dohvati sve: GET
app.get("/worldcups", async (req, res) => {
   try {
      const allWorldcups = await pool.query("SELECT * FROM worldcups");
      var worldcupsResponse = {
         "status": "OK",
         "message": "All worldcups fetched",
         "response": {
            "worldcups": allWorldcups.rows,
            "links": [{
                  "href": "worldcups/1930",
                  "rel": "1930",
                  "type": "GET"
               },
               {
                  "href": "worldcups/1930/venues",
                  "rel": "1930/venues",
                  "type": "GET"
               }
            ]
         }
      }
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(worldcupsResponse);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//dohvati odredjeni: GET
app.get("/worldcups/:year", async (req, res) => {
   const {
      year
   } = req.params;
   try {
      const worldcup = await pool.query("SELECT * FROM worldcups WHERE year = $1", [year])
      var worldcupResponse;
      const rowCount = worldcup.rowCount;
      //ako ne postoji worldcup s tim year-om -> 404 Not Found
      if (rowCount == 0) {
         worldcupResponse = {
            "status": "Not Found",
            "message": "Worldcup with the provided year doesn't exist",
            "response": null
         }
         res.status(404);
      }
      //ako postoji, vrati dohvaceni objekt
      else {
         var worldcupResponse = {
            "status": "OK",
            "message": "Fetched worldcup object",
            "response": {
               "worldcup": worldcup.rows[0],
               "links": [{
                  "href": year + "/venues",
                  "rel": "venues",
                  "type": "GET"
               }]
            }
         }
         res.status(200);
         res.setHeader("Content-Type", "application/json");
      }
      res.json(worldcupResponse);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//dohvati sve: GET
app.get("/worldcups/:year/venues", async (req, res) => {
   const year = req.params.year;
   var Response;
   try {
      const worldcup = await pool.query("SELECT * FROM worldcups WHERE year = $1", [year])
      const rowCount = worldcup.rowCount;
      //ako ne postoji worldcup s tim year-om -> 404 Not Found
      if (rowCount == 0) {
         Response = {
            "status": "Not Found",
            "message": "Worldcup with the provided year doesn't exist",
            "response": null
         }
         res.status(404);
      }
      //ako postoji, vrati dohvacene objekte
      else {
         //select name, city and capacity of the venues for that year
         const yearVenues = await pool.query("SELECT venues.name, venues.city, venues.capacity from worldcups join worldcups_venues on (worldcups.year = worldcups_venues.year) join venues on (worldcups_venues.venueid = venues.id) WHERE worldcups.year = $1", [year]);
         Response = {
            "status": "OK",
            "message": "Fetched worldcup venues",
            "response": {
               "year": year,
               "venues": yearVenues.rows,
               "links": [{
                  "href": "venues/",
                  "rel": "/",
                  "type": "GET"
               }]
            }
         }
         res.status(200);
         res.setHeader("Content-Type", "application/json");
      }
      res.json(Response);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//dohvati odredjeni: GET
app.get("/venues/:id", async (req, res) => {
   const {
      id
   } = req.params;
   try {
      const venue = await pool.query("SELECT * FROM venues WHERE id = $1", [id])
      var VenueResponse;
      const rowCount = venue.rowCount;
      //ako ne postoji venue s tim id-jem -> 404 Not Found
      if (rowCount == 0) {
         res.status(404);
         VenueResponse = {
            "status": "Not Found",
            "message": "Venue with the provided ID doesn't exist",
            "response": null
         }
      }
      //ako postoji, vrati dohvaceni objekt
      else {
         VenueResponse = {
            "status": "OK",
            "message": "Fetched venue object",
            "response": {
               "venue": venue.rows[0],
               "links": [{
                     "href": id + "/",
                     "rel": "/",
                     "type": "PUT"
                  },
                  {
                     "href": id + "/",
                     "rel": "/",
                     "type": "DELETE"
                  }
               ]
            }
         }
         res.status(200);
      }
      res.setHeader("Content-Type", "application/json");
      res.json(VenueResponse);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//stvori novi: POST
app.post("/venues", async (req, res) => {
   try {
      const name = req.body.name;
      const city = req.body.city;
      const capacity = req.body.capacity;

      if (name == undefined || city == undefined || capacity == undefined) {
         res.sendStatus(400);
      } else {
         const newVenue = await pool.query("INSERT INTO venues (id, name, city, capacity) VALUES (DEFAULT, $1, $2, $3) RETURNING *", [name, city, capacity]);
         VenueResponse = {
            "status": "Created",
            "message": "Venue object was created",
            "response": {
               "venue": newVenue.rows[0],
               "links": [{
                     "href": "venues/",
                     "rel": "/",
                     "type": "GET"
                  },
                  {
                     "href": "venues/1",
                     "rel": "1",
                     "type": "GET"
                  },
                  {
                     "href": "venues/2",
                     "rel": "2",
                     "type": "GET"
                  },
                  {
                     "href": "venues/1",
                     "rel": "1",
                     "type": "PUT"
                  },
                  {
                     "href": "venues/2",
                     "rel": "2",
                     "type": "PUT"
                  },
                  {
                     "href": "venues/1",
                     "rel": "1",
                     "type": "DELETE"
                  }
               ]
            }
         }
      }
      res.status(201);
      res.setHeader("Content-Type", "application/json");
      res.json(VenueResponse);
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//update-aj odredjeni: PUT
app.put("/venues/:id", async (req, res) => {
   try {
      const {
         id
      } = req.params; //za WHERE dio
      //za SET dio
      const name = req.body.name;
      const capacity = req.body.capacity;
      const city = req.body.city;
      //ako nije zadano ni jedno polje za update-anje
      if (name == undefined && capacity == undefined && city == undefined) {
         res.sendStatus(400);
      }
      //ako je bar jedno polje zadano
      else {
         var venue = await pool.query("SELECT * FROM venues WHERE id = $1", [id]);
         const rowCount = venue.rowCount;
         var VenueResponse;
         //ako ne postoji venue s tim id-jem -> 404 Not Found
         if (rowCount == 0) {
            res.status(404);
            VenueResponse = {
               "status": "Not Found",
               "message": "Venue with the provided ID doesn't exist",
               "response": null
            }
            res.status(404);
         }
         //ako postoji, update-aj zadana polja
         else {
            var updateVenue;
            var message = "Venue: ";
            if (name != undefined) {
               updateVenue = await pool.query("UPDATE venues SET name = $1 WHERE id = $2", [name, id]);
               message = message + "name "
            }
            if (city != undefined) {
               updateVenue = await pool.query("UPDATE venues SET city = $1 WHERE id = $2", [city, id]);
               message = message + "city "
            }
            if (capacity != undefined) {
               updateVenue = await pool.query("UPDATE venues SET capacity = $1 WHERE id = $2", [capacity, id]);
               message = message + "capacity "
            }
            message = message + "was updated";
            venue = await pool.query("SELECT * FROM venues WHERE id = $1", [id])
            VenueResponse = {
               "status": "OK",
               "message": message,
               "response": {
                  "id": venue.rows[0].id,
                  "name": venue.rows[0].name,
                  "city": venue.rows[0].city,
                  "capacity": venue.rows[0].capacity,
                  "links": [{
                        "href": id + "/",
                        "rel": "/",
                        "type": "GET"
                     },
                     {
                        "href": id + "/",
                        "rel": "/",
                        "type": "DELETE"
                     }
                  ]
               }
            }
            res.status(200);
         }
         res.setHeader("Content-Type", "application/json");
         res.json(VenueResponse);
      }
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//obrisi odredjeni: DELETE
app.delete("/venues/:id", async (req, res) => {
   try {
      const {
         id
      } = req.params; //za WHERE dio
      var venue = await pool.query("SELECT * FROM venues WHERE id = $1", [id]);
      const rowCount = venue.rowCount;
      var VenueResponse;
      //ako ne postoji venue s tim id-jem -> 404 Not Found
      if (rowCount == 0) {
         res.status(404);
         VenueResponse = {
            "status": "Not Found",
            "message": "Venue with the provided ID doesn't exist",
            "response": null
         }
         res.setHeader("Content-Type", "application/json");
         res.json(VenueResponse);
      }
      //ako postoji, obriši taj venue objekt
      else {
         const deleteVenue = await pool.query("DELETE FROM venues WHERE id = $1", [id]);
         //response code: "204 No Content" (za DELETE - prošlo uspješno, ali nema što za vratiti)
         res.sendStatus(204);
      }
   } catch (err) {
      //ako ne postoji venue s tim id-jem -> 404 Not Found
      res.sendStatus(500);
      console.error(err.message);
   }
})


//hvataju sve metode za zadani path koje nisu definirane gore

app.use('/venues/:id', function (req, res, next) {
   try {
      console.log('Request Type:', req.method)
      var Response;
      Response = {
         "status": "Not Implemented",
         "message": "Method not implemented for requested resource",
         "response": null
      }
      res.setHeader("Content-Type", "application/json");
      res.status(501);
      res.json(Response);
      res.end();
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.use('/venues', function (req, res, next) {
   try {
      console.log('Request Type:', req.method)
      var Response;
      Response = {
         "status": "Not Implemented",
         "message": "Method not implemented for requested resource",
         "response": null
      }
      res.setHeader("Content-Type", "application/json");
      res.status(501);
      res.json(Response);
      res.end();
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.use('/worldcups', function (req, res, next) {
   try {
      console.log('Request Type:', req.method)
      var Response;
      Response = {
         "status": "Not Implemented",
         "message": "Method not implemented for requested resource",
         "response": null
      }
      res.setHeader("Content-Type", "application/json");
      res.status(501);
      res.json(Response);
      res.end();
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.use('/worldcups/:year', function (req, res, next) {
   try {
      console.log('Request Type:', req.method)
      var Response;
      Response = {
         "status": "Not Implemented",
         "message": "Method not implemented for requested resource",
         "response": null
      }
      res.setHeader("Content-Type", "application/json");
      res.status(501);
      res.json(Response);
      res.end();
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

app.use('/worldcups/:year/venues', function (req, res, next) {
   try {
      console.log('Request Type:', req.method)
      var Response;
      Response = {
         "status": "Not Implemented",
         "message": "Method not implemented for requested resource",
         "response": null
      }
      res.setHeader("Content-Type", "application/json");
      res.status(501);
      res.json(Response);
      res.end();
   } catch (err) {
      res.sendStatus(500);
      console.error(err.message);
   }
})

//za sve nedefinirane path-ove -> 404 Not Found

app.use(function (req, res, next) {
   res.status(404);
   Response = {
      "status": "Not Found",
      "message": "The specified path doesn't exist",
      "response": null
   }
   res.json(Response);
})

// http://localhost:3000/

app.listen(3000, () => {
   console.log("Listening on port 3000");
});