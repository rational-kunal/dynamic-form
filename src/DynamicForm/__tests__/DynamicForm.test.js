/* eslint-disable no-undef */
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { DynamicFormSize, DynamicFormType } from '../../Schema'
import { DynamicForm } from '../index'
import { ROLE_INPUT_DYNAMIC_SUBMIT, ROLE_INPUT_STRING } from '../roles'

const GET_SIMPLE_DYNAMIC_FORM = ({
  schema = {},
  onChange = undefined,
  onSubmit = undefined,
  submitSize = undefined
}) => {
  return (
    <DynamicForm
      schema={schema}
      onChange={onChange}
      onSubmit={onSubmit}
      submitSize={submitSize}
    />
  )
}

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

describe('DynamicForm size is', () => {
  test('small if small submit button size is passed', () => {
    const component = render(
      GET_SIMPLE_DYNAMIC_FORM({
        onSubmit: () => {},
        submitSize: DynamicFormSize.small
      })
    )

    const input = component.getByRole(ROLE_INPUT_DYNAMIC_SUBMIT)
    expect(input.classList).toContain('btn-sm')
  })

  test('medium if medium submit button size is passed', () => {
    const component = render(
      GET_SIMPLE_DYNAMIC_FORM({
        onSubmit: () => {},
        submitSize: DynamicFormSize.medium
      })
    )

    const input = component.getByRole(ROLE_INPUT_DYNAMIC_SUBMIT)
    expect(input.classList).toContain('btn-md')
  })

  test('medium if no submit button size is passed', () => {
    const component = render(
      GET_SIMPLE_DYNAMIC_FORM({ onSubmit: () => {}, submitSize: undefined })
    )

    const input = component.getByRole(ROLE_INPUT_DYNAMIC_SUBMIT)
    expect(input.classList).toContain('btn-md')
  })

  test('large if large submit button size is passed', () => {
    const component = render(
      GET_SIMPLE_DYNAMIC_FORM({
        onSubmit: () => {},
        submitSize: DynamicFormSize.large
      })
    )

    const input = component.getByRole(ROLE_INPUT_DYNAMIC_SUBMIT)
    expect(input.classList).toContain('btn-lg')
  })
})
