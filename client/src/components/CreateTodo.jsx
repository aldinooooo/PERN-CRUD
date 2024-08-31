import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function CreateTodo (){
    const [id,setId] = useState()
    const [descriptions,setDescriptions] = useState()
    const Navigate = useNavigate()

    const Submit =(e) =>{
        e.preventDefault()
        axios.post("http://localhost:5000/CreateTodo",{id,descriptions})
        .then (result=>{
            console.log(result)
            alert('Todo created succesfully')
            Navigate('/')
        })
        .catch(err=>console.error(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Submit}>
              <h2>Add to-do </h2>
                
                  <div className="mb-2">
                      <label htmlFor="">Description</label>
                      <input type='text' placeholder="Enter Description" className="form-control" onChange={(e)=>setDescriptions(e.target.value)} />
                  </div>
                  <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    )
}

export default CreateTodo