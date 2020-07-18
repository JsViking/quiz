import React from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../component/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../component/FinishQuiz/FinishQuiz'

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Какого цвет у апельсина?',
        rightAnswerId: 3,
        id: 1,
        answers: [
          {text: 'Синий', id: 1},
          {text: 'Зеленый', id: 2},
          {text: 'Оранжевый', id: 3},
          {text: 'Красный', id: 4}
        ]
      },
      {
        question: 'Столица России',
        rightAnswerId: 1,
        id: 2,
        answers: [
          {text: 'Москва', id: 1},
          {text: 'Балаково', id: 2},
          {text: 'Тверь', id: 3},
          {text: 'Лондон', id: 4}
        ]
      }
    ]
  }

  componentDidMount() {
    console.log('Quiz -', this.props.match.params.id)
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
      if (key === 'sucsses') return
    }
    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) results[question.id] ='sucsses'
      this.setState({
        answerState: {[answerId]: 'sucsses'},
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

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          

          {
            this.state.isFinished ? 
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

        </div>
      </div>
    )
  }
}

export default Quiz