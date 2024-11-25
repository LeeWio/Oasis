import React from 'react'
import { NodeViewWrapper,NodeViewContent,NodeViewProps} from '@tiptap/react'
import {Input} from "@nextui-org/react";

export const NextInputView: React.FC<NodeViewProps> = () => {
    return(
        <NodeViewWrapper>
          this is a demo
            {/*<Input label={"adsfadf"}  labelPlacement={"outside-left"}/>*/}
        </NodeViewWrapper>
    )
}