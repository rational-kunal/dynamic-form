import { useRef } from 'react'

export const useRenderCount = (key) => {
  const renderCount = useRef(0)
  console.log('Redered', key.label, renderCount.current++)
}
