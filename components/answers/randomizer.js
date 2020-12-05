import React from 'react';
import {View} from "react-native";
import {getQuestions} from "../../redux/selectors";
import {connect} from "react-redux";
import styles from "./styles";
import Button from "../button";

class AnswerRandomizer extends React.Component {

    static defaultProps = {
        answers: [],
        onPick: (answer) => {
            console.log('Answer selected!', {answer})
        }
    }

    constructor(props) {
        super(props);
    }

    pickAnswer() {
        let answer = this.props.answers[Math.floor(Math.random() * this.props.answers.length)];
        this.props.onPick(answer);
        return null;
    }


    render() {

        // If there is no valid question, or the question has no answers, then just show the question picker
        if (this.props.answers.length === 0) {
            return (
                <View/>
            )
        }

        // Render the question and the answer picker
        return (
            <View style={styles.wrapper}>
                <Button type='primary' title='Pick an answer' onClick={() => {
                    this.pickAnswer()
                }}/>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        questions: getQuestions(state)
    };
};

export default connect(mapStateToProps)(AnswerRandomizer);