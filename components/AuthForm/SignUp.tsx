import {
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@heroui/modal";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import { Link } from "@heroui/link";
import {
  useCreateAccountMutation,
  UserAuthPayload,
} from "@/feature/api/authApi";

type SignUpProps = {
  isSignUpOpen: boolean;
  onSignUpOpenChange: () => void;
  onSignInOpen: () => void;
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

export const SignUp = ({
  isSignUpOpen,
  onSignUpOpenChange,
  onSignInOpen,
}: SignUpProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-default-500 text-tiny">OR</p>
      <Divider className="flex-1" />
    </div>
  );

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

  const [createAccount, { isLoading: isCreateAccountLoading }] =
    useCreateAccountMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = await createAccount(userAuthPayload).unwrap();
    if (auth && auth.authorization) {
      onSignUpOpenChange();
    }
  };

  return (
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
                      onSubmit={handleSubmit}
                    >
                      <Input
                        isRequired
                        label="Email Address"
                        name="email"
                        type="email"
                        variant="bordered"
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
                        variant="bordered"
                      />
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={isCreateAccountLoading}
                      >
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
  );
};
