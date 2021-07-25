import { DynamicFormSize } from '../../Schema'

const buttonSizeFromSchemaSize = (schemaSize) => {
  if (schemaSize === DynamicFormSize.large) return 'btn-lg'
  if (schemaSize === DynamicFormSize.medium) return 'btn-md'
  if (schemaSize === DynamicFormSize.small) return 'btn-sm'

  return 'btn-md'
}

export { buttonSizeFromSchemaSize }
