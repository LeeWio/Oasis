"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { removeAuthUser } from "@/feature/auth/authSlice";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { Input } from "@nextui-org/input";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { isAppleDevice } from "@react-aria/utils";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/store";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import {
  useCreateAccountMutation,
  useLazyRequestVerificationCodeQuery,
  UserAuthPayload,
  useValidateCaptchaMutation,
} from "@/feature/api/authApi";
import { Tooltip } from "@nextui-org/tooltip";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { InputOtp } from "@nextui-org/input-otp";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

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

export const Navbar = () => {
  const [
    requestVerificationCode,
    {
      isLoading: isRequestVerificationCodeLoading,
      error: requestVerificationCodeError,
    },
  ] = useLazyRequestVerificationCodeQuery();

  const [createAccount, { isLoading: isCreateAccountLoading }] =
    useCreateAccountMutation();

  const [validateCaptcha, { isLoading, error }] = useValidateCaptchaMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const Title = useCallback(
    (props: React.PropsWithChildren<{}>) => (
      <m.h1
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-medium"
        exit={{ opacity: 0, x: -10 }}
        initial={{ opacity: 0, x: -10 }}
      >
        {props.children}
      </m.h1>
    ),
    [],
  );
  const [userAuthPayload, setUserAuthPayload] = useState<UserAuthPayload>({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleEmailSubmit = async () => {
    if (!userAuthPayload.email.length) {
      return;
    }
    try {
      await requestVerificationCode(userAuthPayload.email).unwrap();
      paginate(1);
    } catch {
      const error = requestVerificationCodeError as FetchBaseQueryError;
      alert(error?.data);
    }
  };

  const handleValidateCaptchaSubmit = async () => {
    try {
      const result = await validateCaptcha(userAuthPayload).unwrap();
      if (result) {
        onOpenChange();
        setIsFormVisible(false);
        setIsSignUp(false);
        paginate(0);
        alert("登陆成功");
      }
    } catch (err) {
      alert(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (page) {
      case 0:
        handleEmailSubmit();
        break;
      case 1:
        handleValidateCaptchaSubmit();
        break;
      case 2:
        // handleConfirmPasswordSubmit();
        break;
      default:
        break;
    }
  };
  const titleContent = useMemo(() => {
    if (isSignUp) {
      return "Sign Up";
    } else {
      return page === 0 ? "Log In" : "Enter Verification Code";
    }
  }, [page, isSignUp]);

  const handleValueChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setUserAuthPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userAuthPayload.password !== userAuthPayload.confirmPassword) {
      alert("Passwords do not match.");

      return; // 阻止表单提交
    }

    const res = await createAccount(userAuthPayload).unwrap();

    if (res && res.length > 0) {
      setIsFormVisible(false);
      setIsSignUp(false);
      // close modal
      onOpenChange();
    }
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUserAuthPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const auth = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  useEffect(() => {
    setUserAuthPayload({
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
    });
  }, [isSignUp, isOpen]);

  const searchInput = (
    <Button
      className="bg-default-100 text-sm text-default-500"
      endContent={
        <Kbd
          className="hidden bg-transparent px-2 py-0.5 shadow-none lg:inline-block"
          key={commandKey}
        >
          K
        </Kbd>
      }
      size="md"
      value={"flat"}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
    >
      Quick Search...
    </Button>
  );

  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              isExternal
              aria-label="Twitter"
              href={siteConfig.links.twitter}
            >
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
            >
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          <NavbarItem className="hidden md:flex">
            {/* <Button */}
            {/*   isExternal */}
            {/*   as={Link} */}
            {/*   className="text-sm font-normal text-default-600 bg-default-100" */}
            {/*   href={siteConfig.links.sponsor} */}
            {/*   startContent={<HeartFilledIcon className="text-danger" />} */}
            {/*   variant="flat" */}
            {/* > */}
            {/*   Sponsor */}
            {/* </Button> */}
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
                  <DropdownItem
                    key="configurations"
                    textValue={"Configurations"}
                  >
                    Configurations
                  </DropdownItem>
                  <DropdownItem
                    key="help_and_feedback"
                    textValue={"Help & Feedback"}
                  >
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
                endContent={
                  <span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
                    <Icon
                      className="text-default-500 [&>path]:stroke-[1.5]"
                      icon="solar:arrow-right-linear"
                      width={16}
                    />
                  </span>
                }
                className="text-sm font-normal text-default-600 bg-default-100"
                variant="flat"
                onPress={onOpen}
              >
                Sign in
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        size="sm"
      >
        <ModalContent>
          {() => (
            <LazyMotion features={domAnimation}>
              <ModalHeader className="flex flex-col gap-1">
                <m.div className="flex min-h-[40px] items-center gap-2 pb-2">
                  <AnimatePresence initial={false} mode="popLayout">
                    {page >= 1 && (
                      <m.div
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        initial={{ opacity: 0, x: -10 }}
                      >
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
                  </AnimatePresence>
                  <AnimatePresence
                    custom={direction}
                    initial={false}
                    mode="wait"
                  >
                    <Title>{titleContent}</Title>
                  </AnimatePresence>{" "}
                </m.div>
                {/* {isSignUp ? "Sign Up" : "Log In"} */}
              </ModalHeader>
              <ModalBody>
                <AnimatePresence initial={false} mode="sync">
                  {isFormVisible ? (
                    <>
                      {isSignUp ? (
                        <m.form
                          animate="visible"
                          className="flex flex-col gap-y-3"
                          exit="hidden"
                          initial="hidden"
                          variants={variants}
                          onSubmit={handleCreateAccount}
                        >
                          <Input
                            isRequired
                            label="Email Address"
                            name="email"
                            type="email"
                            value={userAuthPayload.email}
                            onChange={handleChange}
                          />
                          <Input
                            isRequired
                            label="Password"
                            name="password"
                            type="password"
                            value={userAuthPayload.password}
                            onChange={handleChange}
                          />
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
                            onChange={handleChange}
                          />
                          <Button
                            fullWidth
                            color="primary"
                            type="submit"
                            isLoading={isCreateAccountLoading}
                          >
                            Sign Up
                          </Button>
                        </m.form>
                      ) : (
                        <>
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
                              transition={{ duration: 0.2 }}
                              variants={{
                                enter: (direction: number) => ({
                                  x: direction > 0 ? 50 : -50,
                                  opacity: 0,
                                }),
                                center: {
                                  zIndex: 1,
                                  x: 0,
                                  opacity: 1,
                                },
                                exit: (direction: number) => ({
                                  zIndex: 0,
                                  x: direction < 0 ? 50 : -50,
                                  opacity: 0,
                                }),
                              }}
                              onSubmit={handleSubmit}
                            >
                              {page === 0 && (
                                <Input
                                  autoFocus
                                  isRequired
                                  label="Email Address"
                                  name="email"
                                  type="email"
                                  value={userAuthPayload.email}
                                  onChange={handleChange}
                                  onValueChange={(value) => {
                                    // setIsEmailValid(true);
                                    // setEmail(value);
                                  }}
                                />
                              )}
                              {page === 1 && (
                                <InputOtp
                                  className="mx-auto"
                                  isRequired
                                  size="lg"
                                  color="success"
                                  aria-label="verificationCode input field"
                                  placeholder="Enter verificationCode"
                                  validationBehavior="native"
                                  length={6}
                                  value={userAuthPayload.verificationCode}
                                  onValueChange={(value) =>
                                    handleValueChange({
                                      name: "verificationCode",
                                      value,
                                    })
                                  }
                                  onComplete={handleValidateCaptchaSubmit}
                                />
                              )}
                              {page == 0 && (
                                <Button
                                  fullWidth
                                  color="primary"
                                  type="submit"
                                  isLoading={isRequestVerificationCodeLoading}
                                >
                                  Continue with Email
                                </Button>
                              )}
                            </m.form>
                          </AnimatePresence>
                        </>
                      )}
                      {orDivider}
                      <Button
                        className="mb-3"
                        fullWidth
                        startContent={
                          <Icon
                            className="text-default-500"
                            icon={"solar:arrow-left-linear"}
                            width={18}
                          />
                        }
                        variant="flat"
                        onPress={() => {
                          setIsFormVisible(false);
                          setIsSignUp(false);
                        }}
                      >
                        Other {isSignUp ? "Sign Up" : "Log In"} options
                      </Button>
                    </>
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
                        <p className="my-3 text-center text-small">
                          {isSignUp ? (
                            <>
                              Already have an account?{" "}
                              <Link
                                href="#"
                                size="sm"
                                onPress={() => setIsSignUp(false)}
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
                                onPress={() => {
                                  setIsFormVisible(true);
                                  setIsSignUp(true);
                                }}
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
};
