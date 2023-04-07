import { useState, useReducer } from 'react'
import './App.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

export const ACTIONS = {
  ADD_DIGIT: 'ADD_DIGIT',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'

}

// The state argument represents the current state of the application.
// The reducer function uses the type property of the action object to determine what change to make.
// The payload property provides additional data needed to make the change.
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOper: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === '0' && state.currentOper === '0') {
        return state
      }
      if (payload.digit === '.' && state.currentOper.includes('.')) {
        return state
      }
      return {
        ...state,
        currentOper: `${state.currentOper || ''}${payload.digit}`
      }

    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOper: null
        }
      }
      if (state.currentOper == null) {
        return state
      }
      if (state.currentOper.length === 1) {
        return {
          ...state,
          currentOper: null
        }
      }
      return {
        ...state,
        currentOper: state.currentOper.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (state.previousOper == null || state.currentOper == null || state.operation == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOper: null,
        operation: null,
        currentOper: evaluate(state)
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOper == null && state.previousOper == null) {
        return state
      }
      if (state.currentOper == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      if (state.previousOper == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOper: state.currentOper,
          currentOper: null
        }
      }
      return {
        ...state,
        overwrite: true,
        operation: payload.operation,
        currentOper: null
      }
  }
}

function evaluate({ currentOper, previousOper, operation }) {
  const prev = parseFloat(previousOper)
  const current = parseFloat(currentOper)
  if (isNaN(prev) || isNaN(current)) {
    return ''
  }
  let computation = ''
  switch (operation) {
    case '+':
      computation = prev + current
      break;
    case '-':
      computation = prev - current
      break;
    case '×':
      computation = prev * current
      break;
    case '÷':
      computation = prev / current
      break;
    case '%':
      computation = prev % current
      break;
  }
  return computation.toString()
}

function App() {
  // The useReducer hook is used to manage the state of a React component. It takes two arguments: a reducer function and an initial state value. 
  // The dispatch function is used to send actions to the reducer function to update the state.
  const [{ currentOper, previousOper, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-op'>
          {previousOper}{operation}
        </div>
        <div className='current-op'>
          {currentOper}
        </div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <DigitButton digit='' dispatch={dispatch}></DigitButton>
      <OperationButton operation='%' dispatch={dispatch}></OperationButton>
      <OperationButton operation='÷' dispatch={dispatch}></OperationButton>
      <DigitButton digit='7' dispatch={dispatch}></DigitButton>
      <DigitButton digit='8' dispatch={dispatch}></DigitButton>
      <DigitButton digit='9' dispatch={dispatch}></DigitButton>
      <OperationButton operation='×' dispatch={dispatch}></OperationButton>
      <DigitButton digit='4' dispatch={dispatch}></DigitButton>
      <DigitButton digit='5' dispatch={dispatch}></DigitButton>
      <DigitButton digit='6' dispatch={dispatch}></DigitButton>
      <OperationButton operation='-' dispatch={dispatch}></OperationButton>
      <DigitButton digit='1' dispatch={dispatch}></DigitButton>
      <DigitButton digit='2' dispatch={dispatch}></DigitButton>
      <DigitButton digit='3' dispatch={dispatch}></DigitButton>
      <OperationButton operation='+' dispatch={dispatch}></OperationButton>
      <DigitButton digit='0' dispatch={dispatch}></DigitButton>
      <DigitButton digit='.' dispatch={dispatch}></DigitButton>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  )
}

export default App
