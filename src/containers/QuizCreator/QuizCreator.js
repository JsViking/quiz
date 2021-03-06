import React, { Component } from 'react'
import classes from './QuizCreator.module.scss'
import Buttons from '../../component/UI/button/Button'
import Input from '../../component/UI/Input/Input'
import Select from '../../component/UI/Select/Select'
import { createControl, validate, validateForm } from '../../form/formFramework'
import { connect } from 'react-redux'
import { createQuizQuestion, finisCreateQuiz } from '../../store/actions/create'

function createOptionControls(count) {
  let options = {}

  for (let i = 1; i <= count; i++ ) {
    options[`option${i}`] = createControl({
      label: `Вариант ${i}`,
      id: i,
      errorMessage: 'Значение не может быть пустым'
    }, {required: true})
  }

  return options
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    ...createOptionControls(4)
  }
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  }

  submitHandler = event => event.preventDefault

  addQuestionHandler = event => {
    event.preventDefault()

    const questionItem = {
      question: this.state.formControls.question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: Object.keys(this.state.formControls).filter(controlName => controlName !== 'question').map(name => {
        const control = this.state.formControls[name]
        return {
          text: control.value,
          id: control.id
        }
      })
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }

  createQuizHandler = event => {
    event.preventDefault()

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })

    this.props.finisCreateQuiz()
  }

  onChangeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = validateForm(formControls)

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <React.Fragment key={index}>
        <Input
          value={control.value}
          type={control.type}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          shouldValidation={control.validation && Object.keys(control).length > 0}
          onChange={event => this.onChangeHandler(event.target.value, controlName)}
        />

        { index === 0 ? <hr/> : null }
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: Number(event.target.value)
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={(event) => this.submitHandler}>
            {this.renderInputs()}

            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
              ]}
            />

            <Buttons
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={this.addQuestionHandler}
            >Добавить вопрос</Buttons>

            <Buttons
              disabled={this.props.quiz.length === 0}
              type="success"
              onClick={this.createQuizHandler}
            >Создать тест</Buttons>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finisCreateQuiz: () => dispatch(finisCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)