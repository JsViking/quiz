import React from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../component/activeQuiz/ActiveQuiz'

class Quiz extends React.Component {
  state = {
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

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (key === 'sucsses') return
    }
    const question = this.state.quiz[this.state.activeQuestion]

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: {[answerId]: 'sucsses'}
      })

      const timeOut = window.setTimeout(() => {
        if (this.isQuizFinish()) {

        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeOut)
      }, 1000)
    } else {
      this.setState({
        answerState: {[answerId]: 'error'}
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
          <h1>Ответьте на все вопросы</h1>

          <ActiveQuiz 
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    )
  }
}

export default Quiz