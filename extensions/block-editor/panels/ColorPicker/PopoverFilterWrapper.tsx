"use client";

import React from "react";
import {
	PopoverContent,
	Popover,
	PopoverTrigger,
	PopoverProps,
} from "@heroui/popover";
import { useDisclosure } from "@heroui/use-disclosure";

import { MemoButton } from "../../menus/TextMenu";

export type PopoverFilterWrapperProps = Omit<PopoverProps, "children"> & {
	title?: string;
	children: React.ReactNode;
	icon?: string;
	className?: string;
};

const PopoverFilterWrapper = React.forwardRef<
	HTMLDivElement,
	PopoverFilterWrapperProps
>(({ title, children, icon, className, ...props }, ref) => {
	const { isOpen, onOpenChange } = useDisclosure();

	return (
		<Popover
			ref={ref}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			{...props}
			shouldCloseOnInteractOutside={() => true}
		>
			<PopoverTrigger>
				<MemoButton icon={icon} value={title} />
			</PopoverTrigger>

			<PopoverContent className="flex max-w-2xl flex-col items-center gap-2">
				{title ? (
					<span className="mb-2 text-medium font-medium text-default-600">
						{title}
					</span>
				) : null}
				<div className={className ?? "flex w-full flex-col gap-2"}>
					{children}
				</div>
			</PopoverContent>
		</Popover>
	);
});

PopoverFilterWrapper.displayName = "PopoverFilterWrapper";

export default PopoverFilterWrapper;
