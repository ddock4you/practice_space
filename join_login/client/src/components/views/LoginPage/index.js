import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user";

const LoginPage = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email: Email,
            password: Password,
        };

        dispatch(loginUser(userData)).then((res) => {
            if (res.payload.loginSuccess) {
                props.history.push("/");
            }
        });
    };

    return (
        <div className="login-area">
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={emailHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={passwordHandler}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;
