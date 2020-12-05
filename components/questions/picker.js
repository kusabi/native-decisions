import React from 'react';
import {Picker, View} from "react-native";
import {connect} from "react-redux";
import {getQuestions} from "../../redux/selectors";
import {resetQuestions} from "../../redux/actions";
import styles from './styles'

class QuestionPicker extends React.Component {

    static defaultProps = {
        onChange: (key, name, answers) => {
            console.log('Question selected!', {key, name, answers})
        }
    }

    constructor(props) {
        super(props);

        let question = props.questions !== undefined && props.questions.length > 0 ? props.questions[0].key : null;

        this.state = {
            question
        };
    }

    setQuestion(key) {
        this.setState({
            question: key
        })

        for (let i in this.props.questions) {
            if (this.props.questions.hasOwnProperty(i) && this.props.questions[i].key === key) {
                let question = this.props.questions[i];
                console.log(question);
                this.props.onChange(question.key, question.value, question.answers);
                break;
            }
        }

    }

    render() {
        if (this.props.questions.length === 0) {
            return (
                <View/>
            )
        }
        return (
            <View style={styles.wrapper}>
                <Picker style={styles.picker} selectedValue={this.state.question} onValueChange={(itemValue) => this.setQuestion(itemValue)}>
                    {this.props.questions.map((entry) => {
                        return <Picker.Item label={entry.value} value={entry.key} key={entry.key}/>
                    })}
                </Picker>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: getQuestions(state)
    };
}

export default connect(mapStateToProps, {resetQuestions})(QuestionPicker);
