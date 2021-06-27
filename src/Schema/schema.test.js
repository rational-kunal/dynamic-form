/* eslint-disable no-undef */
import { schema } from './schema'
import { DynamicFormType } from './type'

// TODO: refractor form -> schema || form schema.
test('Expanded string form returns expanded form', () => {
  const stringForm = {
    key: {
      label: 'Name',
      type: DynamicFormType.text,
      placeholder: 'John Doe',
      defaultValue: 'Default Name'
    }
  }

  const expectedExpandedForm = {
    key: {
      label: 'Name',
      type: DynamicFormType.text,
      placeholder: 'John Doe',
      defaultValue: 'Default Name'
    }
  }

  expect(schema(stringForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal string form with default value returns expanded form', () => {
  const stringForm = {
    Name: 'Default Name'
  }

  const expectedExpandedForm = {
    Name: {
      label: 'Name',
      type: DynamicFormType.text,
      defaultValue: 'Default Name'
    }
  }

  expect(schema(stringForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal string form without default value returns expanded form', () => {
  const stringForm = {
    Name: String
  }

  const expectedExpandedForm = {
    Name: {
      label: 'Name',
      type: DynamicFormType.text
    }
  }

  expect(schema(stringForm)).toMatchObject(expectedExpandedForm)
})

test('Expanded number form returns expanded form', () => {
  const numberForm = {
    key: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Age',
      defaultValue: 0
    }
  }

  const expectedExpandedForm = {
    key: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Age',
      defaultValue: 0
    }
  }

  expect(schema(numberForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal number form with default value returns expanded form', () => {
  const numberForm = {
    Age: 21
  }

  const expectedExpandedForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number,
      defaultValue: 21
    }
  }

  expect(schema(numberForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal number form without default value returns expanded form', () => {
  const numberForm = {
    Age: Number
  }

  const expectedExpandedForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number
    }
  }

  expect(schema(numberForm)).toMatchObject(expectedExpandedForm)
})

test('Expanded nested form containing expanded sub-form returns recursively expanded form', () => {
  const nestedForm = {
    formKey: {
      label: 'Personal Information',
      type: DynamicFormType.nested,
      schema: {
        key: {
          label: 'Name',
          type: DynamicFormType.text,
          placeholder: 'John Doe',
          defaultValue: 'Default Name'
        }
      }
    }
  }

  const expectedExpandedForm = {
    formKey: {
      label: 'Personal Information',
      type: DynamicFormType.nested,
      schema: {
        key: {
          label: 'Name',
          type: DynamicFormType.text,
          placeholder: 'John Doe',
          defaultValue: 'Default Name'
        }
      }
    }
  }

  expect(schema(nestedForm)).toMatchObject(expectedExpandedForm)
})

test('Expanded nested form containing minimal sub-form returns recursively expanded form', () => {
  const nestedForm = {
    key: {
      label: 'Personal Information',
      type: DynamicFormType.nested,
      schema: { Name: 'Default Name' }
    }
  }

  const expectedExpandedForm = {
    key: {
      label: 'Personal Information',
      type: DynamicFormType.nested,
      schema: {
        Name: {
          label: 'Name',
          type: DynamicFormType.text,
          defaultValue: 'Default Name'
        }
      }
    }
  }

  expect(schema(nestedForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal nested form containing expanded sub-form returns recursively expanded form', () => {
  const nestedForm = {
    'Personal Information': {
      Name: {
        label: 'Name',
        type: DynamicFormType.text,
        defaultValue: 'Default Name'
      }
    }
  }

  const expectedExpandedForm = {
    'Personal Information': {
      label: 'Personal Information',
      type: DynamicFormType.nested,
      schema: {
        Name: {
          label: 'Name',
          type: DynamicFormType.text,
          defaultValue: 'Default Name'
        }
      }
    }
  }

  expect(schema(nestedForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal nested form containing minimal sub-form returns recursively expanded form', () => {
  const nestedForm = {
    'Personal Information': { Name: 'Default Name' }
  }

  const expectedExpandedForm = {
    'Personal Information': {
      label: 'Personal Information',
      type: DynamicFormType.nested,
      schema: {
        Name: {
          label: 'Name',
          type: DynamicFormType.text,
          defaultValue: 'Default Name'
        }
      }
    }
  }

  expect(schema(nestedForm)).toMatchObject(expectedExpandedForm)
})

test('Expanded repeatable form containing expanded sub-form returns recursively exapnded form', () => {
  const repeatableForm = {
    key: {
      label: 'Users',
      type: DynamicFormType.repeatable,
      schema: {
        phoneNumber: {
          label: 'Phone Number',
          type: DynamicFormType.number
        }
      }
    }
  }

  const expectedExpandedForm = {
    key: {
      label: 'Users',
      type: DynamicFormType.repeatable,
      schema: {
        phoneNumber: {
          label: 'Phone Number',
          type: DynamicFormType.number
        }
      }
    }
  }

  expect(schema(repeatableForm)).toMatchObject(expectedExpandedForm)
})

test('Expanded repeatable form containing minimal sub-form returns recursively exapnded form', () => {
  const repeatableForm = {
    Users: {
      type: DynamicFormType.repeatable,
      schema: { 'Phone Number': Number }
    }
  }

  const expectedExpandedForm = {
    Users: {
      label: 'Users',
      type: DynamicFormType.repeatable,
      schema: {
        'Phone Number': {
          label: 'Phone Number',
          type: DynamicFormType.number
        }
      }
    }
  }

  expect(schema(repeatableForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal repeatable form containing expanded sub-form returns recursively exapnded form', () => {
  const repeatableForm = {
    'Repeated Form': [
      {
        'Phone Number': {
          label: 'Phone Number',
          type: DynamicFormType.number
        }
      }
    ]
  }

  const expectedExpandedForm = {
    'Repeated Form': {
      label: 'Repeated Form',
      type: DynamicFormType.repeatable,
      schema: {
        'Phone Number': {
          label: 'Phone Number',
          type: DynamicFormType.number
        }
      }
    }
  }

  expect(schema(repeatableForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal repeatable form containing minimal sub-form returns recursively exapnded form', () => {
  const repeatableForm = {
    Users: [{ 'Phone Number': Number }]
  }

  const expectedExpandedForm = {
    Users: {
      label: 'Users',
      type: DynamicFormType.repeatable,
      schema: {
        'Phone Number': {
          label: 'Phone Number',
          type: DynamicFormType.number
        }
      }
    }
  }

  expect(schema(repeatableForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal repeatable form containing minimal nested sub-form returns recursively exapnded form', () => {
  const minimalForm = {
    'Reapeated Form': [
      {
        'Nested Form': {
          stringy: 'stringy',
          numbery: Number
        }
      }
    ]
  }

  const expectedExpandedForm = {
    'Reapeated Form': {
      label: 'Reapeated Form',
      type: DynamicFormType.repeatable,
      schema: {
        'Nested Form': {
          label: 'Nested Form',
          type: DynamicFormType.nested,
          schema: {
            stringy: {
              label: 'stringy',
              type: DynamicFormType.text,
              defaultValue: 'stringy'
            },
            numbery: {
              label: 'numbery',
              type: DynamicFormType.number
            }
          }
        }
      }
    }
  }

  expect(schema(minimalForm)).toMatchObject(expectedExpandedForm)
})

test('Minimal nested form containing minimal repeatable sub-form returns recursively exapnded form', () => {
  const minimalForm = {
    'Nested Form': {
      'Reapeated Form': [
        {
          stringy: String,
          numbery: 0
        }
      ]
    }
  }

  const expectedExpandedForm = {
    'Nested Form': {
      label: 'Nested Form',
      type: DynamicFormType.nested,
      schema: {
        'Reapeated Form': {
          label: 'Reapeated Form',
          type: DynamicFormType.repeatable,
          schema: {
            stringy: {
              label: 'stringy',
              type: DynamicFormType.text
            },
            numbery: {
              label: 'numbery',
              type: DynamicFormType.number,
              defaultValue: 0
            }
          }
        }
      }
    }
  }

  expect(schema(minimalForm)).toMatchObject(expectedExpandedForm)
})
