const express=require("express");
const app= express();
const cors = require("cors");
const pool = require("./db");

//middlewatre
app.use(cors());
app.use(express.json()); //req.body



//ROUTES//


//Create new player
app.post("/players", async (req,res) => {
    try{

        const { email } = req.body;
        const { status } = req.body;
        const newPlayer = await pool.query("INSERT INTO players (email, status) VALUES($1, $2) RETURNING *", 
        [email, status]
        );

        res.json(newPlayer.rows[0]);
        console.log(req.body);
    } catch(err){
        console.error(err.message, "HELP!!!");
    }
})

//Get all players
app.get("/players", async(req,res) =>{
    try{
        const allPlayers = await pool.query("SELECt * FROM players");
        res.json(allPlayers.rows);
    } catch(err){
        console.log(err.message);
    }
})

//get single player
app.get("/players/:email", async (req,res) =>{
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
app.delete("/players/:id", async(req,res) => {
    try{
        const {id}= req.params;
        const deletePlayer = await pool.query("DELETE FROM players WHERE player_id = $1", [id]);

        res.json("Player was deleted");
    } catch (err){
        console.log(err.message);
    }

})

//updated player status via query by email
app.put("/players/:email", async(req,res) => {
    try{
        const {email} = req.params;
        const {status} = req.body;
        const updatePLayer = await pool.query(
            "UPDATE players SET status = $1 WHERE email = $2",
            [status, email]
        );
        res.json("Todo was updated");
    } catch (err){
        console.log(err.message);
    }
})





app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});