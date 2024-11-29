"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Divider } from "@nextui-org/divider";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react";
import { Link } from "@nextui-org/link";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

import {
  useAuthenticateUserMutation,
  useCreateAccountMutation,
  UserAuthPayload,
} from "@/feature/api/authApi";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/store";
import { removeAuthUser } from "@/feature/auth/authSlice";

export default function AuthForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // get current user
  const auth = useAuth();

  const dispatch = useAppDispatch();

  const [authenticateUser, { isLoading: isAuthenticateUserLoading }] =
    useAuthenticateUserMutation();

  const [createAccount, { isLoading: isCreateAccountLoading }] =
    useCreateAccountMutation();

  const [userAuthPayload, setUserAuthPayload] = useState<UserAuthPayload>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  );

  useEffect(() => {
    setUserAuthPayload({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [isSignUp, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (userAuthPayload.password !== userAuthPayload.confirmPassword) {
        alert("Passwords do not match.");

        return; // 阻止表单提交
      }

      const res = await createAccount(userAuthPayload).unwrap();

      if (res && res.length > 0) {
        setIsFormVisible(false);
        // close modal
        onOpenChange();
      }
    } else {
      const auth = await authenticateUser(userAuthPayload).unwrap();

      if (auth && auth.authorization) {
        setIsFormVisible(false);
        // close modal
        onOpenChange();
      }
    }
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setUserAuthPayload((prev) => ({
      ...prev,
      [name]: value,
    }));

  return (
    <>
      {auth && auth.authorization ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              size="sm"
              src={auth.avatarUrl}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue={"profile"}
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{auth.username}</p>
            </DropdownItem>
            <DropdownItem key="settings" textValue={"My Settings"}>
              My Settings
            </DropdownItem>
            <DropdownItem key="team_settings" textValue={"Team Settings"}>
              Team Settings
            </DropdownItem>
            <DropdownItem key="analytics" textValue={"Analytics"}>
              Analytics
            </DropdownItem>
            <DropdownItem key="system" textValue={"System"}>
              System
            </DropdownItem>
            <DropdownItem key="configurations" textValue={"Configurations"}>
              Configurations
            </DropdownItem>
            <DropdownItem key="help_and_feedback" textValue={"Help & Feedback"}>
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={() => dispatch(removeAuthUser())}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          as={Link}
          className="text-sm font-normal text-default-600 bg-default-100"
          variant="flat"
          onPress={onOpen}
        >
          Sign in
        </Button>
      )}

      <Modal isOpen={isOpen} size={"sm"} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <LazyMotion features={domAnimation}>
              <ModalHeader className="flex flex-col gap-1">
                {isSignUp ? "Sign Up" : "Log In"}
              </ModalHeader>
              <ModalBody>
                <AnimatePresence initial={false} mode="sync">
                  {isFormVisible ? (
                    <m.form
                      animate="visible"
                      className="flex flex-col gap-y-3"
                      exit="hidden"
                      initial="hidden"
                      variants={variants}
                      onSubmit={handleSubmit}
                    >
                      <Input
                        isRequired
                        label="Email Address"
                        name="email"
                        type="email"
                        value={userAuthPayload.email}
                        variant="bordered"
                        onChange={handleChange}
                      />
                      <Input
                        isRequired
                        label="Password"
                        name="password"
                        type="password"
                        value={userAuthPayload.password}
                        variant="bordered"
                        onChange={handleChange}
                      />
                      {isSignUp && (
                        <Input
                          isRequired
                          errorMessage={"please confirm your password"}
                          isInvalid={
                            userAuthPayload.confirmPassword !==
                            userAuthPayload.password
                          }
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          value={userAuthPayload.confirmPassword}
                          variant="bordered"
                          onChange={handleChange}
                        />
                      )}
                      <Button
                        color="primary"
                        isLoading={
                          isSignUp
                            ? isCreateAccountLoading
                            : isAuthenticateUserLoading
                        }
                        type="submit"
                      >
                        {isSignUp ? "Sign Up" : "Log In"}
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
                        Other {isSignUp ? "Sign Up" : "Log In"} options
                      </Button>
                    </m.form>
                  ) : (
                    <>
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
                        <p className="mt-3 text-center text-small">
                          {isSignUp ? (
                            <>
                              Already have an account?{" "}
                              <Link
                                href="#"
                                size="sm"
                                onClick={() => setIsSignUp(false)}
                              >
                                Log In
                              </Link>
                            </>
                          ) : (
                            <>
                              Don&#39;t have an account?{" "}
                              <Link
                                href="#"
                                size="sm"
                                onClick={() => setIsSignUp(true)}
                              >
                                Sign Up
                              </Link>
                            </>
                          )}
                        </p>
                      </m.div>
                    </>
                  )}
                </AnimatePresence>
              </ModalBody>
            </LazyMotion>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
