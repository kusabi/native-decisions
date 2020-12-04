import React from 'react';
import {CheckBox, StyleSheet, Text, View} from "react-native";
import {getQuestions} from "../redux/selectors";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    checkboxWrapper: {

    },
    checkboxContainer: {
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 5
    },
    checkbox: {
        alignSelf:'center',
        textAlign:'center'
    },
    checkboxText: {
        alignSelf:'center',
        textAlign:'center',
        marginLeft: 3
    },
    textHeader: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

class AnswerPicker extends React.Component {

    constructor(props) {
        super(props);


        if (props.questions === undefined) {
            this.state = {
                questions: [],
                question: null,
                answers: null
            };
        } else {
            let questions = props.questions;
            this.state = {
                questions,
                question: null,
                answers: null
            };
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.question !== state.question) {
            return {
                questions: state.questions,
                question: props.question,
            };
        }
        return state;
    }

    getQuestion(question) {
        if (question === undefined || question === null) {
            return null;
        }
        if(this.state.questions === undefined || this.state.questions === null || this.state.questions.length === 0) {
            return null;
        }
        for (let i in this.state.questions) {
            if (this.state.questions.hasOwnProperty(i) && this.state.questions[i].key === question) {
                return this.state.questions[i];
            }
        }
        return null;
    }

    getAnswersForQuestion(question) {
        question = AnswerPicker.getQuestion(question)
        if (question === null) {
            return []
        }
        return question.answers.map((entry) => {
            return entry.key;
        })
    }

    setAnswer(key, enabled) {
        let answers = this.state.answers;
        if (enabled && !answers.includes(key)) {
            answers.push(key);
        }

        if (!enabled && answers.includes(key)) {
            answers.splice(answers.indexOf(key), 1);
        }

        this.setState({
            answers
        });
    }

    render() {
        // Get the question
        let question = this.getQuestion(this.state.question);

        // If there is no valid question, or the question has no answers, then just show the question picker
        if (question === null || !question.hasOwnProperty('answers') || question.answers.length === 0) {
            return (
                <View/>
            )
        }

        // Render the question and the answer picker
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textHeader}>{this.props.title ?? 'Select the possible answers'}</Text>
                <View style={styles.checkboxWrapper}>
                    {question.answers.map((entry) => {
                        let selected = this.state.answers === null || this.state.answers.includes(entry.key);
                        return (
                            <View style={styles.checkboxContainer} key={entry.key}>
                                <CheckBox style={styles.checkbox} key={`cb_${entry.key}`} value={selected} onValueChange={(itemValue, itemIndex) => this.setAnswer(entry.key, itemValue)}/>
                                <Text style={styles.checkboxText} key={`text_${entry.key}`}>{entry.value}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        questions: getQuestions(state)
    };
};

export default connect(mapStateToProps)(AnswerPicker);