/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { DynamicFormSize } from 'Schema'
import { ROLE_INPUT_STRING, ROLE_LABEL_TEXTY } from 'DynamicForm/roles'
import { StringForm } from 'DynamicForm/TextyForm'

const GET_SIMPLE_STRING_FORM = ({
  label = 'String Form',
  defaultValue = 'Default Value',
  placeholder = 'String',
  key = null,
  size = DynamicFormSize.medium,
  onChange = () => {}
}) => {
  return (
    <StringForm
      schema={{ label, defaultValue, placeholder, size }}
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

describe('StringForm size is', () => {
  test('small if small schema size is passed', () => {
    const component = render(
      GET_SIMPLE_STRING_FORM({ size: DynamicFormSize.small })
    )

    const input = component.getByRole(ROLE_INPUT_STRING)
    expect(input.classList).toContain('form-control-sm')
    expect(component.container.firstChild.classList).toContain('input-group-sm')
  })

  test('medium if medium schema size is passed', () => {
    const component = render(
      GET_SIMPLE_STRING_FORM({ size: DynamicFormSize.medium })
    )

    const input = component.getByRole(ROLE_INPUT_STRING)
    expect(input.classList).toContain('form-control-md')
    expect(component.container.firstChild.classList).toContain('input-group-md')
  })

  test('medium if no schema size is passed', () => {
    const component = render(GET_SIMPLE_STRING_FORM({ size: undefined }))

    const input = component.getByRole(ROLE_INPUT_STRING)
    expect(input.classList).toContain('form-control-md')
    expect(component.container.firstChild.classList).toContain('input-group-md')
  })

  test('large if large schema size is passed', () => {
    const component = render(
      GET_SIMPLE_STRING_FORM({ size: DynamicFormSize.large })
    )

    const input = component.getByRole(ROLE_INPUT_STRING)
    expect(input.classList).toContain('form-control-lg')
    expect(component.container.firstChild.classList).toContain('input-group-lg')
  })
})
