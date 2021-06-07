import React, { useEffect, useState } from 'react'

const TextyFormType = {
  text: 'TextyFormType.text',
  number: 'TextyFormType.number'
}

export const StringForm = ({ schema, onChange = () => {} }) => {
  return (
    <TextyForm type={TextyFormType.text} schema={schema} onChange={onChange} />
  )
}

export const NumberForm = ({ schema, onChange }) => {
  return (
    <TextyForm
      type={TextyFormType.number}
      schema={schema}
      onChange={onChange}
    />
  )
}

const TextyForm = ({ type, schema, onChange }) => {
  const [value, setValue] = useState(schema.defaultValue)

  useEffect(() => {
    if (value !== undefined) onChange(value)
  }, [value])

  return (
    <div className='input-group flex-nowrap'>
      <span className='input-group-text'> {schema.label} </span>
      <input
        type={type === TextyFormType.text ? 'text' : 'number'}
        className='form-control'
        placeholder={schema.placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        aria-label='Username'
        aria-describedby='addon-wrapping'
      />
    </div>
  )
}
