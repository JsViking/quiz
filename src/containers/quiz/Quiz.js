import React from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../component/activeQuiz/ActiveQuiz'

class Quiz extends React.Component {
  state = {
    quiz: [
      {
        question: 'Какого цвет у апельсина',
        rightAnswerId: 3,
        answers: [
          {text: 'Синий', id: 1},
          {text: 'Зеленый', id: 2},
          {text: 'Оранжевый', id: 3},
          {text: 'Красный', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = answerId => {
    console.log('$$', answerId)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          <ActiveQuiz 
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    )
  }
}

export default Quiz