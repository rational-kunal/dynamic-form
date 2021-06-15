import React, { useState } from 'react'

const TextyFormType = {
  text: 'TextyFormType.text',
  number: 'TextyFormType.number'
}

export const StringForm = ({ schema, onChange = () => {} }) => {
  return (
    <TextyForm type={TextyFormType.text} schema={schema} onChange={onChange} />
  )
}

export const NumberForm = ({ schema, onChange = () => {} }) => {
  return (
    <TextyForm
      type={TextyFormType.number}
      schema={schema}
      onChange={onChange}
    />
  )
}

const TextyForm = ({ type, schema, onChange = () => {} }) => {
  // If default value is not availble then use empty string as default value so html will not throw error later.
  const [value, setValue] = useState(() => {
    if (schema.defaultValue !== undefined) {
      onChange(schema.defaultValue)
      return schema.defaultValue
    } else {
      return ''
    }
  })

  const changeValue = (newValue) => {
    const parsedValue =
      type === TextyFormType.number ? parseInt(newValue) : newValue
    setValue(parsedValue)
    if (parsedValue !== undefined) onChange(parsedValue)
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
