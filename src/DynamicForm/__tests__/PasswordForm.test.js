/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { ROLE_INPUT_PASSWORD, ROLE_LABEL_TEXTY } from 'DynamicForm/roles'
import { PasswordForm } from 'DynamicForm/TextyForm'

const GET_SIMPLE_PASSWORD_FORM = ({
  label = 'Password Form',
  placeholder = 'Password',
  key = null,
  onChange = () => {}
}) => {
  return (
    <PasswordForm
      schema={{ label, placeholder }}
      atKey={key}
      onChange={onChange}
    />
  )
}

test('PasswordForm with correct props matches snapshot', () => {
  const component = render(GET_SIMPLE_PASSWORD_FORM({}))

  expect(component).toMatchSnapshot()
})

test('PasswordForm will call onChange correctly if form value changes', () => {
  let value = null
  let key = null
  const component = render(
    GET_SIMPLE_PASSWORD_FORM({
      key: 'KEY',
      onChange: ({ key: k, newValue: x }) => {
        value = x
        key = k
      }
    })
  )

  const input = component.getByRole(ROLE_INPUT_PASSWORD)
  fireEvent.change(input, {
    target: { value: 'New Value' }
  })

  expect(value).toBe('New Value')
  expect(key).toBe('KEY')
})

test('PasswordForm will reflect changed value', () => {
  const component = render(GET_SIMPLE_PASSWORD_FORM({}))

  const input = component.getByRole(ROLE_INPUT_PASSWORD)
  fireEvent.change(input, {
    target: { value: 'New Value' }
  })

  expect(component.getByDisplayValue('New Value')).toBeInTheDocument(component)
})

test('PasswordForm with proper label will have label', () => {
  const component = render(GET_SIMPLE_PASSWORD_FORM({ label: 'LABEL' }))

  expect(component.getByText('LABEL')).toBeInTheDocument()
})

test('PasswordForm with empty label will not have any label', () => {
  const component = render(GET_SIMPLE_PASSWORD_FORM({ label: '' }))

  expect(component.queryByRole(ROLE_LABEL_TEXTY)).toBeNull()
})
