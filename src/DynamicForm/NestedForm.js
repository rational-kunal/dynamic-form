import React from 'react'
import PropTypes from 'prop-types'

import { NodeForm } from './NodeForm'

const ROLE_LABEL_NESTED = 'role-label-nested'

const _NestedForm = ({ schema, atKey = null, onChange }) => {
  const changeValue = ({ newValue }) => {
    onChange({ newValue, key: atKey })
  }

  // TODO: Add icon to delete button
  return (
    <div className='card border-info'>
      {schema.label && (
        <div className='card-header' role={ROLE_LABEL_NESTED}>
          {schema.label}
        </div>
      )}
      <div className='card-body p-1 d-grid gap-1'>
        <NodeForm schema={schema.schema} onChange={changeValue} />
      </div>
    </div>
  )
}

_NestedForm.propTypes = {
  schema: PropTypes.object.isRequired,
  atKey: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export const NestedForm = React.memo(_NestedForm)
