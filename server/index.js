require('dotenv').config()
//console.log(process.env)
const express=require("express");
const app= express();
const cors = require("cors");
const pool = require("./db");

//middlewatre
app.use(cors());
app.use(express.json()); //req.body



//ROUTES//


//Create new player
app.post("/api/players", async (req,res) => {
    try{
        const { email } = req.body;
        const { status } = req.body;
        const  guests  = "0"; 
        const  paid  = "N";
        const  position  = "player";
        
        const newPlayer = await pool.query("INSERT INTO players (email, status, guests, paid, position) VALUES($1, $2, $3, $4, $5) RETURNING *", 
        [email, status, guests, paid, position]
        );

        res.json(newPlayer.rows[0]);
        console.log(req.body);
    } catch(err){
        console.error(err.message, "HELP!!!");
    }
})

//Get all players
app.get("/api/players", async(req,res) =>{
    try{
        const allPlayers = await pool.query("SELECT * FROM players ORDER BY CASE WHEN status = 'Attending' THEN 1 WHEN status = 'Tentative' THEN 2 WHEN status = 'Pending Response' THEN 3 ELSE 4 END;");
        res.json(allPlayers.rows);
    } catch(err){
        console.log(err.message);
    }
})

app.get("/api/test",(reg,res)=>{
    res.status(200).send({
        tshirt:'SHIRT XL',
        size: 'large'

    })
})

//get single player
app.get("/api/players/:email", async (req,res) =>{
    try{
        const {email} = req.params;
        const player = await pool.query("SELECT * FROM players WHERE email = $1", [email]);
        res.json(player.rows[0]);
        console.log(req.params);
    }catch(err){
        console.log(err.message);
    }
})


//delete player
app.delete("/api/players/:id", async(req,res) => {
    try{
        const {id}= req.params;
        const deletePlayer = await pool.query("DELETE FROM players WHERE player_id = $1", [id]);

        res.json("Player was deleted");
    } catch (err){
        console.log(err.message);
    }

})


//updated player status via query by email
app.put("/api/players/:email", async(req,res) => {
    try{
        const {email} = req.params;
        const {status} = req.body;
        const updatePLayer = await pool.query(
            "UPDATE players SET status = $1 WHERE email = $2",
            [status, email]
        );
        res.json("Players was updated");
    } catch (err){
        console.log(err.message);
    }
})

//updated player's # of guests via query by email
app.put("/api/players/guests/:email", async(req,res) => {
    try{
        const {email} = req.params;
        const {guests} = req.body;
        const updatePLayer = await pool.query(
            "UPDATE players SET guests = $1 WHERE email = $2",
            [guests, email]
        );
        res.json("Players was updated");
    } catch (err){
        console.log(err.message);
    }
})

//updated if player has paid yet via query by email
app.put("/api/players/payment/:email", async(req,res) => {
    try{
        const {email} = req.params;
        const {paid} = req.body;
        const updatePLayer = await pool.query(
            "UPDATE players SET paid = $1 WHERE email = $2",
            [paid, email]
        );
        res.json("Players was updated");
    } catch (err){
        console.log(err.message);
    }
})

//updated if player's position via query by email
app.put("/api/players/position/:email", async(req,res) => {
    try{
        const {email} = req.params;
        const {position} = req.body;
        const updatePLayer = await pool.query(
            "UPDATE players SET position = $1 WHERE email = $2",
            [position, email]
        );
        res.json("Players was updated");
    } catch (err){
        console.log(err.message);
    }
})

//updated ALL player status to Pending Response, Guests = 0 
app.put("/api/clear", async(req,res) => {
    console.log("clear call")
    try{
        
        const status = "Pending Response";
        const guests = "0";
        const updatePLayer = await pool.query(
            "UPDATE players SET status = $1, guests = $2;",
            [status, guests]
        );
        res.json("Players was updated");
    } catch (err){
        console.log(err.message);
    }
})

//////////////////////////////HISTORY ROUTES//////////////////////////////


//Create new game
app.post("/api/history", async (req,res) => {
    try{
        const { date } = req.body;
        const { white } = req.body;
        const { black } = req.body;
        const newPlayer = await pool.query("INSERT INTO history (date, white, black) VALUES($1, $2, $3) RETURNING *", 
        [date, white, black]
        );

        res.json(newPlayer.rows[0]);
        console.log(req.body);
    } catch(err){
        console.error(err.message, "HELP!!!");
    }
})

//Get all game history
app.get("/api/history", async(req,res) =>{
    try{
        const allHistory = await pool.query("SELECT * FROM history ORDER BY date ASC");
        res.json(allHistory.rows);
    } catch(err){
        console.log(err.message);
    }
})

//delete all games
app.delete("/api/history", async(req,res) => {
    try{
        const deletePlayer = await pool.query("DELETE FROM history");
        res.json("Player was deleted");
    } catch (err){
        console.log(err.message);
    }

})

//updated game score via query by date
app.put("/api/history/:game_id", async(req,res) => {
    try{
        const {game_id} = req.params;
        const {white} = req.body;
        const {black} = req.body;
        
        console.log("HELLLLO", white, black, game_id);
        const updatePLayer = await pool.query(
            "UPDATE history SET white = $1, black = $2 WHERE game_id = $3;",
            [white, black, game_id]
        );
        res.json("history was updated");
    } catch (err){
        console.log(err.message);
    }
})

const PORT = process.env.PORT || 8080
//const PORT = 8080;

app.listen(PORT, 
    ()=> {console.log(`server has started on port ${PORT}`);}
);