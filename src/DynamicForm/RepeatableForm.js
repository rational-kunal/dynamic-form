import React, { useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { NodeForm } from './NodeForm'
import util from '../util'

const ROLE_ADD_FORM = 'role-add-form'
const ROLE_LABEL_REPEATABLE = 'role-label-repeatable'

let keyIndex = 0
const _RepeatableForm = ({ schema, atKey = null, onChange }) => {
  const [forms, setForms] = useState([])
  // Value container to store values.
  const valueContainer = useRef({})
  // Constant key prefix for children.
  const keyPrefixContainer = useRef(util.uniqueKey())
  const keyPrefix = keyPrefixContainer.current

  // Changes value for given key in `valueContainer` and passes the information to parent
  const changeValueForKey = useCallback(({ key, newValue }) => {
    valueContainer.current[key] = newValue
    onChange({ key: atKey, newValue: Object.values(valueContainer.current) })
  }, [])

  // Removes value for given key in `valueContainer` and passes the information to parent. Removes reference to associated component as well.
  const removeFormWithValueForKey = useCallback(({ key }) => {
    delete valueContainer.current[key]
    onChange({ key: atKey, newValue: Object.values(valueContainer.current) })

    setForms((oldForms) => {
      return oldForms.filter((x) => x.key !== key)
    })
  }, [])

  const addForm = () => {
    const newKey = `${keyPrefix + schema.label}_${keyIndex++}`
    setForms([
      ...forms,
      <NodeForm
        key={newKey}
        atKey={newKey}
        schema={schema.schema}
        onChange={changeValueForKey}
        onDelete={removeFormWithValueForKey}
      />
    ])
  }

  // TODO: Add icon to delete button
  return (
    <div className='card border-secondary'>
      {schema.label && (
        <div className='card-header' role={ROLE_LABEL_REPEATABLE}>
          {schema.label}
        </div>
      )}
      <div className='card-body p-1'>
        {forms}
        <div className='d-grid'>
          <button
            className='btn btn-outline-secondary mx-1 w-auto'
            role={ROLE_ADD_FORM}
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

_RepeatableForm.propTypes = {
  schema: PropTypes.object.isRequired,
  atKey: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export const RepeatableForm = React.memo(_RepeatableForm)
