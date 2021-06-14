import React, { useState, useEffect, useRef } from 'react'

import { NodeForm } from './NodeForm'
import util from '../util'

let keyIndex = 0
export const ReapeatableForm = ({ schema, onChange = () => {} }) => {
  const [forms, setForms] = useState([])
  const [value, setValue] = useState({})
  // Constant key prefix for children.
  const keyPrefixContainer = useRef(util.uniqueKey())
  const keyPrefix = keyPrefixContainer.current

  const deleteFormWithKey = (key) => {
    setForms((oldForms) => {
      return oldForms.filter((x) => x.key !== key)
    })
  }

  const addForm = () => {
    const newKey = `${keyPrefix + schema.label}_${keyIndex++}`
    setForms([
      ...forms,
      <NodeForm
        key={newKey}
        schema={schema.schema}
        onChange={(newValue) => {
          changeValue(newKey, newValue)
        }}
        onDelete={() => {
          deleteFormWithKey(newKey)
          changeValue(newKey, null)
        }}
      />
    ])
  }

  const changeValue = (key, newValue) => {
    setValue((oldValue) => {
      if (newValue) oldValue[key] = newValue
      else delete oldValue[key] // TODO: Check if it is safe to use delete.
      return { ...oldValue }
    })
  }

  useEffect(() => {
    if (util.isFunction(onChange)) {
      onChange([...Object.values(value)])
    }
  }, [value])

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
