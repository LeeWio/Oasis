import { useMemo } from "react";

import { useAppSelector } from "./store";

export const useToast = () => {
  const toast = useAppSelector((state) => state.toast);

  return useMemo(() => toast, [toast]);
};
