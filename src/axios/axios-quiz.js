import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-b71ad.firebaseio.com/'
})