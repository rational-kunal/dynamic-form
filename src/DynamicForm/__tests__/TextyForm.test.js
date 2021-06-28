/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { NumberForm, StringForm } from '../TextyForm'

const ROLE_INPUT_STRING = 'role-input-string'
const ROLE_INPUT_NUMBER = 'role-input-number'

test('NumberForm with correct props matches snapshot', () => {
  const component = render(
    <NumberForm
      schema={{ label: 'Number Form', defaultValue: 0, placeholder: 'Number' }}
      onChange={() => {}}
    />
  )

  expect(component).toMatchSnapshot()
})

test('NumberForm will call onChange correctly if form value changes', () => {
  let value = null
  let key = null
  const component = render(
    <NumberForm
      schema={{ label: 'Number Form', defaultValue: 0, placeholder: 'Number' }}
      atKey='KEY'
      onChange={({ key: k, newValue: x }) => {
        value = x
        key = k
      }}
    />
  )

  const input = component.getByRole(ROLE_INPUT_NUMBER)
  fireEvent.change(input, {
    target: { value: 1 }
  })

  expect(value).toBe(1)
  expect(key).toBe('KEY')
})

test('NumberForm will reflect changed value', () => {
  const component = render(
    <NumberForm
      schema={{ label: 'Number Form', defaultValue: 0, placeholder: 'Number' }}
      onChange={() => {}}
    />
  )

  const input = component.getByRole(ROLE_INPUT_NUMBER)
  fireEvent.change(input, {
    target: { value: 1337 }
  })

  expect(component.getByDisplayValue('1337')).toBeInTheDocument(component)
})

test('NumberForm will not have default value if passed default value is not parsable as a number', () => {
  const component = render(
    <NumberForm
      schema={{
        label: 'Number Form',
        defaultValue: 'xyz',
        placeholder: 'Number'
      }}
      onChange={() => {}}
    />
  )

  expect(component.queryByDisplayValue('xyz')).toBeNull()
})

test('NumberForm will not change value if new value is not parsable as a number', () => {
  const component = render(
    <NumberForm
      schema={{
        label: 'Number Form',
        defaultValue: '0',
        placeholder: 'Number'
      }}
      onChange={() => {}}
    />
  )

  const input = component.getByRole(ROLE_INPUT_NUMBER)
  fireEvent.change(input, {
    target: { value: 'xyz' }
  })

  expect(component.queryByDisplayValue('xyz')).toBeNull()
})

test('StringForm with correct props matches snapshot', () => {
  const component = render(
    <StringForm
      schema={{
        label: 'String Form',
        defaultValue: 'Default Value',
        placeholder: 'String'
      }}
      onChange={() => {}}
    />
  )

  expect(component).toMatchSnapshot()
})

test('StringForm will call onChange correctly if form value changes', () => {
  let value = null
  let key = null
  const component = render(
    <StringForm
      schema={{
        label: 'Number Form',
        defaultValue: 'Default Value',
        placeholder: 'String'
      }}
      atKey='KEY'
      onChange={({ key: k, newValue: x }) => {
        value = x
        key = k
      }}
    />
  )

  const input = component.getByRole(ROLE_INPUT_STRING)
  fireEvent.change(input, {
    target: { value: 'New Value' }
  })

  expect(value).toBe('New Value')
  expect(key).toBe('KEY')
})

test('StringForm will reflect changed value', () => {
  const component = render(
    <StringForm
      schema={{
        label: 'String Form',
        defaultValue: 'Default Value',
        placeholder: 'String'
      }}
      onChange={() => {}}
    />
  )

  const input = component.getByRole(ROLE_INPUT_STRING)
  fireEvent.change(input, {
    target: { value: 'New Value' }
  })

  expect(component.getByDisplayValue('New Value')).toBeInTheDocument(component)
})
