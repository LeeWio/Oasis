'use client';

import { Button } from '@heroui/button';
import { PopoverContent, Popover, PopoverTrigger } from '@heroui/popover';

import { title } from '@/components/primitives';
import { FileUpload } from '@/components/FileUpload/FileUpload';
export default function DocsPage() {
  return (
    <div>
      <Popover
        shouldCloseOnBlur
        triggerScaleOnOpen
        containerPadding={1}
        placement="right"
        triggerType="grid"
      >
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="font-bold text-small">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
      <FileUpload onUpload={(string) => {}} />
      <h1 className={title()}>Docs</h1>
    </div>
  );
}
