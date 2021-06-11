import React, { useEffect, useState } from 'react'

import { NodeForm } from './NodeForm'
import util from '../util'

// TODO: Handle keys better.
export const DynamicForm = ({ schema = {}, onChange = () => {}, onSubmit }) => {
  const [value, setValue] = useState({})
  const changeValue = (newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (util.isFunction(onChange)) {
      onChange(value)
    }
  }, [value])

  let submitButton
  if (util.isFunction(onSubmit)) {
    submitButton = (
      <button
        className='btn btn-success mx-1 w-auto '
        onClick={() => {
          onSubmit({ ...value })
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

export const DynamicFormType = {
  text: 'DynamicFormType.Text',
  number: 'DynamicFormType.Number',
  nested: 'DynamicFormType.Nested',
  repeatable: 'DynamicFormType.Repeatable'
}
