/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { DynamicFormSize } from 'Schema'
import { ROLE_INPUT_NUMBER, ROLE_LABEL_TEXTY } from 'DynamicForm/roles'
import { NumberForm } from 'DynamicForm/TextyForm'

const GET_SIMPLE_NUMBER_FORM = ({
  label = 'Number Form',
  defaultValue = 0,
  placeholder = 'Number',
  key = null,
  size = DynamicFormSize.medium,
  onChange = () => {}
}) => {
  return (
    <NumberForm
      schema={{ label, defaultValue, placeholder, size }}
      atKey={key}
      onChange={onChange}
    />
  )
}

test('NumberForm with correct props matches snapshot', () => {
  const component = render(GET_SIMPLE_NUMBER_FORM({}))

  expect(component).toMatchSnapshot()
})

test('NumberForm will call onChange correctly if form value changes', () => {
  let value = null
  let key = null
  const component = render(
    GET_SIMPLE_NUMBER_FORM({
      key: 'KEY',
      onChange: ({ key: k, newValue: x }) => {
        value = x
        key = k
      }
    })
  )

  const input = component.getByRole(ROLE_INPUT_NUMBER)
  fireEvent.change(input, {
    target: { value: 1 }
  })

  expect(value).toBe(1)
  expect(key).toBe('KEY')
})

test('NumberForm will reflect changed value', () => {
  const component = render(GET_SIMPLE_NUMBER_FORM({}))

  const input = component.getByRole(ROLE_INPUT_NUMBER)
  fireEvent.change(input, {
    target: { value: 1337 }
  })

  expect(component.getByDisplayValue('1337')).toBeInTheDocument(component)
})

test('NumberForm will not have default value if passed default value is not parsable as a number', () => {
  const component = render(GET_SIMPLE_NUMBER_FORM({ defaultValue: 'xyz' }))

  expect(component.queryByDisplayValue('xyz')).toBeNull()
})

test('NumberForm will not change value if new value is not parsable as a number', () => {
  const component = render(GET_SIMPLE_NUMBER_FORM({}))

  const input = component.getByRole(ROLE_INPUT_NUMBER)
  fireEvent.change(input, {
    target: { value: 'xyz' }
  })

  expect(component.queryByDisplayValue('xyz')).toBeNull()
})

test('NumberForm can change value to empty string', () => {
  let value = null
  const component = render(
    GET_SIMPLE_NUMBER_FORM({
      onChange: ({ newValue }) => {
        value = newValue
      }
    })
  )

  const input = component.getByRole(ROLE_INPUT_NUMBER)
  fireEvent.change(input, {
    target: { value: '' }
  })

  expect(component.queryByDisplayValue('0')).toBeNull()
  expect(value).toBe('')
})

test('NumberForm with proper label will have label', () => {
  const component = render(GET_SIMPLE_NUMBER_FORM({ label: 'LABEL' }))

  expect(component.getByText('LABEL')).toBeInTheDocument()
})

test('NumberForm with empty label will not have any label', () => {
  const component = render(GET_SIMPLE_NUMBER_FORM({ label: '' }))

  expect(component.queryByRole(ROLE_LABEL_TEXTY)).toBeNull()
})

describe('NumberForm size is', () => {
  test('small if small schema size is passed', () => {
    const component = render(
      GET_SIMPLE_NUMBER_FORM({ size: DynamicFormSize.small })
    )

    const input = component.getByRole(ROLE_INPUT_NUMBER)
    expect(input.classList).toContain('form-control-sm')
    expect(component.container.firstChild.classList).toContain('input-group-sm')
  })

  test('medium if medium schema size is passed', () => {
    const component = render(
      GET_SIMPLE_NUMBER_FORM({ size: DynamicFormSize.medium })
    )

    const input = component.getByRole(ROLE_INPUT_NUMBER)
    expect(input.classList).toContain('form-control-md')
    expect(component.container.firstChild.classList).toContain('input-group-md')
  })

  test('medium if no schema size is passed', () => {
    const component = render(GET_SIMPLE_NUMBER_FORM({ size: undefined }))

    const input = component.getByRole(ROLE_INPUT_NUMBER)
    expect(input.classList).toContain('form-control-md')
    expect(component.container.firstChild.classList).toContain('input-group-md')
  })

  test('large if large schema size is passed', () => {
    const component = render(
      GET_SIMPLE_NUMBER_FORM({ size: DynamicFormSize.large })
    )

    const input = component.getByRole(ROLE_INPUT_NUMBER)
    expect(input.classList).toContain('form-control-lg')
    expect(component.container.firstChild.classList).toContain('input-group-lg')
  })
})
