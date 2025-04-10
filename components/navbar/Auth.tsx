"use client";

import React from "react";
import { ButtonGroup, Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  useDisclosure,
  ModalFooter,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { Icon } from "@iconify/react";
import { Tooltip } from "@heroui/tooltip";

export const ChevronDownIcon = () => {
  return (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Auth = () => {
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onOpenChange: onSignUpOpenChange,
  } = useDisclosure();

  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onOpenChange: onSignInOpenChange,
  } = useDisclosure();

  const [isFormVisible, setIsFormVisible] = React.useState(false);

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  );

  const [selectedOption, setSelectedOption] = React.useState(
    new Set(["SignUp"]),
  );

  const descriptionsMap = {
    SignUp: "Create a new account",
    SignIn: "Log in to your account",
  };

  const labelsMap = {
    SignUp: "Sign Up",
    SignIn: "Sign In",
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0] as
    | "SignUp"
    | "SignIn";

  // ------------------------------- Gign In -----------------------------------------------
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("example@mail.com");
  const [password, setPassword] = React.useState("");
  const [[page, direction], setPage] = React.useState([0, 0]);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.length) {
      setIsEmailValid(false);

      return;
    }
    setIsEmailValid(true);
    paginate(1);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.length) {
      setIsPasswordValid(false);

      return;
    }
    setIsPasswordValid(true);
    // Here you can send the email and password to your API for authentication.
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const handleSubmit = page === 0 ? handleEmailSubmit : handlePasswordSubmit;

  return (
    <>
      <ButtonGroup variant="flat">
        <Button
          onPress={
            selectedOptionValue === "SignIn" ? onSignInOpen : onSignUpOpen
          }
        >
          {labelsMap[selectedOptionValue]}
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly>
              <ChevronDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="auth options"
            className="max-w-[300px]"
            selectedKeys={selectedOption}
            selectionMode="single"
            onSelectionChange={setSelectedOption as any}
          >
            <DropdownItem key="SignIn" description={descriptionsMap["SignIn"]}>
              {labelsMap["SignIn"]}
            </DropdownItem>
            <DropdownItem key="SignUp" description={descriptionsMap["SignUp"]}>
              {labelsMap["SignUp"]}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
      <Modal
        hideCloseButton
        backdrop={"blur"}
        isOpen={isSignUpOpen}
        size="sm"
        onOpenChange={onSignUpOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody className="flex w-full max-w-sm flex-col gap-4">
                <LazyMotion features={domAnimation}>
                  <AnimatePresence initial={false} mode="popLayout">
                    {isFormVisible ? (
                      <m.form
                        animate="visible"
                        className="flex flex-col gap-y-3"
                        exit="hidden"
                        initial="hidden"
                        variants={{
                          visible: { opacity: 1, y: 0 },
                          hidden: { opacity: 0, y: 10 },
                        }}
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <Input
                          isRequired
                          label="Email Address"
                          name="email"
                          type="email"
                          variant="bordered"
                        />
                        <Input
                          isRequired
                          label="Password"
                          name="password"
                          type="password"
                          variant="bordered"
                        />
                        <Button color="primary" type="submit">
                          Sign Up
                        </Button>
                        {orDivider}
                        <Button
                          fullWidth
                          startContent={
                            <Icon
                              className="text-default-500"
                              icon="solar:arrow-left-linear"
                              width={18}
                            />
                          }
                          variant="flat"
                          onPress={() => setIsFormVisible(false)}
                        >
                          Other Sign Up options
                        </Button>
                      </m.form>
                    ) : (
                      <div>
                        <Button
                          fullWidth
                          color="primary"
                          startContent={
                            <Icon
                              className="pointer-events-none text-2xl"
                              icon="solar:letter-bold"
                            />
                          }
                          type="button"
                          onPress={() => setIsFormVisible(true)}
                        >
                          Continue with Email
                        </Button>
                        {orDivider}
                        <m.div
                          animate="visible"
                          className="flex flex-col gap-y-2"
                          exit="hidden"
                          initial="hidden"
                          variants={variants}
                        >
                          <Button
                            fullWidth
                            startContent={
                              <Icon icon="flat-color-icons:google" width={24} />
                            }
                            variant="flat"
                          >
                            Continue with Google
                          </Button>
                          <Button
                            fullWidth
                            startContent={
                              <Icon
                                className="text-default-500"
                                icon="fe:github"
                                width={24}
                              />
                            }
                            variant="flat"
                          >
                            Continue with GitHub
                          </Button>
                        </m.div>
                      </div>
                    )}
                  </AnimatePresence>
                </LazyMotion>
              </ModalBody>
              <ModalFooter className="flex justify-center text-small">
                Already have an account?&nbsp;
                <Link
                  href="#"
                  size="sm"
                  onPress={() => {
                    onClose();
                    onSignInOpen();
                  }}
                >
                  Log In
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        hideCloseButton
        backdrop={"blur"}
        isOpen={isSignInOpen}
        size="sm"
        onOpenChange={onSignInOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <m.div
                  layout
                  className="flex min-h-[40px] items-center gap-2 pb-2"
                >
                  {page === 1 && (
                    <m.div>
                      <Tooltip content="Go back" delay={3000}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onPress={() => paginate(-1)}
                        >
                          <Icon
                            className="text-default-500"
                            icon="solar:alt-arrow-left-linear"
                            width={16}
                          />
                        </Button>
                      </Tooltip>
                    </m.div>
                  )}
                  <m.h1
                    layout
                    className="text-xl font-medium"
                    transition={{ duration: 0.25 }}
                  >
                    Sign In
                  </m.h1>
                </m.div>
              </ModalHeader>
              <ModalBody className="flex w-full max-w-sm flex-col gap-4">
                <LazyMotion features={domAnimation}>
                  <AnimatePresence
                    custom={direction}
                    initial={false}
                    mode="wait"
                  >
                    <m.form
                      key={page}
                      animate="center"
                      className="flex flex-col gap-3"
                      custom={direction}
                      exit="exit"
                      initial="enter"
                      transition={{
                        duration: 0.25,
                      }}
                      variants={variants}
                      onSubmit={handleSubmit}
                    >
                      {page === 0 ? (
                        <Input
                          errorMessage={
                            !isEmailValid ? "Enter a valid email" : undefined
                          }
                          isInvalid={!isEmailValid}
                          label="Email Address"
                          name="email"
                          placeholder="Enter your email"
                          type="email"
                          value={email}
                          variant="bordered"
                          onValueChange={(value) => {
                            setIsEmailValid(true);
                            setEmail(value);
                          }}
                        />
                      ) : (
                        <Input
                          endContent={
                            <button type="button" onClick={toggleVisibility}>
                              {isVisible ? (
                                <Icon
                                  className="pointer-events-none text-2xl text-default-400"
                                  icon="solar:eye-closed-linear"
                                />
                              ) : (
                                <Icon
                                  className="pointer-events-none text-2xl text-default-400"
                                  icon="solar:eye-bold"
                                />
                              )}
                            </button>
                          }
                          errorMessage={
                            !isPasswordValid
                              ? "Enter a valid password"
                              : undefined
                          }
                          label="Password"
                          name="password"
                          placeholder="Enter your password"
                          type="password"
                          validationState={
                            isPasswordValid ? "valid" : "invalid"
                          }
                          value={password}
                          variant="bordered"
                          onValueChange={(value) => {
                            setIsPasswordValid(true);
                            setPassword(value);
                          }}
                        />
                      )}

                      <Button fullWidth color="primary" type="submit">
                        {page === 0 ? "Continue with Email" : "Log In"}
                      </Button>
                    </m.form>
                  </AnimatePresence>
                </LazyMotion>
                <p className="text-center text-small">
                  <Link href="#" size="sm">
                    Forgot password?
                  </Link>
                </p>
                <div className="flex items-center gap-4 py-2">
                  <Divider className="flex-1" />
                  <p className="shrink-0 text-tiny text-default-500">OR</p>
                  <Divider className="flex-1" />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    startContent={
                      <Icon icon="flat-color-icons:google" width={24} />
                    }
                    variant="bordered"
                  >
                    Continue with Google
                  </Button>
                  <Button
                    startContent={
                      <Icon
                        className="text-default-500"
                        icon="fe:github"
                        width={24}
                      />
                    }
                    variant="bordered"
                  >
                    Continue with Github
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center text-small">
                Need to create an account?&nbsp;
                <Link
                  href="#"
                  size="sm"
                  onPress={() => {
                    onClose();
                    onSignUpOpen();
                  }}
                >
                  Sign Up
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
