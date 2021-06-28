import React, { useState } from 'react'
import PropTypes from 'prop-types'
import util from '../util'

const TextyFormType = {
  text: 'TextyFormType.text',
  number: 'TextyFormType.number'
}

const INPUT_TYPE_STRING = 'text'
const INPUT_TYPE_NUMBER = 'number'

const ROLE_INPUT_STRING = 'role-input-string'
const ROLE_INPUT_NUMBER = 'role-input-number'

const EMPTY_VALUE = ''

export const StringForm = ({ schema, atKey = null, onChange }) => {
  return (
    <TextyForm
      type={TextyFormType.text}
      schema={schema}
      atKey={atKey}
      onChange={onChange}
    />
  )
}

export const NumberForm = ({ schema, atKey = null, onChange }) => {
  return (
    <TextyForm
      type={TextyFormType.number}
      schema={schema}
      atKey={atKey}
      onChange={onChange}
    />
  )
}

const TextyForm = ({ type, schema, atKey = null, onChange }) => {
  // If default value is not available then use empty string as default value so html will not throw error later.
  const [value, setValue] = useState(() => {
    const providedDefaultValue = schema.defaultValue
    if (util.isUndefinedOrNull(providedDefaultValue)) {
      return EMPTY_VALUE
    }

    let defaultValue = providedDefaultValue
    if (type === TextyFormType.number) {
      defaultValue = util.parseInteger(providedDefaultValue, EMPTY_VALUE)
    }

    onChange({ newValue: defaultValue, key: atKey })
    return defaultValue
  })

  const changeValue = (newValue) => {
    const parsedValue =
      type === TextyFormType.number
        ? util.parseInteger(newValue, value)
        : newValue

    if (parsedValue !== value) {
      setValue(parsedValue)
      if (parsedValue !== undefined)
        onChange({ newValue: parsedValue, key: atKey })
    }
  }

  const formType =
    type === TextyFormType.text ? INPUT_TYPE_STRING : INPUT_TYPE_NUMBER

  const inputType =
    type === TextyFormType.text ? ROLE_INPUT_STRING : ROLE_INPUT_NUMBER

  return (
    <div className='input-group flex-nowrap'>
      <span className='input-group-text'> {schema.label} </span>
      <input
        type={formType}
        role={inputType}
        className='form-control'
        placeholder={schema.placeholder}
        value={value}
        onChange={(e) => changeValue(e.target.value)}
      />
    </div>
  )
}

StringForm.propTypes = {
  schema: PropTypes.object.isRequired,
  atKey: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

NumberForm.propTypes = {
  schema: PropTypes.object.isRequired,
  atKey: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

TextyFormType.propTypes = {
  schema: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  atKey: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
