'use client'

import { BlockEditor } from '@/components/block-editor'
import { ColorPicker } from '@/components/ColorPicker/ColorPicker'

export default function PricingPage() {
  return (
    <div>
      <BlockEditor />
      <ColorPicker hexColor="#7828c8" type="primary" onChange={value => {}} onClose={value => {}} />
    </div>
  )
}
