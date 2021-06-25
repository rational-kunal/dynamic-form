import React, { useState } from 'react'

const TextyFormType = {
  text: 'TextyFormType.text',
  number: 'TextyFormType.number'
}

export const StringForm = ({ schema, atKey = null, onChange = () => {} }) => {
  return (
    <TextyForm
      type={TextyFormType.text}
      schema={schema}
      atKey={atKey}
      onChange={onChange}
    />
  )
}

export const NumberForm = ({ schema, atKey = null, onChange = () => {} }) => {
  return (
    <TextyForm
      type={TextyFormType.number}
      schema={schema}
      atKey={atKey}
      onChange={onChange}
    />
  )
}

const TextyForm = ({ type, schema, atKey = null, onChange = () => {} }) => {
  // If default value is not availble then use empty string as default value so html will not throw error later.
  const [value, setValue] = useState(() => {
    if (schema.defaultValue !== undefined) {
      onChange({ newValue: schema.defaultValue, key: atKey })
      return schema.defaultValue
    } else {
      return ''
    }
  })

  const changeValue = (newValue) => {
    const parsedValue =
      type === TextyFormType.number ? parseInt(newValue) : newValue
    setValue(parsedValue)
    if (parsedValue !== undefined)
      onChange({ newValue: parsedValue, key: atKey })
  }

  return (
    <div className='input-group flex-nowrap'>
      <span className='input-group-text'> {schema.label} </span>
      <input
        type={type === TextyFormType.text ? 'text' : 'number'}
        className='form-control'
        placeholder={schema.placeholder}
        value={value}
        onChange={(e) => changeValue(e.target.value)}
      />
    </div>
  )
}
