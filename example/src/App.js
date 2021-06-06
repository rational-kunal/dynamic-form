import React, { useState } from 'react'

import { DynamicForm, DynamicFormType } from 'dynamic-form'
import 'dynamic-form/dist/index.css'

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
    skill: {
      label: 'Skills',
      type: DynamicFormType.repeatable,
      schema: skillSchema
    }
  }

  return (
    <div className='row'>
      <div className='card col border-light'>
        <div className='card-body'>
          <DynamicForm
            schema={schema}
            onSubmit={(newValue) => setValue(newValue)}
          />
        </div>
      </div>
      <div className='card col border-success'>
        <div className='card-body'>
          <pre>
            <code>{JSON.stringify(value, null, 2)}</code>
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
