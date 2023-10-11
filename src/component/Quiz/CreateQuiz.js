import React, { useEffect, useState } from "react";
import Login from '../Login';
import { atom, useAtom } from 'jotai';
import { useNavigate } from "react-router-dom";
import Logout from '../Logout/Logout';
import backIcon from "../../assets/images/back_to_dashboard.svg";
import swal from 'sweetalert2';


export const createQuizAtom = atom([{ que: "", ans: '', choices: [{ answer: '', isCorrect: true }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }] }]);

function CreateQuiz() {
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(null);
    const [addQueError, setAddQueError] = useState(null);
    const [formValues, setFormValues] = useAtom(createQuizAtom);
    const [checkOption, setCheckOption] = useState(false);
    const [checkOptionFalse, setCheckOptionFalse] = useState(true);

    useEffect(() => {
        // if login then only display data
        localStorage.getItem("authenticated") ? setauthenticated(true) : setauthenticated(false);
    }, []);

    function goBack() {
        navigate('/quiz-type');
    }

    // For get que value
    let handleQue = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i]['que'] = e.target.value;
        setFormValues(newFormValues);
    }

    // For get options value
    let handleChoiceChange = (i, e, ci) => {
        setCheckOptionFalse(false);
        let newFormValues = [...formValues];
        ci === 0 ? newFormValues[i]['choices'][ci].answer = e.target.value :
            ci === 1 ? newFormValues[i]['choices'][ci].answer = e.target.value :
                ci === 2 ? newFormValues[i]['choices'][ci].answer = e.target.value :
                    ci === 3 ? newFormValues[i]['choices'][ci].answer = e.target.value : newFormValues[i]['choices'][ci] = '';
        setFormValues(newFormValues);

        formValues[i]['choices'].map(obj => obj.answer);

        // console.log(formValues[i]['choices'][0].answer);
        if (ci === 0) {
            if (formValues[i]['choices'][1].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][2].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][3].answer.includes(formValues[i]['choices'][ci].answer)) {
                console.log(true);
                setCheckOption(true);
            } else {
                console.log('false');
                setCheckOptionFalse(true);
            }
        }
        if (ci === 1) {
            if (formValues[i]['choices'][0].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][2].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][3].answer.includes(formValues[i]['choices'][ci].answer)) {
                console.log('true');
                setCheckOption(true);
            } else {
                console.log('false');
                setCheckOptionFalse(true);
            }
        }
        if (ci === 2) {
            if (formValues[i]['choices'][1].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][0].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][3].answer.includes(formValues[i]['choices'][ci].answer)) {
                console.log('true');
                setCheckOption(true);
            } else {
                console.log('false');
                setCheckOptionFalse(true);
            }
        }
        if (ci === 3) {
            if (formValues[i]['choices'][1].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][2].answer.includes(formValues[i]['choices'][ci].answer) || formValues[i]['choices'][0].answer.includes(formValues[i]['choices'][ci].answer)) {
                console.log('true');
                setCheckOption(true);
            } else {
                console.log('false');
                setCheckOptionFalse(true);
            }
        }
    }

    // For add que
    let addFormFields = (e) => {
        e.preventDefault();
        setAddQueError('');
        setFormValues([...formValues, { que: "", choices: [{ answer: '', isCorrect: true }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }, { answer: '', isCorrect: false }], ans: "" }]);
    }

    // For submit create quiz
    let create = (e) => {
        e.preventDefault();
        formValues.forEach(obj => {
            console.log(obj);
            obj.ans === '' ? obj.ans = obj.choices[0].answer : obj.ans = obj.ans;
            obj.choices[0].isCorrect === '' ? obj.choices[0].isCorrect = true : obj.choices[0].isCorrect = obj.choices[0].isCorrect;
            obj.choices[1].isCorrect === '' ? obj.choices[1].isCorrect = true : obj.choices[1].isCorrect = obj.choices[1].isCorrect;
            obj.choices[2].isCorrect === '' ? obj.choices[2].isCorrect = true : obj.choices[2].isCorrect = obj.choices[2].isCorrect;
            obj.choices[3].isCorrect === '' ? obj.choices[3].isCorrect = true : obj.choices[3].isCorrect = obj.choices[3].isCorrect;
        });
        console.log(formValues);
        const validQuestion = formValues.filter(obj => obj.que !== '' && obj.ans !== '' && (obj.choices[0].answer !== '' && obj.choices[1].answer !== '' && obj.choices[2].answer !== '' && obj.choices[3].answer !== ''));
        // if (validQuestion.length >= 5) {
        navigate(-1);
        swal.fire({
            title: "Success",
            text: "Quiz is created successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 3000
        });
        // } else {
        //     setAddQueError('Add atleast 5 question');
        // }
    }

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i]['choices'][0]?.answer.trim() === e.target.value.trim() ? newFormValues[i]['choices'][0].isCorrect = true : newFormValues[i]['choices'][0].isCorrect = false;
        newFormValues[i]['choices'][1]?.answer.trim() === e.target.value.trim() ? newFormValues[i]['choices'][1].isCorrect = true : newFormValues[i]['choices'][1].isCorrect = false;
        newFormValues[i]['choices'][2]?.answer.trim() === e.target.value.trim() ? newFormValues[i]['choices'][2].isCorrect = true : newFormValues[i]['choices'][2].isCorrect = false;
        newFormValues[i]['choices'][3]?.answer.trim() === e.target.value.trim() ? newFormValues[i]['choices'][3].isCorrect = true : newFormValues[i]['choices'][3].isCorrect = false;
        newFormValues[i]['ans'] = e.target.value;
        setFormValues(newFormValues);
    };

    if (authenticated) {
        return (
            <>
                <div className="container mt-4">
                    <div className='d-flex w-100 justify-content-between'>
                        <button onClick={goBack} className='pe-auto btn'><img src={backIcon} alt="" className="ms-2"></img></button>
                        <h4 className="mb-3">Create quiz</h4>
                        <Logout></Logout>
                    </div>
                    <form className="mt-2">
                        {formValues.map((element, index) => (
                            <div key={index} className="mb-4">
                                <div className="d-flex">
                                    <p className="me-1">{index + 1}.</p>
                                    <textarea style={{ resize: 'none' }} placeholder="Enter question" className="w-100 mb-3" id="abc" value={element.que} onChange={e => handleQue(index, e)} />
                                </div>
                                {element.choices.map((option, i) => (
                                    <div key={i}>
                                        <input placeholder={`Enter option ${i + 1}`} className="w-50 mb-2 ms-3" type="text" value={element.choices[i]?.answer} onChange={e => handleChoiceChange(index, e, i)} />
                                        {/* <p>{checkOption && checkOptionFalse ? 'option is already there' : ''}</p> */}
                                        {/* {formValues[index]['choices'].map((x, index) => x.answer).indexOf(element.choices[i]?.answer) !== -1 ? 'option is already there' : ''}
                                        {option}
                                        {element.choices[i].answer} */}
                                    </div>
                                ))}
                                <br />
                                <p className="text-danger">  {checkOption && checkOptionFalse ? 'option is already there' : ''}</p>
                                <p className="d-inline me-2">Answer:</p>
                                {/* <input placeholder="Enter answer" className="w-50 mb-1" type="text" value={element.ans} onChange={e => handledAns(index, e)} /> */}
                                <select value={element.ans} onChange={e => handleChange(index, e)} className="mx-3 w-25" disabled={formValues[index].choices[0].answer === '' || formValues[index].choices[1].answer === '' || formValues[index].choices[2].answer === '' || formValues[index].choices[3].answer === '' ? true : false}>
                                    <option value={formValues[index].choices[0].answer}>{formValues[index].choices[0].answer}</option>
                                    <option value={formValues[index].choices[1].answer}>{formValues[index].choices[1].answer}</option>
                                    <option value={formValues[index].choices[2].answer}>{formValues[index].choices[2].answer}</option>
                                    <option value={formValues[index].choices[3].answer}>{formValues[index].choices[3].answer}</option>
                                </select>
                            </div>
                        ))}
                        <button className="btn btn-primary" onClick={addFormFields}>Add Question</button>
                        <button className="btn btn-primary ms-4" onClick={create}>Save</button>
                        <p className="text-danger">{addQueError}</p>
                    </form>
                </div>
            </>
        )
    } else {
        return (
            <Login></Login>
        )
    }
}

export default CreateQuiz;