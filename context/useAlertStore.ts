import { create } from "zustand";

interface IAlert {
  title: string;
  desc: string | React.ReactNode;
  isCancel?: boolean;
  isConfirm?: boolean;
  cancelAction?: () => void;
  confirmAction?: () => void;
}
type Props = {
  isOpen: boolean;
  openAlert: (opt: IAlert) => void;
  closeAlert: () => void;
} & IAlert;
export const useAlertStore = create<Props>((set) => ({
  isOpen: false,
  title: "",
  desc: "",
  isCancel: true,
  isConfirm: true,
  cancelAction: () => {},
  confirmAction: () => {},
  openAlert: ({
    title,
    desc,
    isCancel = true,
    isConfirm = true,
    cancelAction = undefined,
    confirmAction = undefined,
  }) =>
    set({
      isOpen: true,
      title,
      desc,
      isCancel,
      isConfirm,
      cancelAction,
      confirmAction,
    }),
  closeAlert: () => set({ isOpen: false }),
}));
