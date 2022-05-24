import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogin } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
import './login.css'

export const LoginScreen = () => {
  const dispatch = useDispatch()

  const [formLoginValues, handleLoginInputChange] = useForm({
    lemail: 'felipe1@gmail.com',
    lpassword: '123456',
  })

  const { lemail, lpassword } = formLoginValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lemail, lpassword))
    //TODO: Add the code to dispatch the action to the database
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="lemail"
                value={lemail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="lpassword"
                value={lpassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
