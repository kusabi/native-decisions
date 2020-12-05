import React from 'react';
import {TextInput, View, StyleSheet, Text} from "react-native";
import Button from "../button";
import {connect} from "react-redux";
import {addQuestion} from "../../redux/actions";
import styles from './styles'
import string_to_slug from './slug'

class QuestionCreator extends React.Component {

    static defaultProps = {
        onCreate: (key, name, answers) => { console.log('Question created!', {key, name, answers})}
    }

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            value: '',
            answers: []
        };
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
        let answers = this.state.answers.map((answer) => {
            return {
                key: string_to_slug(answer),
                value: answer
            }
        })
        this.props.addQuestion({key, value, answers})
        this.props.onCreate(key, value, answers);
        this.setState({
            key: '',
            value: '',
            answers: []
        });
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textHeader}>{this.props.title ?? 'Create a new question'}</Text>
                <TextInput style={styles.textInput} placeholder="Question" onChangeText={(text) => this.setQuestion(text)} value={this.state.value}/>
                <TextInput style={styles.textInputMulti} placeholder="Answers (1 per line)" multiline={true} numberOfLines={4} onChangeText={(text) => this.setAnswers(text)} value={this.state.answers.join("\n")}/>
                <Button type='primary' title='Create' onClick={() => this.saveQuestion()}/>
            </View>
        )
    }
}

export default connect(null, { addQuestion })(QuestionCreator);
