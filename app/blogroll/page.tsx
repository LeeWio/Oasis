"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/toast";
import { Spacer } from "@heroui/spacer";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import {
  Logo1,
  Logo10,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
} from "./logos";

import ScrollingBanner from "@/components/scrolling-banner";

const logos = [
  {
    key: "logo-1",
    logo: Logo1,
  },
  {
    key: "logo-2",
    logo: Logo2,
  },
  {
    key: "logo-3",
    logo: Logo3,
  },
  {
    key: "logo-4",
    logo: Logo4,
  },
  {
    key: "logo-5",
    logo: Logo5,
  },
  {
    key: "logo-6",
    logo: Logo6,
  },
  {
    key: "logo-7",
    logo: Logo7,
  },
  {
    key: "logo-8",
    logo: Logo8,
  },
  {
    key: "logo-9",
    logo: Logo9,
  },
  {
    key: "logo-10",
    logo: Logo10,
  },
];

export default function BlogrollPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
          <div className="flex flex-col items-start gap-1">
            <p className="text-medium text-default-500">Friendly Links</p>

            <p className="text-3xl uppercase font-bold">
              Growing Together, Sharing Value
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              color="warning"
              startContent={<Icon icon="lucide:tram-front" width={20} />}
              variant="shadow"
              onPress={() => {
                addToast({
                  hideIcon: true,
                  hideCloseButton: true,
                  title: "go to a random link",
                  timeout: 3000,
                  shouldShowTimeoutProgess: true,
                });
              }}
            >
              Random Access
            </Button>
            <Button
              color="primary"
              startContent={
                <Icon icon="lucide:circle-chevron-right" width={20} />
              }
              variant="ghost"
              onPress={onOpen}
            >
              Link Request
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-8">
          <ScrollingBanner shouldPauseOnHover duration={50} gap="40px">
            {logos.map(({ key, logo }) => (
              <div
                key={key}
                className="flex items-center justify-center text-foreground"
              >
                {logo}
              </div>
            ))}
          </ScrollingBanner>
          <Spacer y={8} />
          <ScrollingBanner
            isReverse
            shouldPauseOnHover
            duration={50}
            gap="40px"
          >
            {logos.map(({ key, logo }) => (
              <div
                key={key}
                className="flex items-center justify-center text-foreground"
              >
                {logo}
              </div>
            ))}
          </ScrollingBanner>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
