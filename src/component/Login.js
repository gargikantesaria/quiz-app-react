
import QuizImg from "../assets/images/quiz-img.jpg";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function Login() {
    const {
        register,
        formState: { errors, isDirty, isValid },
    } = useForm();

    const navigate = useNavigate();

    function login(event) {
        event.preventDefault();
        localStorage.setItem("authenticated", true);
        navigate("/quiz-type");
    }

    return (
        <div className="App d-flex">
            <img src={QuizImg} alt="" className="quiz-img"></img>
            <div className="w-100 mt-5">
                <div className="my-auto">
                    <h1 className="text-center mb-5">Quiz app</h1>
                    <form onSubmit={login}>
                        {/* <form onSubmit={login}> */}
                        <div className="text-start login-div m-auto">
                            <label htmlFor="userName" className="mb-1">User Name:</label>
                            {/* <input type="text" placeholder="Enter User Name" onChange={inputEvent}></input> */}
                            <input id="userName" {...register('userName', {
                                required: "User name is required",
                                validate: {
                                    maxLength: (v) =>
                                        v.length <= 50 || "The User name should have at most 50 characters",
                                    matchPattern: (v) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                        "User name must be a valid",
                                },
                            })} />
                            <br />
                            {errors.userName?.message && (
                                <small className="text-danger">{errors.userName.message}</small>
                            )}
                            <br />
                            <p className="mb-1">Password:</p>
                            <input id="password" {...register('password', {
                                required: "Password is required",
                                validate: {
                                    maxLength: (v) =>
                                        v.length > 7 || "The password should have at least 8 characters",
                                    matchPattern: (v) =>
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(v) ||
                                        "Password must be a valid",
                                },
                            })} />
                            <br />
                            {errors.password?.message && (
                                <small className="text-danger">{errors.password.message}</small>
                            )}
                            {/* <input type="password" onChange={passwordInputEvent} placeholder="Enter Password" ></input> */}
                            <br />
                            {/* <button disabled={passwordErr || passwordErr === undefined || nameErr || nameErr === undefined} className="btn btn-primary mt-2" >Log In</button> */}
                            <button className="btn btn-primary mt-2" disabled={!isDirty || !isValid}>Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function App() {

    return (
        <Login></Login>
    )
}