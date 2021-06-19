import React from 'react'

import DynamicForm from 'dynamic-form'
import FormExample from './components/FormExample'
import CodeExample from './components/CodeExample'

const formExamples = [
  { title: 'String Form', schema: { Name: 'John Doe' } },
  { title: 'Number Form', schema: { Age: 21 } },
  {
    title: 'Nested Form',
    schema: {
      'Personal Information': {
        Name: 'John Doe',
        Age: 21
      }
    }
  },
  {
    title: 'Reapeted Form',
    schema: {
      Skill: [
        {
          skillName: {
            label: 'Skill',
            type: DynamicForm.type.text,
            placeholder: 'skill'
          },
          skillLevel: {
            label: 'Skill level',
            type: DynamicForm.type.number,
            placeholder: 'level'
          }
        }
      ]
    }
  }
]

const App = () => {
  return (
    <div>
      <div className='mb-4'>
        <CodeExample />
      </div>
      {formExamples.map((ex) => (
        <div className='mb-4'>
          <FormExample key={ex.title} title={ex.title} schema={ex.schema} />
        </div>
      ))}
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
