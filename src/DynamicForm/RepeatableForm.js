import React, { useState, useRef } from 'react'

import { NodeForm } from './NodeForm'
import util from '../util'

let keyIndex = 0
export const ReapeatableForm = ({ schema, onChange = () => {} }) => {
  const [forms, setForms] = useState([])
  // Value container to store values.
  const valueContainer = useRef({})
  // Constant key prefix for children.
  const keyPrefixContainer = useRef(util.uniqueKey())
  const keyPrefix = keyPrefixContainer.current

  const deleteFormWithKey = (key) => {
    setForms((oldForms) => {
      return oldForms.filter((x) => x.key !== key)
    })
  }

  // Changes value for given key in `valueContainer` and passes the information to parent
  const changeValueForKey = (key, newValue) => {
    valueContainer.current[key] = newValue
    onChange(Object.values(valueContainer.current))
  }

  // Removes value for given key in `valueContainer` and passes the information to parent
  const removeValueForKey = (key) => {
    delete valueContainer.current[key]
    onChange(Object.values(valueContainer.current))
  }

  const addForm = () => {
    const newKey = `${keyPrefix + schema.label}_${keyIndex++}`
    setForms([
      ...forms,
      <NodeForm
        key={newKey}
        schema={schema.schema}
        onChange={(newValue) => {
          changeValueForKey(newKey, newValue)
        }}
        onDelete={() => {
          removeValueForKey(newKey)
          deleteFormWithKey(newKey)
        }}
      />
    ])
  }

  // TODO: Add icon to delete button
  return (
    <div className='card border-secondary'>
      <div className='card-header'>{schema.label}</div>
      <div className='card-body p-1'>
        {forms}
        <div className='d-grid'>
          <button
            className='btn btn-outline-secondary mx-1 w-auto'
            onClick={() => {
              addForm()
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
