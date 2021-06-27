/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { RepeatableForm } from '../RepeatableForm'
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { DynamicFormType } from '../../Schema'

const ROLE_ADD_FORM = 'role-add-form'
const ROLE_COMPONENT_NODE = 'component-node'
const ROLE_INPUT_NODE_DELETE = 'input-node-delete'
const ROLE_INPUT_STRING = 'role-input-string'
const ROLE_INPUT_NUMBER = 'role-input-number'

const GET_SIMPLE_REPEATABLE_FORM = ({ onChange = () => {}, key = null }) => {
  return (
    <RepeatableForm
      label='Repeatable Form'
      atKey={key}
      schema={{
        label: 'Repeatable Form',
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
