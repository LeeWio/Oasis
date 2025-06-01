import { ChangeEvent, useState } from "react";
import {
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import {
  useAuthenticateUserMutation,
  UserAuthPayload,
} from "@/feature/api/authApi";

type SignInProps = {
  isSignInOpen: boolean;
  onSignInOpenChange: () => void;
  onSignUpOpen: () => void;
};

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

export const SignIn = ({
  onSignUpOpen,
  isSignInOpen,
  onSignInOpenChange,
}: SignInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userAuthPayload.email.length) {
      setIsEmailValid(false);

      return;
    }
    setIsEmailValid(true);
    paginate(1);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAuthPayload.password.length) {
      setIsPasswordValid(false);

      return;
    }
    setIsPasswordValid(true);
    // Here you can send the email and password to your API for authentication.

    const auth = await authenticateUser(userAuthPayload).unwrap();

    if (auth && auth.authorization) {
      onSignInOpenChange();
    }
  };

  const handleSubmit = page === 0 ? handleEmailSubmit : handlePasswordSubmit;

  const [authenticateUser, { isLoading: isAuthenticateUserLoading }] =
    useAuthenticateUserMutation();

  const [userAuthPayload, setUserAuthPayload] = useState<UserAuthPayload>({
    email: "",
    password: "",
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) =>
    setUserAuthPayload((pre) => ({
      ...pre,
      [name]: value,
    }));

  return (
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
                <AnimatePresence custom={direction} initial={false} mode="wait">
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
                        value={userAuthPayload.email}
                        variant="bordered"
                        onValueChange={() => setIsEmailValid(true)}
                        onChange={handleChange}
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
                        validationState={isPasswordValid ? "valid" : "invalid"}
                        value={userAuthPayload.password}
                        variant="bordered"
                        onValueChange={() => {
                          setIsPasswordValid(true);
                        }}
                        onChange={handleChange}
                      />
                    )}

                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      isLoading={isAuthenticateUserLoading}
                    >
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
                <p className="shrink-0 text-default-500 text-tiny">OR</p>
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
  );
};
