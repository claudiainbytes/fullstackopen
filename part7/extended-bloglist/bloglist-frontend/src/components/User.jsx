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
        <div>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
};

export default User;
