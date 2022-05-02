import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const SigninScreen = () => {
  // it's a hook from react router dom that will be called when the component is rendered
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'
  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h2 className='my-3'>Sign In</h2>
      <Form>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' required />
        </Form.Group>
        <div className='mb-3'>
          <Button variant='primary' type='submit'>
            Sign In
          </Button>
        </div>
        <div className='mb-3'>
          New customer? <Link to={`/signup?redirect=${redirect}`}>Sign Up</Link>
        </div>
      </Form>
    </Container>
  )
}

export default SigninScreen
