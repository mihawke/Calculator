import { ACTIONS } from "./App"

export default function DigitButton({ dispatch, digit }) {
  // dispatch prop: is a function that takes an action object as an argument and is used to update the state of the parent component (App)
  // digit prop: is a string representing the digit displayed on the button.
  
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  )
}