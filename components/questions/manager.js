import React from 'react';
import {connect} from "react-redux";
import {deleteQuestion, resetQuestions} from "../../redux/actions";
import QuestionPicker from "./picker";
import styles from "./styles";
import {Text, View} from "react-native";
import {getQuestions} from "../../redux/selectors";
import AnswerPicker from "../answers/picker";
import QuestionCreator from "./creator";
import QuestionEditor from "./editor";
import Button from "../button";
import AnswerRandomizer from "../answers/randomizer";
import Condition from '../condition'

const MODE_PICKER = 'PICKER';
const MODE_CREATOR = 'CREATOR';
const MODE_EDITOR = 'EDITOR';

class QuestionManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            question: null,
            questions: [],
            answer: null,
            answers: [],
            selected: [],
            mode: MODE_PICKER
        };
    }

    static getDerivedStateFromProps(props, state) {

        // Current question has been deleted
        if (state.question) {
            let question = props.questions.find(question => question.key === state.question);
            if (!question) {

                // There are no questions left...
                if (props.questions.length === 0) {
                    return {
                        questions: [],
                        question: null,
                        answers: [],
                        selected: [],
                        answer: null,
                    }
                }

                // Get the first question
                let key = props.questions[0].key;
                let answers = props.questions.find(question => question.key === key).answers.map(answer => answer.value)
                return {
                    questions: props.questions,
                    question: key,
                    answers: answers,
                    selected: answers,
                    answer: null,
                }
            }
        }

        // Questions have changed
        if (JSON.stringify(props.questions) !== JSON.stringify(state.questions)) {
            let key = state.question === null ? props.questions[0].key : state.question;
            let answers = props.questions.find(question => question.key === key).answers.map(answer => answer.value)
            return {
                questions: props.questions,
                question: key,
                answers: answers,
                selected: answers,
                answer: null,
            }
        }

        // Existing questions answers have changed
        if (props.questions.length > 0 && state.questions.length > 0) {
            let answers = props.questions.find(question => question.key === state.question).answers.map(answer => answer.value)
            if (JSON.stringify(answers) !== JSON.stringify(state.answers)) {
                return {
                    questions: props.questions,
                    answers: answers,
                    selected: answers,
                    answer: null,
                }
            }
        }

        return {};
    }

    setQuestion(key) {
        let answers = this.state.questions.find(question => question.key === key).answers.map(answer => answer.value)
        this.setState({
            question: key,
            answers: answers,
            selected: answers,
            answer: null,
        })
    }

    setSelected(selected) {
        this.setState({
            selected: selected,
            answer: null,
        })
    }

    render() {
        if (this.state.mode === MODE_PICKER) {

            return (

                <View style={styles.wrapper}>
                    <View style={styles.section}>
                        <Condition condition={this.state.question}>
                            <QuestionPicker question={this.state.question} onChange={(key) => { this.setQuestion(key)}}/>
                        </Condition>

                        <View style={{ flex: 1, flexDirection: 'row',justifyContent:'space-between' }}>
                            <Condition condition={this.state.question}>
                                <Button type='primary' title='Edit' onClick={() => {this.setState({mode: MODE_EDITOR})}}/>
                            </Condition>
                            <Button type='success' style={{marginLeft: 5, marginRight: 5}} title='New' onClick={() => {this.setState({mode: MODE_CREATOR})}}/>
                            <Condition condition={this.state.question}>
                                <Button type='danger' title='Delete' onClick={() => {this.props.deleteQuestion(this.state.question)}}/>
                            </Condition>
                        </View>
                    </View>

                    <Condition condition={this.state.answers.length > 0}>
                        <View style={styles.section}>
                            <AnswerPicker answers={this.state.answers} onUpdate={(selected) => {this.setSelected(selected)}}/>
                        </View>
                    </Condition>

                    <Condition condition={this.state.answers.length > 0}>
                        <View style={styles.section}>
                            <AnswerRandomizer answers={this.state.selected} onPick={(answer) => {this.setState({answer})}}/>
                            { this.state.answer ? <Text style={{textAlign: 'center'}}>{this.state.answer}</Text> : []}
                        </View>
                    </Condition>

                    {/*<Button title='Reset questions' onClick={() => this.props.resetQuestions()}/>*/}
                </View>
            )
        }

        if (this.state.mode === MODE_CREATOR) {
            return (
                <View style={styles.wrapper}>
                    <QuestionCreator title="Create question" onCreate={(key) => {this.setState({question: key, mode: MODE_PICKER})}}/>
                    <Button title='Cancel' onClick={() => {this.setState({mode: MODE_PICKER})}}/>
                </View>
            )
        }

        if (this.state.mode === MODE_EDITOR) {
            return (
                <View style={styles.wrapper}>
                    <QuestionEditor title="Update question" question={this.state.question} onUpdate={(old, key) => {this.setState({question: key, mode: MODE_PICKER})}}/>
                    <Button title='Cancel' onClick={() => {this.setState({mode: MODE_PICKER})}}/>
                </View>
            )
        }
    }
}

function mapStateToProps (state) {
    return {
        questions: getQuestions(state)
    };
}

export default connect(mapStateToProps, {deleteQuestion, resetQuestions})(QuestionManager);
