import './SignupForm.css'
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import * as sessionActions from "../../store/session"

function SignupFormPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [image, setImage] = useState(null)

    if (sessionUser.id) return <Redirect to="/" />

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            setErrors([])
            return dispatch(sessionActions.signup({ lastName, firstName, email, username, password, image }))
                .catch(async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                })
        }
        return setErrors(['Confirm Password field must be the same as the Password field'])
    }

    const updateFile = (e) => {
        const file = e.target.files[0]
        if (file) setImage(file)
    }

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h2 className="signup-title">Create an Account</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <ul className="errors-list">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <label>Profile Image (optional)</label>
                    <input type="file" onChange={updateFile} />

                    <div className="signup-button-container">
                        <button type="submit" className="signup-button">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupFormPage

