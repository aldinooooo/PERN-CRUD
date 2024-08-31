const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db.js')

//middleware
app.use(cors())
app.use(express.json())


//routes//

//get all todos
 app.get ('/', async (req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
        
    }
 })

//get a todo
app.get ('/todo/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//create to do
app.post ('/createTodo',async (req,res)=>{
    try{
        const {descriptions} = req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING*",
            [descriptions]
        )
        res.json(newTodo.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
    })

    
//update a todo
app.put ('/updateTodo/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const {descriptions}= req.body
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id =$2",[descriptions,id])
        res.json('Todo was updated!')
    } catch (err) {
        console.error(err.message)
    }
})

//delete a todo
app.delete('/deleteTodo/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])
        res.json("Deleted was succesfull")
    } catch (err) {
        console.error(err.message)
    }
})


app.listen (5000,()=>{
    console.log('the server has running')
})