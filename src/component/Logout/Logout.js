import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("authenticated");
        navigate("/");
    }

    return (
        <div className="text-end me-3">
            <button className="btn btn-primary" onClick={logOut}>Logout</button>
        </div>
    )
}
