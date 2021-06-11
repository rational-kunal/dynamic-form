import React, { useState } from 'react'

import { DynamicForm, DynamicFormType } from 'dynamic-form'

const App = () => {
  const [value, setValue] = useState({})
  const personalSchema = {
    presonalName: {
      label: 'Name',
      type: DynamicFormType.text,
      placeholder: 'Full name'
    },
    personalEmail: {
      label: 'Email',
      type: DynamicFormType.text,
      placeholder: 'Email address'
    },
    age: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Age'
    }
  }

  const skillSchema = {
    skillName: {
      label: 'Skill',
      type: DynamicFormType.text,
      placeholder: 'Skill'
    },
    skillLevel: {
      label: 'Skill lavel',
      type: DynamicFormType.number,
      defaultValue: 0
    }
  }

  const schema = {
    personal: {
      label: 'Personal information',
      type: DynamicFormType.nested,
      schema: personalSchema
    },
    skills: {
      label: 'Skills',
      type: DynamicFormType.repeatable,
      schema: skillSchema
    }
  }

  return (
    <div className='card border-light'>
      <div className='row card-body'>
        <div className='col p-1'>
          <div className='rounded text-white-50 bg-dark p-2'>
            <pre>
              <code>schema = {JSON.stringify(schema, null, 2)}</code>
            </pre>
          </div>
        </div>
        <div className='col'>
          <DynamicForm
            schema={schema}
            onChange={(newValue) => setValue(newValue)}
          />
        </div>
        <div className='col p-1'>
          <pre>
            <code className='fw-bold'>
              onChange = {JSON.stringify(value, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

const AppWrapper = () => {
  return (
    <div className='container my-4'>
      <App />
    </div>
  )
}

export default AppWrapper
