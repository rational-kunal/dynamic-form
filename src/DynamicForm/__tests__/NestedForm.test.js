/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { DynamicFormType } from 'Schema'
import { NestedForm } from 'DynamicForm/NestedForm'
import {
  ROLE_INPUT_NUMBER,
  ROLE_INPUT_STRING,
  ROLE_LABEL_NESTED
} from 'DynamicForm/roles'

const GET_SIMPLE_NESTED_FORM = ({
  onChange = () => {},
  key = null,
  label = 'Nested Form'
}) => {
  return (
    <NestedForm
      schema={{
        label: label,
        schema: {
          stringForm: {
            label: 'String Form',
            type: DynamicFormType.text
          },
          numberForm: {
            label: 'Number Form',
            type: DynamicFormType.number
          }
        }
      }}
      atKey={key}
      onChange={onChange}
    />
  )
}

test('NestedForm with correct props matches snapshot', () => {
  const component = render(GET_SIMPLE_NESTED_FORM({}))

  expect(component).toMatchSnapshot()
})

test('NestedForm will call onChange correctly if form values are changed', () => {
  let key = null
  let value = null
  const component = render(
    GET_SIMPLE_NESTED_FORM({
      key: 'KEY',
      onChange: ({ key: k, newValue: v }) => {
        key = k
        value = v
      }
    })
  )

  const numberInput = component.getByRole(ROLE_INPUT_NUMBER)
  const stringInput = component.getByRole(ROLE_INPUT_STRING)

  fireEvent.change(numberInput, {
    target: { value: 1337 }
  })

  fireEvent.change(stringInput, {
    target: { value: 'New Value' }
  })

  expect(key).toBe('KEY')
  expect(value).toMatchObject({
    stringForm: 'New Value',
    numberForm: 1337
  })
})

test('NestedForm will reflect changed value', () => {
  const component = render(GET_SIMPLE_NESTED_FORM({}))

  const numberInput = component.getByRole(ROLE_INPUT_NUMBER)
  const stringInput = component.getByRole(ROLE_INPUT_STRING)

  fireEvent.change(numberInput, {
    target: { value: 1337 }
  })

  fireEvent.change(stringInput, {
    target: { value: 'New Value' }
  })

  expect(component.getByDisplayValue('New Value')).toBeInTheDocument(component)
  expect(component.getByDisplayValue(1337)).toBeInTheDocument(component)
})

test('NestedForm with proper label will have label', () => {
  const component = render(GET_SIMPLE_NESTED_FORM({ label: 'LABEL' }))

  expect(component.getByText('LABEL')).toBeInTheDocument()
})

test('NestedForm with empty label will not have any label', () => {
  const component = render(GET_SIMPLE_NESTED_FORM({ label: '' }))

  expect(component.queryByRole(ROLE_LABEL_NESTED)).toBeNull()
})
