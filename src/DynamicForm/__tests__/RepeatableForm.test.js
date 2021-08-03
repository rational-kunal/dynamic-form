/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { DynamicFormSize, DynamicFormType } from '../../Schema'
import { RepeatableForm } from '../RepeatableForm'
import {
  ROLE_ADD_FORM,
  ROLE_COMPONENT_NODE,
  ROLE_INPUT_NODE_DELETE,
  ROLE_INPUT_NUMBER,
  ROLE_INPUT_STRING,
  ROLE_LABEL_REPEATABLE
} from '../roles'

const GET_SIMPLE_REPEATABLE_FORM = ({
  onChange = () => {},
  key = null,
  label = 'Repeatable Form',
  size = DynamicFormSize.medium
}) => {
  return (
    <RepeatableForm
      atKey={key}
      schema={{
        label,
        size,
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
      onChange={onChange}
    />
  )
}

test('RepeatableForm with correct props matches base snapshot', () => {
  const component = render(GET_SIMPLE_REPEATABLE_FORM({}))

  expect(component).toMatchSnapshot()
})

test('RepeatableForm with correct props matches base +2 sub form snapshot', () => {
  const component = render(GET_SIMPLE_REPEATABLE_FORM({}))

  const addFormInput = component.getByRole(ROLE_ADD_FORM)
  fireEvent.click(addFormInput)
  fireEvent.click(addFormInput)

  expect(component).toMatchSnapshot()
})

test('RepeatableForm add operations increases number of sub forms', () => {
  const component = render(GET_SIMPLE_REPEATABLE_FORM({}))

  const addFormInput = component.getByRole(ROLE_ADD_FORM)

  // No node forms are present.
  expect(component.queryAllByRole(ROLE_COMPONENT_NODE).length).toBe(0)

  // On add fom event one Node Form will be available.
  fireEvent.click(addFormInput)
  expect(component.getAllByRole(ROLE_COMPONENT_NODE).length).toBe(1)

  // On add fom event one Node Form will be available.
  fireEvent.click(addFormInput)
  expect(component.getAllByRole(ROLE_COMPONENT_NODE).length).toBe(2)
})

test('RepeatableForm delete operations decreases number of sub forms', () => {
  const component = render(GET_SIMPLE_REPEATABLE_FORM({}))

  const addFormInput = component.getByRole(ROLE_ADD_FORM)

  // Add some sub-forms
  fireEvent.click(addFormInput)
  fireEvent.click(addFormInput)
  expect(component.getAllByRole(ROLE_COMPONENT_NODE).length).toBe(2)

  const deleteFormInputs = component.getAllByRole(ROLE_INPUT_NODE_DELETE)

  // Delete first form
  fireEvent.click(deleteFormInputs[0])
  expect(component.getAllByRole(ROLE_COMPONENT_NODE).length).toBe(1)

  // Delete second (i.e. last) form
  fireEvent.click(deleteFormInputs[1])
  expect(component.queryAllByRole(ROLE_COMPONENT_NODE).length).toBe(0)
})

test('RepeatableForm will call onChange correctly if form value changes', () => {
  let value = null
  let key = null
  const component = render(
    GET_SIMPLE_REPEATABLE_FORM({
      key: 'KEY',
      onChange: ({ key: k, newValue: v }) => {
        key = k
        value = v
      }
    })
  )

  // Add sub-form
  const addFormInput = component.getByRole(ROLE_ADD_FORM)
  fireEvent.click(addFormInput)

  const numberInput = component.getByRole(ROLE_INPUT_NUMBER)
  const stringInput = component.getByRole(ROLE_INPUT_STRING)

  fireEvent.change(numberInput, {
    target: { value: 1337 }
  })

  fireEvent.change(stringInput, {
    target: { value: 'New Value' }
  })

  expect(key).toBe('KEY')
  expect(value).toMatchObject([
    {
      stringForm: 'New Value',
      numberForm: 1337
    }
  ])
})

test('RepeatableForm will reflect changed value', () => {
  const component = render(GET_SIMPLE_REPEATABLE_FORM({}))

  // Add sub-form
  const addFormInput = component.getByRole(ROLE_ADD_FORM)
  fireEvent.click(addFormInput)

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

test('RepeatableForm with proper label will have label', () => {
  const component = render(GET_SIMPLE_REPEATABLE_FORM({ label: 'LABEL' }))

  expect(component.getByText('LABEL')).toBeInTheDocument()
})

test('RepeatableForm with empty label will not have any label', () => {
  const component = render(GET_SIMPLE_REPEATABLE_FORM({ label: '' }))

  expect(component.queryByRole(ROLE_LABEL_REPEATABLE)).toBeNull()
})

describe('RepeatableForm size is', () => {
  test('small if small schema size is passed', () => {
    const component = render(
      GET_SIMPLE_REPEATABLE_FORM({ size: DynamicFormSize.small })
    )

    // Add sub-form
    const addFormInput = component.getByRole(ROLE_ADD_FORM)
    fireEvent.click(addFormInput)

    const deleteFormInput = component.getByRole(ROLE_INPUT_NODE_DELETE)

    expect(addFormInput.classList).toContain('btn-sm')
    expect(deleteFormInput.classList).toContain('btn-sm')
  })

  test('medium if medium schema size is passed', () => {
    const component = render(
      GET_SIMPLE_REPEATABLE_FORM({ size: DynamicFormSize.medium })
    )

    // Add sub-form
    const addFormInput = component.getByRole(ROLE_ADD_FORM)
    fireEvent.click(addFormInput)

    const deleteFormInput = component.getByRole(ROLE_INPUT_NODE_DELETE)

    expect(addFormInput.classList).toContain('btn-md')
    expect(deleteFormInput.classList).toContain('btn-md')
  })

  test('medium if no schema size is passed', () => {
    const component = render(GET_SIMPLE_REPEATABLE_FORM({ size: undefined }))

    // Add sub-form
    const addFormInput = component.getByRole(ROLE_ADD_FORM)
    fireEvent.click(addFormInput)

    const deleteFormInput = component.getByRole(ROLE_INPUT_NODE_DELETE)

    expect(addFormInput.classList).toContain('btn-md')
    expect(deleteFormInput.classList).toContain('btn-md')
  })

  test('large if large schema size is passed', () => {
    const component = render(
      GET_SIMPLE_REPEATABLE_FORM({ size: DynamicFormSize.large })
    )

    // Add sub-form
    const addFormInput = component.getByRole(ROLE_ADD_FORM)
    fireEvent.click(addFormInput)

    const deleteFormInput = component.getByRole(ROLE_INPUT_NODE_DELETE)

    expect(addFormInput.classList).toContain('btn-lg')
    expect(deleteFormInput.classList).toContain('btn-lg')
  })
})
