/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DynamicForm } from '../index'
import { DynamicFormType } from '../../Schema'

const ROLE_INPUT_STRING = 'role-input-string'
const ROLE_INPUT_DYNAMIC_SUBMIT = 'input-dynamic-submit'

test('DynamicForm with correct props matches snapshot', () => {
  const component = render(
    <DynamicForm
      schema={{
        stringForm: {
          label: 'String Form',
          type: DynamicFormType.text
        }
      }}
      onChange={() => {}}
      onSubmit={() => {}}
    />
  )

  expect(component).toMatchSnapshot()
})

test('DynamicForm will call onChange correctly if form values are changed', (done) => {
  const component = render(
    <DynamicForm
      schema={{
        stringForm: {
          label: 'String Form',
          type: DynamicFormType.text
        }
      }}
      onChange={(v) => {
        expect(v).toMatchObject({
          stringForm: 'New Value'
        })
        done()
      }}
    />
  )

  const stringInput = component.getByRole(ROLE_INPUT_STRING)

  fireEvent.change(stringInput, {
    target: { value: 'New Value' }
  })
})

test('DynamicForm will call onSubmit correctly if submit is tapped', (done) => {
  const component = render(
    <DynamicForm
      schema={{
        stringForm: {
          label: 'String Form',
          type: DynamicFormType.text
        }
      }}
      onSubmit={(v) => {
        expect(v).toMatchObject({
          stringForm: 'New Value'
        })
        done()
      }}
    />
  )

  const stringInput = component.getByRole(ROLE_INPUT_STRING)
  fireEvent.change(stringInput, {
    target: { value: 'New Value' }
  })

  const submitInput = component.getByRole(ROLE_INPUT_DYNAMIC_SUBMIT)
  fireEvent.click(submitInput)
})
