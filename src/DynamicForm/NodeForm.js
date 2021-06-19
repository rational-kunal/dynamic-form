import React, { useRef } from 'react'

import { DynamicFormType } from '../Schema'
import { StringForm, NumberForm } from './TextyForm'
import { ReapeatableForm } from './RepeatableForm'
import { NestedForm } from './NestedForm'
import util from '../util'

// TODO: On hover add border
export const NodeForm = ({ schema, onChange = () => {}, onDelete }) => {
  // Value container to store values.
  const valueContainer = useRef({})
  // Constant key prefix for children.
  const keyPrefixContainer = useRef(util.uniqueKey())
  const keyPrefix = keyPrefixContainer.current

  const changeValue = (key, newValueForKey) => {
    const value = valueContainer.current
    value[key] = newValueForKey
    if (util.isFunction(onChange)) {
      onChange({ ...value })
    }
  }

  // Iterate through schema and get each form type.
  const forms = []
  for (const [key, schemaForKey] of Object.entries(schema)) {
    let Form
    if (schemaForKey.type === DynamicFormType.text) {
      Form = StringForm
    } else if (schemaForKey.type === DynamicFormType.number) {
      Form = NumberForm
    } else if (schemaForKey.type === DynamicFormType.nested) {
      Form = NestedForm
    } else if (schemaForKey.type === DynamicFormType.repeatable) {
      Form = ReapeatableForm
    }

    forms.push(
      <Form
        key={keyPrefix + key}
        schema={schemaForKey}
        onChange={(newValueForKey) => {
          changeValue(key, newValueForKey)
        }}
      />
    )
  }

  let deleteButton
  if (util.isFunction(onDelete)) {
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
