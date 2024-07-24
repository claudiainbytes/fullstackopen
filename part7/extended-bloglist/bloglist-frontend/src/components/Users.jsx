import React from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import usersService from '../services/users';

const Users = ({}) => {

    const result = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getAll,
        refetchOnWindowFocus: false
    })

    if ( result.isLoading ) {
        return <div>loading data...</div>
    } else {

        const users = result.data
        const assortedusers = users.sort((A, B) => B.blogs.length - A.blogs.length)

        return (
            <div>
                <h2>Users</h2>
                <div className="table">
                    <div className="row">
                        <div className="cell"></div>
                        <div className="cell"><strong>blogs created</strong></div>
                    </div>
                    { assortedusers.map((user) => 
                    <div className="row" key={user.id}>
                        <div className="cell"><Link to={`/users/${user.id}`}>{user.name}</Link></div>
                        <div className="cell">{user.blogs.length}</div>
                    </div>
                    )}
                </div>
            </div>
        );
    }

  };
  
  export default Users;
  