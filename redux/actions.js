import {ADD_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, RESET_QUESTIONS} from "./actionTypes";

export const addQuestion = (payload) => ({
    type: ADD_QUESTION,
    payload
});

export const updateQuestion = (key, payload) => ({
    type: UPDATE_QUESTION,
    key,
    payload
});

export const deleteQuestion = (key) => ({
    type: DELETE_QUESTION,
    key
});


export const resetQuestions = () => ({
    type: RESET_QUESTIONS,
    payload: null
});
