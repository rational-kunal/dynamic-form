import React from 'react'

// TODO: Add hooks examples
const code = `// CODE EXAMPLE  
import DynamicForm from '@rational-kunal/dynamic-form'

const NameForm = () => {
    const schema = DynamicForm.schema({
        "Name": String
    })

    return <DynamicForm schema={schema} />
}
`

const CodeExample = () => {
  return (
    <div className='card-body rounded text-white bg-dark'>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeExample
