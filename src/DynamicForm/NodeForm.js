import React, { useEffect, useState } from 'react'

import { DynamicFormType } from '.'
import { StringForm, NumberForm } from './TextyForm'
import { ReapeatableForm } from './RepeatableForm'
import { NestedForm } from './NestedForm'

// TODO: Handle keys better.
// TODO: On hover add border
export const NodeForm = ({ schema, onChange, onDelete }) => {
  const [value, setValue] = useState({})
  const changeValue = (key, newValueForKey) => {
    setValue((oldValue) => {
      oldValue[key] = newValueForKey
      return { ...oldValue }
    })
  }

  useEffect(() => {
    if (typeof onChange === 'function') onChange(value)
  }, [value])

  // Iterate through schema and get each form type.
  const forms = []
  for (const [key, schemaForKey] of Object.entries(schema)) {
    if (schemaForKey.type === DynamicFormType.text) {
      forms.push(
        <StringForm
          key={key}
          schema={schemaForKey}
          onChange={(newValueForKey) => {
            changeValue(key, newValueForKey)
          }}
        />
      )
    } else if (schemaForKey.type === DynamicFormType.number) {
      forms.push(
        <NumberForm
          key={key}
          schema={schemaForKey}
          onChange={(newValueForKey) => {
            changeValue(key, newValueForKey)
          }}
        />
      )
    } else if (schemaForKey.type === DynamicFormType.nested) {
      forms.push(
        <NestedForm
          key={key}
          schema={schemaForKey}
          onChange={(newValueForKey) => {
            changeValue(key, newValueForKey)
          }}
        />
      )
    } else if (schemaForKey.type === DynamicFormType.repeatable) {
      forms.push(
        <ReapeatableForm
          key={key}
          schema={schemaForKey}
          onChange={(newValueForKey) => {
            changeValue(key, newValueForKey)
          }}
        />
      )
    }
  }

  let deleteButton
  if (onDelete) {
    deleteButton = (
      <div className=''>
        <button
          className='btn btn-outline-danger w-20'
          onClick={() => {
            onDelete()
          }}
        >
          Delete
        </button>
      </div>
    )
  }

  return (
    <div className='card border-light'>
      <div className='card-body p-1 d-grid gap-1'>
        {forms}
        {deleteButton}
      </div>
    </div>
  )
}
