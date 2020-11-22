import React, { useEffect } from "react";
import axios from "axios";

const LandingPage = (props) => {
    useEffect(() => {
        axios.get("/api/hello").then((res) => console.log(res));
    }, []);

    const clickHandler = () => {
        axios.get("/api/logout").then((res) => {
            if (res.data.success) {
                props.history.push("/login");
            }
        });
    };

    return (
        <div>
            환영합니다.
            <button onClick={clickHandler}>Logout</button>
        </div>
    );
};

export default LandingPage;
