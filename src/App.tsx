import React, {useState} from 'react';
import './App.css';
import {QuestionnaireHeader} from "./components/QuestionnaireHeader/QuestionnaireHeader";
import {QuestionnaireBody} from "./components/QuestionnaireBody/QuestionnaireBody";

function App() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return <>
        <header></header>
        <main>
            <QuestionnaireHeader/>
            <QuestionnaireBody/>
        </main>
        <footer></footer>
    </>;
}

export default App;
