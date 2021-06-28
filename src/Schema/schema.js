/* eslint-disable no-prototype-builtins */
import { DynamicFormType } from './type'
import util from '../util'

const schema = (sch) => {
  const expandedSch = {}
  for (const [key, schemaForKey] of Object.entries(sch)) {
    expandedSch[key] = getExpandedSchemaFromKeyAndSchema(key, schemaForKey)
  }

  return expandedSch
}

const getExpandedSchemaFromKeyAndSchema = (key, schemaForKey) => {
  return {
    type: getTypeOfSchemaFromSchema(schemaForKey),
    label: getLabelFromKeyAndSchema(key, schemaForKey),
    placeholder: schemaForKey.placeholder,
    defaultValue: getDefaultValueFromKeyAndSchema(schemaForKey),
    schema: getSubSchemaFromSchema(schemaForKey)
  }
}

const getLabelFromKeyAndSchema = (key, schemaForKey) => {
  if (schemaForKey.label) return schemaForKey.label
  return key
}

const getDefaultValueFromKeyAndSchema = (sch) => {
  const type = getTypeOfSchemaFromSchema(sch)
  if (sch.hasOwnProperty('defaultValue')) {
    const defaultValue = sch.defaultValue
    if (type === DynamicFormType.number) {
      return util.parseInteger(defaultValue)
    }

    return defaultValue
  }

  if (type === DynamicFormType.text && typeof sch === 'string') return sch
  if (type === DynamicFormType.number && typeof sch === 'number') return sch
}

const getTypeOfSchemaFromSchema = (sch) => {
  if (sch.hasOwnProperty('type')) return sch.type

  if (typeof sch === 'string' || sch === String) return DynamicFormType.text
  if (typeof sch === 'number' || sch === Number) return DynamicFormType.number
  if (Array.isArray(sch)) return DynamicFormType.repeatable
  if (typeof sch === 'object') return DynamicFormType.nested
}

const getSubSchemaFromSchema = (sch) => {
  if (sch.hasOwnProperty('schema')) return schema(sch.schema)

  const type = getTypeOfSchemaFromSchema(sch)
  if (type === DynamicFormType.nested) return schema(sch)
  if (type === DynamicFormType.repeatable) return schema(sch[0])
}

export { schema }
