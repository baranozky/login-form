
import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must contain at least 8 characters, an uppercase letter, a lowercase letter and a number',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const history = useHistory();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const passwordValid =
    form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password) &&
    /[0-9]/.test(form.password);

  const isValid = emailValid && passwordValid && form.terms;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'email' || name === 'password') {
      setTouched({
        ...touched,
        [name]: true,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    history.push('/success');
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <h1>Login</h1>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          data-cy="form-email"
          value={form.email}
          onChange={handleChange}
          invalid={touched.email && !emailValid}
        />
        {touched.email && !emailValid && (
          <FormFeedback data-cy="error-message">
            {errorMessages.email}
          </FormFeedback>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          data-cy="form-password"
          value={form.password}
          onChange={handleChange}
          invalid={touched.password && !passwordValid}
        />
        {touched.password && !passwordValid && (
          <FormFeedback data-cy="error-message">
            {errorMessages.password}
          </FormFeedback>
        )}
      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          data-cy="form-terms"
          checked={form.terms}
          onChange={handleChange}
        />
        <Label for="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button
          color="primary"
          type="submit"
          data-cy="form-submit"
          disabled={!isValid}
        >
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
