import { useMemo } from "react";
import { useAppSelector } from "./store";

/**
 * get current user ✔
 */
export const useAuth = () => {
  const userDetail = useAppSelector((state) => state.auth.userDetail);

  return useMemo(() => userDetail, [userDetail]);
};
