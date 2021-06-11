import React, { useEffect, useState } from 'react'

import { NodeForm } from './NodeForm'

// TODO: Handle keys better.
// TODO: Better way to consistently handle if function then execute i.e. `typeof onChange === 'function'`
export const DynamicForm = ({ schema = {}, onChange = () => {}, onSubmit }) => {
  const [value, setValue] = useState({})
  const changeValue = (newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    onChange(value)
  }, [value])

  let submitButton
  if (onSubmit) {
    submitButton = (
      <button
        className='btn btn-success mx-1 w-auto '
        onClick={() => {
          if (typeof onSubmit === 'function') onSubmit({ ...value })
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