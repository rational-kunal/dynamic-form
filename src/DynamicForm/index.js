import React, { useRef } from 'react'

import { NodeForm } from './NodeForm'
import util from '../util'

// TODO: Add test for keys with large schema.
export const DynamicForm = ({ schema = {}, onChange = () => {}, onSubmit }) => {
  // Value container to store values.
  const valueContainer = useRef({})
  const changeValue = (newValue) => {
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
      <NodeForm
        schema={schema}
        onChange={(newValue) => {
          changeValue(newValue)
        }}
      />
      {submitButton}
    </div>
  )
}
