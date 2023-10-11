import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './component/Login';
import CreateQuiz from './component/Quiz/CreateQuiz';
import QuizType from './component/Quiz/QuizType';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AttemptQuiz from './component/Quiz/AttemptQuiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>} />
        <Route path='/create-quiz' element={<CreateQuiz></CreateQuiz>} />
        <Route path='/quiz-type' element={<QuizType></QuizType>} />
        <Route path='/attempt-quiz' element={<AttemptQuiz></AttemptQuiz>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
