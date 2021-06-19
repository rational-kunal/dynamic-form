import React, { useState } from 'react'

import DynamicForm from 'dynamic-form'

const JSONBlock = ({ type, data, isSchema }) => {
  const className = isSchema
    ? 'card-body rounded text-white bg-dark'
    : 'card-body rounded border'
  return (
    <div className={className}>
      <pre>
        <code>
          {type} = {JSON.stringify(data, null, 2)}
        </code>
      </pre>
    </div>
  )
}

const FormExample = ({ title, schema }) => {
  const [expandedSchema] = useState(() => DynamicForm.schema(schema))
  const [onChangeValue, setOnChangeValue] = useState({})
  const [onSubmitValue, setOnSubmitValue] = useState({})

  return (
    <div className='container'>
      <h4 className='display-4'>{title}</h4>
      <div className='row gy-2'>
        <div className='col-12 col-md-4'>
          <div className='row mb-2'>
            <JSONBlock type='minimal' data={schema} isSchema />
          </div>
          <div className='row'>
            <JSONBlock type='expanded' data={expandedSchema} isSchema />
          </div>
        </div>

        <div className='col-12 col-md-4'>
          <div className='card-body rounded border border-primary'>
            <DynamicForm.Form
              schema={expandedSchema}
              onChange={(value) => setOnChangeValue(value)}
              onSubmit={(value) => setOnSubmitValue(value)}
            />
          </div>
        </div>

        <div className='col-12 col-md-4'>
          <div className='row mb-2'>
            <JSONBlock type='onChange' data={onChangeValue} />
          </div>
          <div className='row'>
            <JSONBlock type='onSubmit' data={onSubmitValue} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormExample
