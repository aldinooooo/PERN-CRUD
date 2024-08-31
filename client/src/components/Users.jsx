import { Link } from "react-router-dom"
import {useEffect, useState} from "react"
import axios from 'axios'


function Users () {
    const [descriptions, setDescriptions] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000")
        .then(result=>setDescriptions(result.data))
        .catch(err=>console.error(err))
    },[])
    const handleDelete = (todo_id)=>{
        axios.delete(`http://localhost:5000/deleteTodo/+${todo_id}`)
        .then(res=>{
            window.location.reload()
            console.log(res)
        }).catch(err=>console.error(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to ='/create' className="btn btn-success">Add</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            descriptions.map((description)=>{
                                return <tr key={description.todo_id}>
                                    
                                    <td>{description.description}</td>
                                    <td>
                                        <Link to ={`/update/${description.todo_id}`} className="btn btn-success">Edit</Link>
                                        <button className="btn btn-danger" onClick={()=>handleDelete(description.todo_id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users