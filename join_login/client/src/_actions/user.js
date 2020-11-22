import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const JOIN_USER = "JOIN_USER";
export const AUTH_USER = "AUTH_USER";

export const loginUser = (toUserData) => {
    const request = axios
        .post("/api/login", toUserData)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    return {
        type: LOGIN_USER,
        payload: request,
    };
};

export const joinUser = (toJoinData) => {
    const request = axios
        .post("/api/register", toJoinData)
        .then((res) => res.data)
        .catch((err) => console.log(err));

    return {
        type: JOIN_USER,
        payload: request,
    };
};

export const auth = (toAuthData) => {
    const request = axios.get("/api/auth", toAuthData).then((res) => res.data);
    return {
        type: AUTH_USER,
        payload: request,
    };
};
