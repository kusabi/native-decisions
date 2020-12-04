import {ADD_QUESTION, RESET_QUESTIONS} from "../actionTypes";
import {DEFAULT_QUESTIONS} from "../defaults"

export default function(state = DEFAULT_QUESTIONS, action) {
    switch (action.type) {
        case ADD_QUESTION: {
            state.push(action.payload);
            return [...state];
        }
        case RESET_QUESTIONS: {
            return DEFAULT_QUESTIONS;
        }
        default:
            return state;
    }
}
