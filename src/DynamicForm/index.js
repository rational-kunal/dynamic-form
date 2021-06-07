import React, { useState } from 'react'

import { NodeForm } from './NodeForm'

// TODO: Handle keys better.
export const DynamicForm = ({ schema, onSubmit = () => {} }) => {
  const [value, setValue] = useState({})
  const changeValue = (newValue) => {
    setValue(newValue)
  }

  return (
    <div className='d-grid gap-1'>
      <NodeForm
        schema={schema}
        onChange={(newValue) => {
          changeValue(newValue)
        }}
      />
      <button
        className='btn btn-success mx-1 w-auto '
        onClick={() => {
          onSubmit({ ...value })
        }}
      >
        Submit
      </button>
    </div>
  )
}

export const DynamicFormType = {
  text: 'DynamicFormType.Text',
  number: 'DynamicFormType.Number',
  nested: 'DynamicFormType.Nested',
  repeatable: 'DynamicFormType.Repeatable'
}
