import React from 'react';
import {CheckBox, Text, View} from "react-native";
import {getQuestions} from "../../redux/selectors";
import {connect} from "react-redux";
import styles from "./styles";

class AnswerPicker extends React.Component {

    static defaultProps = {
        onUpdate: (answers) => {
            console.log('Answers selected!', {answers})
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            answers: [...this.props.answers]
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.answers) !== JSON.stringify(prevProps.answers)) {
            this.setState({
                answers: [...this.props.answers]
            });
        }
    }

    setAnswer(key, enabled) {
        if (enabled && !this.state.answers.includes(key)) {
            this.state.answers.push(key);
        }

        if (!enabled && this.state.answers.includes(key)) {
            this.state.answers.splice(this.state.answers.indexOf(key), 1);
        }

        this.setState({
            answers: this.state.answers
        });

        this.props.onUpdate(this.state.answers);
    }

    toggleAnswer(key) {
        this.setAnswer(key, !this.state.answers.includes(key))
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
                <View style={styles.checkboxWrapper}>
                    {this.props.answers.map((answer) => {
                        let selected = this.state.answers.includes(answer);
                        return (
                            <View style={styles.checkboxContainer} key={answer}>
                                <CheckBox style={styles.checkbox} key={`cb_${answer}`} value={selected} onValueChange={(itemValue) => this.setAnswer(answer, itemValue)}/>
                                <Text style={styles.checkboxText} key={`text_${answer}`} onPress={() => this.toggleAnswer(answer)}>{answer}</Text>
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