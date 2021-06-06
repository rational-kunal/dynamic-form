import React from 'react'

import { DynamicForm, DynamicFormType } from 'dynamic-form'
import 'dynamic-form/dist/index.css'

const App = () => {
  const unitSchema = {
    age: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Your age',
      defaultValue: 0
    },
    name: {
      label: 'Full name',
      type: DynamicFormType.text,
      placeholder: 'Some full name'
    }
  }

  const repeatableSchema = {
    form: {
      label: 'Form name',
      type: DynamicFormType.text,
      placeholder: 'Form name'
    },
    nestedUser: {
      label: 'Nested User',
      type: DynamicFormType.nested,
      schema: unitSchema
    },
    users: {
      label: 'Users',
      type: DynamicFormType.repeatable,
      schema: unitSchema
    }
  }
  return <DynamicForm schema={repeatableSchema} />
}

export default App
