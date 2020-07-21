import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCES, 
  FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCES, 
  QUIZ_SET_STATE, FINISH_QUIZ,
  QUIZ_NEXT_QUESTION, RETRY_QUIZ} from '../actions/actionTypes'

const initilaState = {
  quizes: [],
  loading: false,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  error: null
}

export default function quizReducer(state = initilaState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, 
        loading: true
      }
    case FETCH_QUIZES_SUCCES:
      return {
        ...state, 
        loading: false,
        quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state, 
        loading: false
      }
    case FETCH_QUIZ_SUCCES:
      return {
        ...state, 
        loading: false,
        quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return {
        ...state, 
        answerState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state, 
        isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state, 
        activeQuestion: action.number,
        answerState: null
      }
    case RETRY_QUIZ:
      return {
        ...state, 
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      }
    default:
      return state
  }
}