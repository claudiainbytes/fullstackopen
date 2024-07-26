import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import usersService from '../services/users';

const Users = ({}) => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else {
    const users = result.data;
    const assortedusers = users.sort((A, B) => B.blogs.length - A.blogs.length);

    return (
      <>
        <h2 className="pb-2 text-secondary-emphasis">Users</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {assortedusers.map((user) => (
              <tr className="table-default" key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  <div className="cell">{user.blogs.length}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default Users;
