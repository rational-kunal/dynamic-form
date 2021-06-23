import React from 'react'

import { NodeForm } from './NodeForm'
import util from '../util'

const _NestedForm = ({ schema, atKey = null, onChange = () => {} }) => {
  const changeValue = ({ newValue }) => {
    if (util.isFunction(onChange)) {
      onChange({ newValue, key: atKey })
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
export const NestedForm = React.memo(_NestedForm)
