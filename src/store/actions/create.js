
import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from './actionTypes'
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finisCreateQuiz() {
  return async (diaspatch, getState) => {
    try {
      await axios.post('quizes.json', getState().create.quiz)
      diaspatch(resetQuizCreation())
    } catch (error) {
      console.error(error)
    }
  }
}