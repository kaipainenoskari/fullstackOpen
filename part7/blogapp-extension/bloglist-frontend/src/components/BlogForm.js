import PropTypes from "prop-types";
import { useState } from "react";
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>Create new blog</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
            <Form.Label>title:</Form.Label>
            <Form.Control id="title" value={title} onChange={handleTitleChange} />
            <Form.Label>author:</Form.Label>
            <Form.Control id="author" value={author} onChange={handleAuthorChange} />
            <Form.Label>url:</Form.Label>
            <Form.Control id="url" value={url} onChange={handleUrlChange} />
          <Button variant="success" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
