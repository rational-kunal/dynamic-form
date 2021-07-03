import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import util from '../util'
import { NodeForm } from './NodeForm'
import { ROLE_INPUT_DYNAMIC_SUBMIT } from './roles'

// TODO: Add overall end to end test for all types of form
// TODO: Add test for keys with large schema.
export const DynamicForm = ({ schema, onChange = () => {}, onSubmit }) => {
  // Value container to store values.
  const valueContainer = useRef({})
  const changeValue = ({ newValue }) => {
    valueContainer.current = newValue

    // Update out function that value is changed.
    if (util.isFunction(onChange)) {
      util.dispatchAsync(() => {
        onChange({ ...valueContainer.current })
      })
    }
  }

  let submitButton
  if (util.isFunction(onSubmit)) {
    submitButton = (
      <button
        className='btn btn-success mx-1 w-auto '
        role={ROLE_INPUT_DYNAMIC_SUBMIT}
        onClick={() => {
          onSubmit({ ...valueContainer.current })
        }}
      >
        Submit
      </button>
    )
  }

  return (
    <div className='d-grid gap-1'>
      <NodeForm schema={schema} onChange={changeValue} />
      {submitButton}
    </div>
  )
}

DynamicForm.propTypes = {
  schema: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}
