import axios from 'axios';
const baseUrl = '/api/users';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getUser = ({queryKey}) => {
  const [_key, { id }] = queryKey;
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data ).catch(error => error.response);
};

export default { getAll, setToken, getUser };
