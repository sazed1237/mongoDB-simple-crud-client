import { Link } from 'react-router-dom';
import './App.css'

function App() {

  const handleAddUser = event =>{
    event.preventDefault()

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.insertedId){
        alert('user added successfully');
        form.reset();
      }
    })
  }

  return (
    <>
      <h1>Simple CRUD</h1>

      <form style={{marginBottom: "20px"}} onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='Name' />
        <br />
        <input type="email" name="email" id="" placeholder='Email' />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <Link to={'/users'}>View Users</Link>
    </>
  )
}

export default App
