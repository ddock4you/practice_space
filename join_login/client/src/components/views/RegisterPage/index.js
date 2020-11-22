import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinUser } from "../../../_actions/user";

const RegisterPage = (props) => {
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfirm, setPasswordConfirm] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (Password !== PasswordConfirm) alert("패스워드가 같지 않습니다.");

        const joinData = {
            email: Email,
            name: Name,
            password: Password,
        };

        dispatch(joinUser(joinData)).then((res) => {
            if (res.payload.joinSuccess) {
                props.history.push("/login");
            }
        });
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const nameHandler = (e) => {
        setName(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const passwordConfirmHandler = (e) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <div className="join-area">
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={emailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={nameHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={passwordHandler}
                />
                <label>PasswordConfirm</label>
                <input
                    type="password"
                    value={PasswordConfirm}
                    onChange={passwordConfirmHandler}
                />
                <br />
                <button type="submit">Join</button>
            </form>
        </div>
    );
};

export default withRouter(RegisterPage);
