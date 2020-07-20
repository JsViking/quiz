import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCES, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCES, QUIZ_SET_STATE} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const responce = await axios.get('quizes.json')
      const quizes = []

      Object.keys(responce.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })
      dispatch(fetchQuizesSucces(quizes))
    } catch (error) {
      dispatch(fetchQuizesError(error))
      console.error(error)
    }
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const responce = await axios.get(`quizes/${quizId}.json`)
      dispatch(fetchQuizeSucces(responce.data))
    } catch (error) {
      dispatch(fetchQuizesError(error))
      console.error(error)
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizeSucces(quiz) {
  return {
    type: FETCH_QUIZ_SUCCES,
    quiz
  }
}

export function fetchQuizesSucces(quizes) {
  return {
    type: FETCH_QUIZES_SUCCES,
    quizes
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quizReducer

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (key === 'success') return
    }
    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) results[question.id] ='success'

      // this.setState({
      //   answerState: {[answerId]: 'success'},
      //   results
      // })

      const timeOut = window.setTimeout(() => {
        if (this.isQuizFinish()) {
          // this.setState({isFinished: true})
        } else {
          // this.setState({
          //   activeQuestion: this.props.activeQuestion + 1,
          //   answerState: null
          // })
        }

        window.clearTimeout(timeOut)
      }, 1000)
    } else {
      results[question.id] = 'error'
      // this.setState({
      //   answerState: {[answerId]: 'error'},
      //   results
      // })
    }
  }
}