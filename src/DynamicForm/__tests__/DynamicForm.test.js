/* eslint-disable no-undef */
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { DynamicFormType } from '../../Schema'
import { DynamicForm } from '../index'
import { ROLE_INPUT_DYNAMIC_SUBMIT, ROLE_INPUT_STRING } from '../roles'

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
