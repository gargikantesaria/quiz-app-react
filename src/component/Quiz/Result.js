import React from 'react'
import Logout from '../Logout/Logout';
import backIcon from "../../assets/images/back_to_dashboard.svg";
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';

export default function Result(props) {

    const navigate = useNavigate();

    function goBack() {
        navigate('/quiz-type');
    }

    return (
        <div>
            <div className='container mt-3'>
                <div className='d-flex w-100 justify-content-between'>
                    <button onClick={goBack} className='pe-auto btn'><img src={backIcon} alt="" className="ms-2"></img></button>
                    <Logout></Logout>
                </div>
                <div>
                    <div className='text-center fs-2 w-100'>Result</div>
                    <div style={{ width: 100, height: 100, margin: '48px auto 0', textAlign: 'center' }}>
                        <CircularProgressbar value={(props.correctAns * 100) / props.questionBank.length} gravity="center" />
                        {(props.correctAns * 100) / props.questionBank.length > 49 ? `${(props.correctAns * 100) / props.questionBank.length}% Pass` : `${(props.correctAns * 100) / props.questionBank.length}% Fail`}
                    </div>
                    <div className='text-center mt-5'>
                        <p><span className='fs-5'>Score: </span><span>{(props.correctAns * 100) / props.questionBank.length}/100</span></p>
                        <p><span className='fs-5'>Correct Answers: </span><span>{props.correctAns}</span></p>
                        <p><span className='fs-5'>Incorrect Answers: </span><span>{props.questionBank.length - props.correctAns}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
