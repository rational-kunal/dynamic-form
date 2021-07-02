/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { NestedForm } from '../NestedForm'
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom'
import { DynamicFormType } from '../../Schema'

const ROLE_INPUT_STRING = 'role-input-string'
const ROLE_INPUT_NUMBER = 'role-input-number'
const ROLE_LABEL_NESTED = 'role-label-nested'

test('NestedForm with correct props matches snapshot', () => {
  const component = render(
    <NestedForm
      schema={{
        label: 'Nested Form',
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
      onChange={() => {}}
    />
  )

  expect(component).toMatchSnapshot()
})

test('NestedForm will call onChange correctly if form values are changed', () => {
  let key = null
  let value = null
  const component = render(
    <NestedForm
      schema={{
        label: 'Nested Form',
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
      atKey='KEY'
      onChange={({ key: k, newValue: v }) => {
        key = k
        value = v
      }}
    />
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
  const component = render(
    <NestedForm
      schema={{
        label: 'Nested Form',
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
      atKey='KEY'
      onChange={() => {}}
    />
  )

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
  const component = render(
    <NestedForm
      schema={{
        label: 'LABEL',
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
      onChange={() => {}}
    />
  )

  expect(component.getByText('LABEL')).toBeInTheDocument()
})

test('NestedForm with empty label will not have any label', () => {
  const component = render(
    <NestedForm
      schema={{
        label: '',
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
      onChange={() => {}}
    />
  )

  expect(component.queryByRole(ROLE_LABEL_NESTED)).toBeNull()
})
