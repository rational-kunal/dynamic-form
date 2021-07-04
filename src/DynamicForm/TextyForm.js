import PropTypes from 'prop-types'
import React, { useState } from 'react'
import util from '../util'
import {
  ROLE_INPUT_NUMBER,
  ROLE_INPUT_PASSWORD,
  ROLE_INPUT_STRING,
  ROLE_LABEL_TEXTY
} from './roles'

const TextyFormType = {
  text: 'text',
  number: 'number',
  password: 'password'
}

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

export const PasswordForm = ({ schema, atKey = null, onChange }) => {
  return (
    <TextyForm
      type={TextyFormType.password}
      schema={schema}
      atKey={atKey}
      onChange={onChange}
    />
  )
}

const inputRoleFromType = (type) => {
  if (type === TextyFormType.text) return ROLE_INPUT_STRING
  if (type === TextyFormType.number) return ROLE_INPUT_NUMBER
  if (type === TextyFormType.password) return ROLE_INPUT_PASSWORD
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
    // For number form if value is not parsable it will have previous form value.
    // This means form value will not change for user if he tries to add string in Number Form.
    let parsedValue =
      type === TextyFormType.number
        ? util.parseInteger(newValue, value)
        : newValue

    // Number type can have empty string as a value.
    parsedValue = newValue === EMPTY_VALUE ? EMPTY_VALUE : parsedValue

    if (parsedValue !== value) {
      setValue(parsedValue)
      if (parsedValue !== undefined)
        onChange({ newValue: parsedValue, key: atKey })
    }
  }

  return (
    <div className='input-group flex-nowrap'>
      {schema.label && (
        <span className='input-group-text' role={ROLE_LABEL_TEXTY}>
          {schema.label}
        </span>
      )}

      <input
        type={type}
        role={inputRoleFromType(type)}
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
