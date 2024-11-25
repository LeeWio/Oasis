'use client'
import {Alert} from "@nextui-org/react";
import React from "react";

export default function DocsPage() {
    const title = "This is an alert";
    const description = "Thanks for subscribing to our newsletter!";
    return (
        <div className="flex items-center justify-center w-full">
            <Alert title={title} description={description}/>
        </div>
    );
}
