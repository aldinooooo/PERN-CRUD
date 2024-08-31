import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTodo() {
  const { todo_id } = useParams(); // Assuming parameter name is "todo_id"
  const [descriptions, setDescriptions] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/todo/${todo_id}`) // Template literal for cleaner URL format
      .then((result) => {
        setDescriptions(result.data.descriptions);
        console.log(result);
      })
      .catch((err) => console.error(err));
  }, [todo_id]);  // Dependency array to fetch data only on todo_id change

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/updateTodo/${todo_id}`, { descriptions }) // Template literal
      .then((result) => {
        console.log(result);
        alert('Todo updated successfully!');
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Edit Todo</h2>
          <div className="mb-2">
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder="Enter Description"
              className="form-control"
              onChange={(e) => setDescriptions(e.target.value)}
              value={descriptions} // Set initial value for description
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTodo;