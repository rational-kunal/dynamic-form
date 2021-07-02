# dynamic-form

Stateful forms on the fly.

![npm](https://img.shields.io/npm/v/@rational-kunal/dynamic-form?logo=NPM&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rational-kunal/dynamic-form/Node.js%20CI?logo=GitHub&style=for-the-badge)
![npm](https://img.shields.io/npm/dt/@rational-kunal/dynamic-form?logo=NPM&style=for-the-badge)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/rational-kunal/dynamic-form/latest?style=for-the-badge&logo=Git)
![Twitter Follow](https://img.shields.io/twitter/follow/rational_kunal?logo=twitter&style=for-the-badge)

## Install

```bash
npm i @rational-kunal/dynamic-form
```

## Usage

`DynamicForm.Form` creates a beautiful form for a given schema. Schemas should be passed through `DynamicForm.schema` to parse it before passing it to the component. See the schemas section to see how to render the different types of complex forms.

```js
import DynamicForm from 'dynamic-form'

const App = () => {
  const [value, setValue] = useState({})
  const schema = DynamicForm.schema({
    Name: 'John Doe',
    Age: Number
  })

  return (
    <DynamicForm.Form
      schema={schema}
      onChange={(newValue) => setValue(newValue)}
      onSubmit={(newValue) => setValue(newValue)}
    />
  )
}
```

## `DynamicForm.Form`

The core component that will render a form for a given schema.

| Props    | Type     | Note                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------- |
| Schema   | Object   | Schema object parsed by `DynamicForm.schema`                                    |
| onChange | Function | Function that will be executed with changed value when value in form is changes |
| onSubmit | Function | Function that will be executed with final value when submit button is pressed   |

## `DynamicForm.type`

Available form types. This will also control how value will be returned through `onChange` and `onSubmit`.

TODO: Update notes with nature of types.

| Form Types | Note                                           |
| ---------- | ---------------------------------------------- |
| text       | String form that will return `String` value    |
| number     | Number form that will return `Number` value    |
| nested     | Nested form that will return `Object` value    |
| repeatable | Repeatable form that will return `Array` value |

## `DynamicForm.schema`

The function parses minimal schema and converts it into an expanded schema that is understandable by `DynamicForm.Form`. \
For minimal schema, the developer given label will be used as a key to store value for the form. For expanded schema, the developer key will be used as a key to store value for the form. \
Example of schema:

```js
// Minimal schema
const schema = {
  Name: 'John Doe'
}

// Convert minimal, expanded or mixed schema to expanded schema
let expandedSchema = DynamicForm.schema(schema)

// expaded schema for given minimal schema will look like this
expandedSchema = {
  Name: {
    type: 'DynamicFormType.Text',
    label: 'Name',
    defaultValue: 'John Doe'
  }
}
```

See [examples](https://rational-kunal.github.io/dynamic-form) to see schemas is action.

### String schema

```js
// Use this if you just want to create form on the fly.
const stringSchema = {
  '<label>': String || '<Default Value>'
}

// Fine tune some of the aspects.
const stringSchema = {
  '<key>': {
    label: '<label>',
    type: DynamicFormType.text,
    placeholder: '<placeholder>', // Optional
    defaultValue: '' // Optional
  }
}
```

### Number schema

```js
// Use this if you just want to create form on the fly.
const numberSchema = {
  '<label>': Number || '<Default Value>'
}

// Fine tune some of the aspects.
const stringSchema = {
  '<key>': {
    label: '<label>',
    type: DynamicFormType.number,
    placeholder: '<placeholder>', // Optional
    defaultValue: '' // Optional
  }
}
```

### Nested schema

```js
// Use this if you just want to create form on the fly.
const nestedSchema = {
  '<label>': { ... }
}

// Fine tune some of the aspects.
const nestedSchema = {
  '<key>': {
    label: '<label>',
    type: DynamicFormType.nested,
    schema: { ... }
  }
}
```

### Repeated schema

```js
// Use this if you just want to create form on the fly.
const repeatedSchema = {
  '<label>': [{ ... }]
}

// Fine tune some of the aspects.
const repeatedSchema = {
  '<key>': {
    type: DynamicFormType.repeatable,
    schema: { ... }
  }
}
```

## License

MIT © [rational-kunal](https://github.com/rational-kunal)
