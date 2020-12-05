import React from 'react';
import {Text, TextInput, View} from "react-native";
import Button from '../button';
import {connect} from "react-redux";
import {updateQuestion} from "../../redux/actions";
import styles from './styles'
import string_to_slug from './slug'
import {getQuestions} from "../../redux/selectors";
import QuestionCreator from "./creator";

class QuestionEditor extends React.Component {

    static defaultProps = {
        title: 'Update question',
        onUpdate: (old, key, name, answers) => {
            console.log('Question updated!', {old, key, name, answers})
        }
    }

    constructor(props) {
        super(props);

        let question = null;
        if (this.props.question !== undefined && this.props.question !== null) {
            for (let i  in this.props.questions) {
                if (this.props.questions.hasOwnProperty(i) && this.props.questions[i].key === this.props.question) {
                    question = this.props.questions[i];
                }
            }
        }

        if (question === null) {
            this.state = {
                question: null,
                key: '',
                value: '',
                answers: []
            };
        } else {
            this.state = {
                question: question,
                key: question.key,
                value: question.value,
                answers: question.answers.map((answer) => { return answer.value; })
            };
        }
    }

    setQuestion(text) {
        this.setState({
            key: string_to_slug(text),
            value: text,
        })
    }

    setAnswers(text) {
        this.setState({
            answers: text.split("\n"),
        })
    }

    saveQuestion() {
        let key = this.state.key;
        let value = this.state.value;
        let answers = this.state.answers.map(answer => {return {key: string_to_slug(answer), value: answer}})
        this.props.onUpdate(this.state.question.key, key, value, answers);
        this.props.updateQuestion(this.state.question.key, {key, value, answers})
    }

    render() {
        if (this.state.question === null) {
            return (
                <QuestionCreator/>
            )
        }
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textHeader}>{this.props.title}</Text>
                <TextInput style={styles.textInput} placeholder="Question" onChangeText={(text) => this.setQuestion(text)} value={this.state.value}/>
                <TextInput style={styles.textInputMulti} placeholder="Answers (1 per line)" multiline={true} numberOfLines={4} onChangeText={(text) => this.setAnswers(text)} value={this.state.answers.join("\n")}/>
                <Button type='primary' title='Update' onClick={() => this.saveQuestion()}/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: getQuestions(state)
    };
}

export default connect(mapStateToProps, {updateQuestion})(QuestionEditor);
