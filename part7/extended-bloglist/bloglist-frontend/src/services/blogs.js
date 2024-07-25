import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  return await axios.post(baseUrl, newObject, config).then((res) => res.data);
};

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

const updateBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  return axios
    .put(`${baseUrl}/${blog.id}`, blog, config)
    .then((res) => res.data);
};

const remove = (objectToRemove) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${objectToRemove.id}`, config);
  return request.then(
    (response) =>
      `The blog ${objectToRemove.title} by ${objectToRemove.author} has been removed`
  );
};

const removeBlog = (objectToRemove) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${objectToRemove.id}`, config);
};

const getBlog = ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const request = axios.get(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => error.response);
};

export default {
  getAll,
  create,
  createBlog,
  update,
  updateBlog,
  remove,
  removeBlog,
  setToken,
  getBlog,
};
