import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../context/Modal";
import * as sessionActions from '../../store/session';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [credential, setCredential] = useState('');

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const data = await dispatch(login(email, password));
    // if (data) {
    //   setErrors(data);
    // } else {
    //     closeModal()
    // }
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
  };

  const handeClick = () => {
    setEmail('Illenium')
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
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
