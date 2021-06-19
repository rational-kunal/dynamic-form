/* eslint-disable no-undef */
import { schema } from './schema'
import { DynamicFormType } from './type'

test('Single expanded string form schema', () => {
  const stringForm = {
    formKey: {
      label: 'Name',
      type: DynamicFormType.text,
      placeholder: 'John Doe',
      defaultValue: 'defaultValue'
    }
  }

  const expectedStringForm = {
    formKey: {
      label: 'Name',
      type: DynamicFormType.text,
      placeholder: 'John Doe',
      defaultValue: 'defaultValue'
    }
  }

  expect(schema(stringForm)).toMatchObject(expectedStringForm)
})

test('Single minimal string form with default value schema', () => {
  const stringForm = {
    Name: 'defaultValue'
  }

  const expectedForm = {
    Name: {
      label: 'Name',
      type: DynamicFormType.text,
      defaultValue: 'defaultValue'
    }
  }

  expect(schema(stringForm)).toMatchObject(expectedForm)
})

test('Single minimal string form without default value schema', () => {
  const stringForm = {
    Name: String
  }

  const expectedForm = {
    Name: {
      label: 'Name',
      type: DynamicFormType.text
    }
  }

  expect(schema(stringForm)).toMatchObject(expectedForm)
})

test('Single expanded number form schema', () => {
  const numberForm = {
    formKey: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Age',
      defaultValue: 0
    }
  }

  const expectedNumberForm = {
    formKey: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Age',
      defaultValue: 0
    }
  }

  expect(schema(numberForm)).toMatchObject(expectedNumberForm)
})

test('Single minimal number form with default value schema', () => {
  const numberForm = {
    Age: 21
  }

  const expectedNumberForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number,
      defaultValue: 21
    }
  }

  expect(schema(numberForm)).toMatchObject(expectedNumberForm)
})

test('Single minimal number form without default value schema', () => {
  const numberForm = {
    Age: Number
  }

  const expectedNumberForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number
    }
  }

  expect(schema(numberForm)).toMatchObject(expectedNumberForm)
})

test('Single expanded nested form with expanded sub form schema', () => {
  const stringSubForm = {
    formKey: {
      label: 'Name',
      type: DynamicFormType.text,
      placeholder: 'John Doe',
      defaultValue: 'defaultValue'
    }
  }

  const nestedExpandedForm = {
    formKey: {
      label: 'Nested form',
      type: DynamicFormType.nested,
      schema: { ...stringSubForm }
    }
  }

  const expectedNestedForm = {
    formKey: {
      label: 'Nested form',
      type: DynamicFormType.nested,
      schema: { ...stringSubForm }
    }
  }

  expect(schema(nestedExpandedForm)).toMatchObject(expectedNestedForm)
})

test('Single expanded nested form with minimal sub form schema', () => {
  const stringSubForm = {
    'Nested sub string form': {
      label: 'Nested sub string form',
      type: DynamicFormType.text,
      defaultValue: 'defaultValue'
    }
  }

  const nestedExpandedForm = {
    formKey: {
      label: 'Nested form',
      type: DynamicFormType.nested,
      schema: { 'Nested sub string form': 'defaultValue' }
    }
  }

  const expectedNestedForm = {
    formKey: {
      label: 'Nested form',
      type: DynamicFormType.nested,
      schema: { ...stringSubForm }
    }
  }

  expect(schema(nestedExpandedForm)).toMatchObject(expectedNestedForm)
})

test('Single minimal nested form with expanded sub form schema', () => {
  const stringSubForm = {
    'Nested sub string form': {
      label: 'Nested sub string form',
      type: DynamicFormType.text,
      defaultValue: 'defaultValue'
    }
  }

  const nestedExpandedForm = {
    'Nested Form Label': { ...stringSubForm }
  }

  const expectedNestedForm = {
    'Nested Form Label': {
      label: 'Nested Form Label',
      type: DynamicFormType.nested,
      schema: { ...stringSubForm }
    }
  }

  expect(schema(nestedExpandedForm)).toMatchObject(expectedNestedForm)
})

test('Single minimal nested form with minimal sub form schema', () => {
  const stringSubForm = {
    'Nested sub string form': {
      label: 'Nested sub string form',
      type: DynamicFormType.text,
      defaultValue: 'defaultValue'
    }
  }

  const nestedExpandedForm = {
    'Nested Form Label': { 'Nested sub string form': 'defaultValue' }
  }

  const expectedNestedForm = {
    'Nested Form Label': {
      label: 'Nested Form Label',
      type: DynamicFormType.nested,
      schema: { ...stringSubForm }
    }
  }

  expect(schema(nestedExpandedForm)).toMatchObject(expectedNestedForm)
})

test('Single expanded repeated form with expanded sub form schema', () => {
  const numberSubForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Age',
      defaultValue: 0
    }
  }

  const reapeatedExpandedForm = {
    formKey: {
      label: 'Reapeated form',
      type: DynamicFormType.repeatable,
      schema: { ...numberSubForm }
    }
  }

  const expectedReapeatedForm = {
    formKey: {
      label: 'Reapeated form',
      type: DynamicFormType.repeatable,
      schema: { ...numberSubForm }
    }
  }

  expect(schema(reapeatedExpandedForm)).toMatchObject(expectedReapeatedForm)
})

test('Single expanded repeated form with minimal sub form schema', () => {
  const numberSubForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number
    }
  }

  const reapeatedExpandedForm = {
    formKey: {
      type: DynamicFormType.repeatable,
      schema: { Age: Number }
    }
  }

  const expectedReapeatedForm = {
    formKey: {
      type: DynamicFormType.repeatable,
      schema: { ...numberSubForm }
    }
  }

  expect(schema(reapeatedExpandedForm)).toMatchObject(expectedReapeatedForm)
})

test('Single minimal reapeated form with expanded sub form schema', () => {
  const numberSubForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number,
      placeholder: 'Age',
      defaultValue: 0
    }
  }

  const reapeatedExpandedForm = {
    'Repeated Form': [{ ...numberSubForm }]
  }

  const expectedReapeatedForm = {
    'Repeated Form': {
      label: 'Repeated Form',
      type: DynamicFormType.repeatable,
      schema: { ...numberSubForm }
    }
  }

  expect(schema(reapeatedExpandedForm)).toMatchObject(expectedReapeatedForm)
})

test('Single minimal repeated form with minimal sub form schema', () => {
  const numberSubForm = {
    Age: {
      label: 'Age',
      type: DynamicFormType.number
    }
  }

  const reapeatedExpandedForm = {
    'Repeated Form': [{ Age: Number }]
  }

  const expectedReapeatedForm = {
    'Repeated Form': {
      label: 'Repeated Form',
      type: DynamicFormType.repeatable,
      schema: { ...numberSubForm }
    }
  }

  expect(schema(reapeatedExpandedForm)).toMatchObject(expectedReapeatedForm)
})

test('Single minimial repeated form with minimal nested form', () => {
  expect(
    schema({
      'Reapeated Form': [
        {
          'Nested Form': {
            stringy: 'stringy',
            numbery: Number
          }
        }
      ]
    })
  ).toMatchObject({
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
  })
})

test('Single minimial nested form with minimal reapeated form', () => {
  expect(
    schema({
      'Nested Form': {
        'Reapeated Form': [
          {
            stringy: String,
            numbery: 0
          }
        ]
      }
    })
  ).toMatchObject({
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
  })
})
