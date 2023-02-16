const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "test",
    author: "me",
    url: "google.com",
    likes: 10,
    id: "63909ec8c431dd7cff80d8da",
  },
  {
    title: "book",
    author: "someone",
    url: "somewhere.com",
    likes: 5,
    id: "63921924b839ecaf54a07cdf",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "me",
    url: "web",
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
