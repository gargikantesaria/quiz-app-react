import React, { useEffect, useState } from "react";
import Login from '../Login';
import './QuizType.css';
import { useNavigate } from "react-router-dom";
import Logout from '../Logout/Logout';

function QuizType() {

    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(null);

    useEffect(() => {
        localStorage.getItem("authenticated") ? setauthenticated(true) : setauthenticated(false);
    }, []);

    function create() {
        navigate("/create-quiz");
    }

    function attempt() {
        navigate("/attempt-quiz");
    }

    if (authenticated) {
        return (
            <>
                <div className="mt-3">
                    <Logout></Logout>
                    <div className="quiz-type create-quiz" onClick={create}>Create Quiz</div>
                    <div className="quiz-type attempt-quiz" onClick={attempt}>Attempt Quiz</div>
                </div>
            </>
        )
    } else {
        return (
            <Login></Login>
        )
    }
}

export default QuizType;