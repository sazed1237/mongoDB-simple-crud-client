import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    
    const loadedUsers = useLoaderData()
    // remove UI when delete a user
    const [users, setUsers] = useState(loadedUsers)

    const handleDelete = _id =>{
        console.log('delete', _id)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                alert('User Delete Successfully')
                const remaining = users.filter(user => user._id !== _id);
                setUsers(remaining)
            }
        })
    }

    return (
        <div>
            <h2>MongoDB User</h2>
            <p>Total user: {users.length} </p>

            {
                users.map(user => <p 
                    key={user._id}
                    >
                        Name: {user.name} - Email: {user.email} - ID: {user._id}
                        <Link to={`/update/${user._id}`}><button>Update</button></Link>
                         <button onClick={() => handleDelete(user._id)}>
                            X
                            </button>
                    </p>)
            }
            <Link to={'/'}>Go Back</Link>
        </div>
    );
};

export default Users;