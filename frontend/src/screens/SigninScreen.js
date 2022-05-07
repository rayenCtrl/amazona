import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../utils'

const SigninScreen = () => {
  const navigate = useNavigate()
  // it's a hook from react router dom that will be called when the component is rendered
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state

  const submitHandler = async (e) => {
    e.preventDefault() // prevent refreshing the page when submitting the form
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data)) // save the user info in the local storage
      navigate(redirect || '/') // redirect to the home page or the page that we want to redirect to
    } catch (err) {
      toast.error(getError(err)) // show the error message COMING FROM THE BACKEND
    }
  }

  useEffect(() => {
    // when the component is rendered we check if the user is already logged in and if so we redirect to the home page
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h2 className='my-3'>Sign In</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
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
