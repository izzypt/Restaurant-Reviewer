require("dotenv").config()
const db = require('./db/index')
const morgan = require('morgan')
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors')

//Initialize
const app = express();

/***************/
/* Middleware */
/**************/
app.use(morgan("dev"))
app.use(cors())
app.use((req, res, next) => {
    console.log("YAY, our middlleware ran!!!");
    next();
})
app.use(express.json())

/***********/
/* Routes */
/*********/
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        let restaurants = await db.query("SELECT * FROM restaurants;")
        res.status(200).json({
            "status" : "sucess",
            data : {
                restaurants: restaurants.rows
            }
        })
    } catch (err) {
        console.log("ERROR : " + err)
    }
})

app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        let restaurants = await db.query(`SELECT * FROM restaurants WHERE id = $1;`, [req.params.id])
        res.status(200).json({
            "status" : "sucess",
            data : {
                restaurant: restaurants.rows
            }
        })
    } catch (err) {
        console.log("ERROR : " + err)
    }
})

app.post('/api/v1/restaurants', async (req, res) => {
    try {
        let restaurants = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *;", [req.body.name, req.body.location, req.body.price_range])
        res.status(200).json({
            "status" : "sucess",
            data : {
                restaurant: restaurants.rows
            }
        })
    } catch (err) {
        console.log("ERROR : " + err)
    }
})

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        let restaurants = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *;", [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            "status" : "sucess",
            data : {
                restaurant: restaurants.rows
            }
        })
    } catch (err) {
        console.log("ERROR : " + err)
    }
})

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        let restaurants = await db.query("DELETE FROM restaurants WHERE id = $1 returning *;", [req.params.id])
        res.status(200).json({  
            "status" : "sucess",
            data : {
                restaurant: restaurants.rows
            }
        })
    } catch (err) {
        console.log("ERROR : " + err)
    }
})

/***********/
/* Listen */
/*********/
app.listen(5000, () => {
    console.log(`Listening on port 5000...`)
})
