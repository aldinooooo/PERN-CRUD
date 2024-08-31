import {BrowserRouter,Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './components/Users.jsx'
import CreateTodo from './components/CreateTodo.jsx'
import UpdateTodo from './components/UpdateTodo.jsx'

function App() {

  return (
    <>
     <div>
      <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Users/>}></Route>
        <Route path ='/create' element={<CreateTodo/>}></Route>
        <Route path ='/update/:todo_id' element={<UpdateTodo/>}></Route>
      </Routes>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
