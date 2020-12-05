import {ADD_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, RESET_QUESTIONS} from "../actionTypes";
import {DEFAULT_QUESTIONS} from "../defaults"

export default function(state = DEFAULT_QUESTIONS, action) {
    switch (action.type) {
        case ADD_QUESTION: {
            state.push(action.payload);
            return [...state];
        }
        case UPDATE_QUESTION: {
            for (let i in state) {
                if (state.hasOwnProperty(i) && state[i].key === action.key) {
                    state[i] = action.payload
                }
            }
            return [...state];
        }
        case DELETE_QUESTION: {
            for (let i in state) {
                if (state.hasOwnProperty(i) && state[i].key === action.key) {
                    state.splice(i, 1);
                }
            }
            return [...state];
        }
        case RESET_QUESTIONS: {
            return [...DEFAULT_QUESTIONS];
        }
        default:
            return state;
    }
}
