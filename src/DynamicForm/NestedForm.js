import React, { useState, useEffect } from 'react'

import { NodeForm } from './NodeForm'

export const NestedForm = ({ schema, onChange }) => {
  const [value, setValue] = useState({})

  const changeValue = (newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (typeof onChange === 'function') onChange(value)
  }, [value])

  // TODO: Add icon to delete button
  return (
    <div className='card border-info'>
      <div className='card-header'>{schema.label}</div>
      <div className='card-body p-1 d-grid gap-1'>
        <NodeForm schema={schema.schema} onChange={changeValue} />
      </div>
    </div>
  )
}
