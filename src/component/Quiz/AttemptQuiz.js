import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai';
import { createQuizAtom } from './CreateQuiz';
import 'react-circular-progressbar/dist/styles.css';
import backIcon from "../../assets/images/back_to_dashboard.svg";
import Login from '../Login';
import Logout from '../Logout/Logout';
import './AttemptQuiz.css';
import Result from './Result';

export default function AttemptQuiz() {
    const [authenticated, setauthenticated] = useState(null);
    const [questionBank, setQuestionBank] = useAtom(createQuizAtom);
    const [currentQue, setCurrentQue] = useState(0);
    const [statusMsg, setStatusMsg] = useState('');
    let correctStatus = ['Correct!', 'Correct! Wow', 'Correct! Bravo', 'Correct! Nicely done', 'Correct! Well done', 'Correct! Nice', 'Correct! You got it right', 'Correct! Great'];
    let randomCorrectStatus = correctStatus[Math.floor(Math.random() * correctStatus.length)];
    let incorrectStatus = ['Incorrect! Oops!', 'Incorrect! Keep working', 'Incorrect! Sorry!', ' Incorrect!', 'Incorrect! Keep trying', 'Incorrect! Uh-oh!', 'Incorrect! Review it', 'Incorrect! You got it wrong'];
    let randomIncorrectStatus = incorrectStatus[Math.floor(Math.random() * correctStatus.length)];
    const [isSubmited, setIsSubmited] = useState(false);
    const [correctAns, setCorrectAns] = useState(0);
    const [btnClass, setBtnClass] = useState('border-dark bg-white');
    const [optionIndex, setOptionIndex] = useState();

    useEffect(() => {
        // if login then only display data
        localStorage.getItem("authenticated") ? setauthenticated(true) : setauthenticated(false);

        // Display que which value is not null
        setQuestionBank(questionBank.filter(obj => obj.que !== '' && obj.ans !== '' && (obj.choices[0].answer !== '' && obj.choices[1].answer !== '' && obj.choices[2].answer !== '' && obj.choices[3].answer !== '')));
        console.log(questionBank);
    }, []);

    // For next que
    const nextQue = event => {
        setBtnClass('border-dark bg-white');
        setOptionIndex();
        if (currentQue < questionBank.length - 1) {
            setCurrentQue(currentQue + 1);
            setStatusMsg('');
        } else {
            setIsSubmited(true);
        }
    }

    // For select option
    const selectOption = (e, i) => {
        if (e.target.value === "true") {
            setBtnClass('border-success bg-success');
            setStatusMsg(randomCorrectStatus);
            setCorrectAns(correctAns + 1);
        } else if (e.target.value === "false") {
            setBtnClass('border-danger bg-danger');
            setStatusMsg(randomIncorrectStatus);
        }
        setOptionIndex(i);
    }

    if (authenticated) {
        return (
            <>
                {!isSubmited && questionBank.length > 0 ?
                    (
                        <div className='container mt-5'>
                            <h4 className="mb-3">Attempt quiz</h4>
                            <p>Question  {currentQue + 1} / {questionBank.length}</p>
                            <span className='que d-inline'>{currentQue + 1}. </span>
                            <div className='que d-inline'>{questionBank[currentQue].que !== '' ? questionBank[currentQue].que : 'Question is not found'}</div>
                            <div className='option-container d-flex flex-column'>
                                {questionBank[currentQue].choices.map((option, i) => (
                                    <div key={i}>
                                        <button className={`btn mt-2 border options-btn ${optionIndex === i ? btnClass : 'border-dark'} ${option.isCorrect === true && btnClass === 'border-danger bg-danger' ? 'border-success bg-success' : 'border-dark'}`} value={option.isCorrect} onClick={e => selectOption(e, i)} disabled={optionIndex | optionIndex === 0}>
                                            {option.answer}
                                        </button>
                                    </div>
                                ))}
                                <div className={'mt-3 mb-2 ' + (statusMsg.includes('Incorrect') ? 'text-danger' : 'text-success')}>{statusMsg}</div>
                            </div>
                            <button className='btn btn-primary' onClick={nextQue}>{currentQue + 1 !== questionBank.length ? 'Next' : 'View Result'}</button>
                        </div>
                    ) :
                    // For result 
                    (isSubmited && questionBank.length > 0 ?
                        (
                            <Result questionBank={questionBank} correctAns={correctAns}></Result>
                        ) :
                        // For not quiz found
                        (
                            <>
                                <div className='container mt-3'>
                                    <Logout></Logout>
                                    <a href='quiz-type' className='pe-auto'><img src={backIcon} alt="" className="me-3 mb-2"></img></a>
                                    <h4 className="mb-3 d-inline mt-2">Attempt quiz</h4>
                                    <div className='text-center mt-5'>
                                        <p>No data found</p>
                                    </div>
                                </div>
                            </>
                        )
                    )
                }
            </>
        )
    } else {
        return (
            <Login></Login>
        )
    }
}
