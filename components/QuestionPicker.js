import React from 'react';
import {Picker, Text, View, StyleSheet} from "react-native";
import AnswerPicker from "./AnswerPicker";
import {connect} from "react-redux";
import {getQuestions} from "../redux/selectors";
import {resetQuestions} from "../redux/actions";
import ButtonPrimary from "./ButtonPrimary";

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    textHeader: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        padding: 10,
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom: 10,
        color: '#555555'
    }
});

class QuestionPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: props.questions !== undefined && props.questions.length > 0 ? props.questions[0].key : null
        };
    }

    setQuestion(question) {
        this.setState({
            question: question
        })
    }

    render() {
        if (this.props.questions.length === 0) {
            return (
                <View/>
            )
        }
        return (
            <View style={styles.wrapper}>
                <Text style={styles.textHeader}>{this.props.title ?? 'Select an existing question'}</Text>
                <Picker style={styles.picker} title={this.props.subtitle ?? 'Select the possible answers'} selectedValue={this.state.question} onValueChange={(itemValue, itemIndex) => this.setQuestion(itemValue)}>
                    {this.props.questions.map((entry) => {
                        return <Picker.Item label={entry.value} value={entry.key} key={entry.key}/>
                    })}
                </Picker>
                <AnswerPicker question={this.state.question}/>
                <ButtonPrimary title='Reset' onClick={() => this.props.resetQuestions()}/>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        questions: getQuestions(state)
    };
}

export default connect(mapStateToProps, {resetQuestions})(QuestionPicker);
