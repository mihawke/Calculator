import { useState, useReducer } from 'react'
import './App.css'
import DigitButton from './DigitButton'

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
      return {
        ...state,
        currentOper: `${currentOper || ''}${payload.digit}`
      }
  }
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
      <button>AC</button>
      <button>( )</button>
      <button>%</button>
      <DigitButton digit='÷' dispatch={dispatch}></DigitButton>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>×</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>0</button>
      <button>.</button>
      <button>DEL</button>
      <button>=</button>
    </div>
  )
}

export default App
