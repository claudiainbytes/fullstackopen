import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import usersService from '../services/users';

const User = () => {
  const id = useParams().id;

  const result = useQuery({
    queryKey: ['users', { id }],
    queryFn: usersService.getUser,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else {
    if (result.data.status === 400) {
      return <Navigate replace to="/error-404" />;
    } else {
      const user = result.data;
      return (
        <>
          <h2 className="pb-2 text-secondary-emphasis">{user.name}</h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>added blogs</th>
              </tr>
            </thead>
            <tbody>
              {user.blogs.map((blog) => (
                <tr className="table-default" key={blog.id}>
                  <td>{blog.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  }
};

export default User;
