import React, { useState } from 'react'

import DynamicForm from 'dynamic-form'

const App = () => {
  const [value, setValue] = useState({})
  const personalSchema = {
    presonalName: {
      label: 'Name',
      type: DynamicForm.type.text,
      placeholder: 'Full name'
    },
    personalEmail: {
      label: 'Email',
      type: DynamicForm.type.text,
      placeholder: 'Email address'
    },
    age: {
      label: 'Age',
      type: DynamicForm.type.number,
      placeholder: 'Age'
    }
  }

  const skillSchema = {
    skillName: {
      label: 'Skill',
      type: DynamicForm.type.text,
      placeholder: 'Skill'
    },
    skillLevel: {
      label: 'Skill lavel',
      type: DynamicForm.type.number,
      defaultValue: 0
    }
  }

  const schema = {
    personal: {
      label: 'Personal information',
      type: DynamicForm.type.nested,
      schema: personalSchema
    },
    skills: {
      label: 'Skills',
      type: DynamicForm.type.repeatable,
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
          <DynamicForm.Form
            schema={DynamicForm.schema(schema)}
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
