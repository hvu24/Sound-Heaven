import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../context/Modal";
import * as sessionActions from '../../store/session';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [credential, setCredential] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    const fakeUser = {
        credential: credential,
        password: password
    }
    return dispatch(sessionActions.login(fakeUser))
      .then((data) => {
        if (!data.errors) closeModal()
      })
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })
  };

  const handeClick = () => {
    setCredential('Illenium')
    setPassword('password2')
  }

  return (
    <div className="modal-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email or Username
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <label>Try it out! Click Demo Login to populate fields.<button onClick={handeClick}>Demo Login</button></label>

    </div>
  )
}

export default LoginFormModal;
