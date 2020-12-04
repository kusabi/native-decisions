import React from 'react';
import {TextInput, View, StyleSheet, Text} from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import { connect } from "react-redux";
import { addQuestion } from "../redux/actions";

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    textHeader: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        padding: 10,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 10,
        color: '#555555'
    },
    textInputMulti: {
        padding: 10,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 10,
        color: '#555555'
    }
});

function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

class QuestionCreator extends React.Component {

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
        this.props.addQuestion({
            key: this.state.key,
            value: this.state.value,
            answers: this.state.answers.map((answer) => {
                return {
                    key: string_to_slug(answer),
                    value: answer
                }
            })
        })
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
                <ButtonPrimary title='Create' onClick={() => this.saveQuestion()}/>
            </View>
        )
    }
}

export default connect(null, { addQuestion })(QuestionCreator);
