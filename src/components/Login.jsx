
import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push('/success');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          data-cy="form-email"
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          data-cy="form-password"
        />
      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
          data-cy="form-terms"
        />
        <Label for="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>

      <Button
        type="submit"
        color="primary"
        data-cy="form-submit"
      >
        Sign In
      </Button>
    </Form>
  );
}
