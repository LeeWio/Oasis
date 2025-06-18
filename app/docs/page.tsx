'use client'

import { Button } from '@heroui/button'
import { PopoverContent, Popover, PopoverTrigger } from '@heroui/popover'

import { title } from '@/components/primitives'
import { FileUpload } from '@/components/file-upload'
export default function DocsPage() {
    return (
        <div>
            <FileUpload onUpload={(string) => { }} />
            <h1 className={title()}>Docs</h1>
        </div>
    )
}
