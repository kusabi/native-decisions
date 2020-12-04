import {ADD_QUESTION, GET_QUESTIONS, RESET_QUESTIONS} from "./actionTypes";

export const addQuestion = content => ({
    type: ADD_QUESTION,
    payload: content
});


export const resetQuestions = () => ({
    type: RESET_QUESTIONS,
    payload: null
});
