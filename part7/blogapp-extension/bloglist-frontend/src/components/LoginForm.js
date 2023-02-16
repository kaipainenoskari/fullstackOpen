import { Form, Button } from "react-bootstrap";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <Form onSubmit={handleLogin}>
    <Form.Group>
      <Form.Label>username</Form.Label>
      <Form.Control
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>password</Form.Label>
      <Form.Control
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </Form.Group>
    <Button id="login-button" type="submit">
      login
    </Button>
  </Form>
);

export default LoginForm;
