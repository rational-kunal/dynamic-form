import React from 'react'

import { NodeForm } from './NodeForm'
import util from '../util'

export const NestedForm = ({ schema, onChange = () => {} }) => {
  const changeValue = (newValue) => {
    if (util.isFunction(onChange)) {
      onChange(newValue)
    }
  }

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
