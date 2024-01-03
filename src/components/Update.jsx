import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {

    const loadedUser = useLoaderData()

    const handleUpdate = event =>{
        event.preventDefault()

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = {name, email}
        console.log(updatedUser);

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                alert('User Updated Successfully')
            }
        })
    }

    return (
        <div>
            <h2>Update Information of : <span style={{color: "purple"}}>{loadedUser.name}</span> </h2>

            <form onSubmit={handleUpdate} style={{marginBottom: "20px"}}>  
                <input type="text" name="name" defaultValue={loadedUser.name} id="" />
                <br />
                <input type="email" name="email" defaultValue={loadedUser.email} id="" />
                <br />
                <input type="submit" value="Update" />
            </form>
            <Link to={'/users'}><button>Go Back</button></Link>
        </div>
    );
};

export default Update;