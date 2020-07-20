import React from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../component/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../component/FinishQuiz/FinishQuiz'
import Loader from '../../component/UI/Loader/Loader'
import axios from '../../axios/axios-quiz'

class Quiz extends React.Component {
  state = {
    loading: true,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: []
  }

  async componentDidMount() {
    console.log('Quiz -', this.props.match.params.id)
    const quizId = this.props.match.params.id
    try {
      const responce = await axios.get(`quizes/${quizId}.json`)
      console.log('responce', responce.data)

      this.setState({ 
        quiz: responce.data,
        loading: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,    
    })
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (key === 'success') return
    }
    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) results[question.id] ='success'
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeOut = window.setTimeout(() => {
        if (this.isQuizFinish()) {
          this.setState({isFinished: true})
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeOut)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinish() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  renderQuiz() {
    return this.state.isFinished ? 
    <FinishQuiz 
      results={this.state.results}
      quiz={this.state.quiz}
      onRetry={this.retryHandler}
    /> :
    <ActiveQuiz 
      answers={this.state.quiz[this.state.activeQuestion].answers}
      question={this.state.quiz[this.state.activeQuestion].question}
      onAnswerClick={this.onAnswerClickHandler}
      quizLength={this.state.quiz.length}
      answerNumber={this.state.activeQuestion + 1}
      state={this.state.answerState}
    />
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          
          {
            this.state.loading 
              ? <Loader /> 
              : this.renderQuiz()
          }

        </div>
      </div>
    )
  }
}

export default Quiz