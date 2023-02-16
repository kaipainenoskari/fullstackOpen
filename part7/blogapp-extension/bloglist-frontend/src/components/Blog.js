import { useState } from "react";
import { Button } from 'react-bootstrap'

const Blog = ({ blog, handleLikes, handleDeletion, id }) => {
  const [extended, setExtended] = useState(false);

  const originalView = (blog, extended, setExtended) => {
    return (
      <td className="originalView">
        {blog.title} {blog.author}
        <Button variant="info" onClick={() => setExtended(!extended)}>view</Button>
      </td>
    );
  };

  const extendedView = (blog, id, extended, setExtended) => {
    return (
      <td id="blog" className="extendedView">
        {blog.title} {blog.author}
        <Button variant="secondary" onClick={() => setExtended(!extended)}>hide</Button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <Button variant="success" id="like" onClick={() => handleLikes(blog, blog.likes)}>
            like
          </Button>
        </p>
        <p>{blog.user.name}</p>
        {id === blog.user.id ? (
          <Button onClick={() => handleDeletion(blog)}>remove</Button>
        ) : null}
      </td>
    );
  };

  return (
    <tr className="blog">
      {!extended
        ? originalView(blog, extended, setExtended)
        : extendedView(blog, id, extended, setExtended)}
    </tr>
  );
};

export default Blog;
