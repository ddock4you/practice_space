import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user";

export default function authFunc(specificComponent, option, adminRoute = null) {
    // option
    // null => 아무나 출입 가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then((res) => {
                console.log(res, option);
            });
        }, [dispatch]);

        return <specificComponent />;
    }
    return AuthenticationCheck;
}
