import React from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../component/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../component/FinishQuiz/FinishQuiz'
import Loader from '../../component/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  renderQuiz() {
    return this.props.isFinished ? 
    <FinishQuiz 
      results={this.props.results}
      quiz={this.props.quiz}
      onRetry={this.props.retryQuiz}
    /> :
    <ActiveQuiz 
      answers={this.props.quiz[this.props.activeQuestion].answers}
      question={this.props.quiz[this.props.activeQuestion].question}
      onAnswerClick={this.props.quizAnswerClick}
      quizLength={this.props.quiz.length}
      answerNumber={this.props.activeQuestion + 1}
      state={this.props.answerState}
    />
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          
          {
            this.props.loading || !this.props.quiz
              ? <Loader /> 
              : this.renderQuiz()
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.quizReducer.loading,
    results: state.quizReducer.results,
    isFinished: state.quizReducer.isFinished,
    activeQuestion: state.quizReducer.activeQuestion,
    answerState: state.quizReducer.answerState,
    quiz: state.quizReducer.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)