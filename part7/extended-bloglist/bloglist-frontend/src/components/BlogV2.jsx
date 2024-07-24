import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';

const BlogV2 = () => {

  const toggleVisibility = () => { }
  
  const blog = { "title": "prueba" }
  
  const id = useParams().id

  const result = useQuery({
        queryKey: ['blogs', {id}],
        queryFn: blogService.getBlog,
        refetchOnWindowFocus: false
  });
  
  if (result.isLoading) {
    return <div>loading data...</div>
  } else {
    if (result.data.status === 400) {
      return <Navigate replace to="/error-404" />
    } else {
      const blog = result.data 
      return (
        <>
          <h2>{blog.title}</h2>
          <div>
            <div>{blog.url}</div>
            <div>{blog.likes} likes</div>
            <div>{blog.likes} likes</div>
          </div>
          <div className="blog-container">
            <div className="blog-container-toggle">
              <span className="blog-title"></span>&nbsp;
              <button onClick={toggleVisibility}>View</button>
            </div>
            <div className="blog-container-toggle" >
              <span className="blog-title">{blog.title}</span>&nbsp;
              <button onClick={toggleVisibility}>Hide</button>
            </div>
          </div>
        </>
      );
    }
 /*   {
  "title": "The Art of Data Visualization: A Comprehensive Guide",
  "author": "Emily Johnson",
  "url": "https://www.example.com/data-visualization-guide",
  "likes": 1187,
  "id": "65fefba09f55557eb8eefc97"
}*/
  
    

  }

};

export default BlogV2;
