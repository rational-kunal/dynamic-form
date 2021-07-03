/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { ROLE_INPUT_STRING, ROLE_LABEL_TEXTY } from '../roles'
import { StringForm } from '../TextyForm'

const GET_SIMPLE_STRING_FORM = ({
  label = 'String Form',
  defaultValue = 'Default Value',
  placeholder = 'String',
  key = null,
  onChange = () => {}
}) => {
  return (
    <StringForm
      schema={{ label, defaultValue, placeholder }}
      atKey={key}
      onChange={onChange}
    />
  )
}

test('StringForm with correct props matches snapshot', () => {
  const component = render(GET_SIMPLE_STRING_FORM({}))

  expect(component).toMatchSnapshot()
})

test('StringForm will call onChange correctly if form value changes', () => {
  let value = null
  let key = null
  const component = render(
    GET_SIMPLE_STRING_FORM({
      key: 'KEY',
      onChange: ({ key: k, newValue: x }) => {
        value = x
        key = k
      }
    })
  )

  const input = component.getByRole(ROLE_INPUT_STRING)
  fireEvent.change(input, {
    target: { value: 'New Value' }
  })

  expect(value).toBe('New Value')
  expect(key).toBe('KEY')
})

test('StringForm will reflect changed value', () => {
  const component = render(GET_SIMPLE_STRING_FORM({}))

  const input = component.getByRole(ROLE_INPUT_STRING)
  fireEvent.change(input, {
    target: { value: 'New Value' }
  })

  expect(component.getByDisplayValue('New Value')).toBeInTheDocument(component)
})

test('StringForm with proper label will have label', () => {
  const component = render(GET_SIMPLE_STRING_FORM({ label: 'LABEL' }))

  expect(component.getByText('LABEL')).toBeInTheDocument()
})

test('StringForm with empty label will not have any label', () => {
  const component = render(GET_SIMPLE_STRING_FORM({ label: '' }))

  expect(component.queryByRole(ROLE_LABEL_TEXTY)).toBeNull()
})
