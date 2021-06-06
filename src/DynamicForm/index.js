import React from 'react'

import { NodeForm } from './NodeForm'

// TODO: Handle keys better.
export const DynamicForm = ({ schema, onSubmit }) => {
  let value = {}
  const changeValue = (newValue) => {
    value = newValue
  }

  return (
    <div className='card border-primary'>
      <div className='card-body p-1 d-grid gap-1'>
        <NodeForm
          schema={schema}
          onChange={(newValue) => {
            changeValue(newValue)
          }}
        />
        <button
          className='btn btn-success mx-1 w-auto '
          onClick={() => {
            if (typeof onSubmit === 'function') onSubmit(value)
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export const DynamicFormType = {
  text: 'DynamicFormType.Text',
  number: 'DynamicFormType.Number',
  nested: 'DynamicFormType.Nested',
  repeatable: 'DynamicFormType.Repeatable'
}
