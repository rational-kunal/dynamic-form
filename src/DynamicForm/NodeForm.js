import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import { DynamicFormType } from '../Schema'
import { StringForm, NumberForm } from './TextyForm'
import { ReapeatableForm } from './RepeatableForm'
import { NestedForm } from './NestedForm'
import util from '../util'

const ROLE_COMPONENT_NODE = 'component-node'
const ROLE_INPUT_NODE_DELETE = 'input-node-delete'

// TODO: Add tests
// TODO: On hover add border
const _NodeForm = ({ schema, atKey = null, onChange = () => {}, onDelete }) => {
  // Value container to store values.
  const valueContainer = useRef({})
  // Constant key prefix for children.
  const keyPrefixContainer = useRef(util.uniqueKey())
  const keyPrefix = keyPrefixContainer.current

  const changeValue = useCallback(({ key, newValue }) => {
    const value = valueContainer.current
    value[key] = newValue

    onChange({ newValue: { ...value }, key: atKey })
  }, [])

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
        atKey={key}
        schema={schemaForKey}
        onChange={changeValue}
      />
    )
  }

  let deleteButton
  if (util.isFunction(onDelete)) {
    deleteButton = (
      <button
        className='btn btn-outline-danger w-20'
        role={ROLE_INPUT_NODE_DELETE}
        onClick={() => onDelete({ key: atKey })}
      >
        Delete
      </button>
    )
  }

  return (
    <div role={ROLE_COMPONENT_NODE} className='card border-light'>
      <div className='card-body p-1 d-grid gap-1'>
        {forms}
        {deleteButton}
      </div>
    </div>
  )
}

_NodeForm.propTypes = {
  schema: PropTypes.object.isRequired,
  atKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func
}

export const NodeForm = React.memo(_NodeForm)
