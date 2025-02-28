import {DndListHandle, QuestionContainer} from "../QuestionContainer/QuestionContainer";
import React, {useEffect, useState} from "react";

export type Choice = 'Одиночный' | 'Множественный' | 'Табличный'

export type Question = {
    id: string
    name: string
    number: number
    choiceType: Choice
    answers: Answer[]
}

export type Answer = {
    id: string
    name: string
    number: string
}

export const QuestionnaireBody = () => {

    const [questions, setQuestions] = useState<Question[]>([
        {id: '1', name: 'Первый вопрос', number: 1, choiceType: 'Одиночный', answers: [
                {id: '1', name: 'Первый ответ', number: '1'},
                {id: '2', name: 'Второй ответ', number: '2'},
                {id: '3', name: 'Третий ответ', number: '3'},
                {id: '4', name: 'Четвертый ответ', number: '4'},
            ]
        },
        {id: '2', name: 'Второй вопрос', number: 2, choiceType: 'Множественный', answers: [
                {id: '1', name: 'Первый ответ', number: '1'},
                {id: '2', name: 'Второй ответ', number: '2'},
                {id: '3', name: 'Третий ответ', number: '3'},
                {id: '4', name: 'Четвертый ответ', number: '4'},
            ]
        },
        {id: '3', name: 'Третий вопрос', number: 3, choiceType: 'Табличный', answers: [
                {id: '1', name: 'Первый ответ~Отлично', number: '0.0'},
                {id: '1', name: 'Первый ответ~Хорошо', number: '0.1'},
                {id: '1', name: 'Первый ответ~Нормально', number: '0.2'},
                {id: '1', name: 'Первый ответ~Никак', number: '0.3'},
                {id: '2', name: 'Второй ответ~Отлично', number: '1.0'},
                {id: '2', name: 'Второй ответ~Хорошо', number: '1.1'},
                {id: '2', name: 'Второй ответ~Нормально', number: '1.2'},
                {id: '2', name: 'Второй ответ~Никак', number: '1.3'},
                {id: '2', name: 'Третий ответ~Отлично', number: '2.0'},
                {id: '3', name: 'Третий ответ~Хорошо', number: '2.1'},
                {id: '3', name: 'Третий ответ~Нормально', number: '2.2'},
                {id: '3', name: 'Третий ответ~Никак', number: '2.3'},
                {id: '4', name: 'Четвертый ответ~Никак', number: '3.0'},
                {id: '4', name: 'Четвертый ответ~Никак', number: '3.1'},
                {id: '4', name: 'Четвертый ответ~Никак', number: '3.2'},
                {id: '4', name: 'Четвертый ответ~Никак', number: '3.3'},
            ]
        },
    ]);

    useEffect(() => {
        console.log(questions)
    }, [questions]);

    return <>
        {
            questions.map(question => <QuestionContainer key={question.id} question={question} setQuestions={setQuestions}/>)
        }
        <DndListHandle/>
    </>
}