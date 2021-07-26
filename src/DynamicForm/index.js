import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { DynamicFormSize } from '../Schema'
import util from '../util'
import { NodeForm } from './NodeForm'
import { ROLE_INPUT_DYNAMIC_SUBMIT } from './roles'
import { buttonSizeFromSchemaSize } from './helper/styleHelper'

// TODO: Add overall end to end test for all types of form
// TODO: Add test for keys with large schema.
export const DynamicForm = ({
  schema,
  onChange = () => {},
  onSubmit,
  submitSize = DynamicFormSize.medium
}) => {
  // Value container to store values.
  const valueContainer = useRef({})
  const changeValue = ({ newValue }) => {
    valueContainer.current = newValue

    // Update out function that value is changed.
    if (util.isFunction(onChange)) {
      util.dispatchAsync(() => {
        onChange({ ...valueContainer.current })
      })
    }
  }

  const submitButtonSize = buttonSizeFromSchemaSize(submitSize)
  const className = {
    card: 'd-grid gap-1',
    submitButton: `btn btn-success mx-1 w-auto ${submitButtonSize}`
  }

  let submitButton = null
  if (util.isFunction(onSubmit)) {
    submitButton = (
      <button
        className={className.submitButton}
        role={ROLE_INPUT_DYNAMIC_SUBMIT}
        onClick={() => {
          onSubmit({ ...valueContainer.current })
        }}
      >
        Submit
      </button>
    )
  }

  return (
    <div className={className.card}>
      <NodeForm schema={schema} onChange={changeValue} />
      {submitButton}
    </div>
  )
}

DynamicForm.propTypes = {
  schema: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submitSize: PropTypes.string // TODO: Check only for allowed values.
}
