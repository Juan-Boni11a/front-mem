import { atom } from "recoil";

export const isLoadingAllPageAtom = atom({
  key: "isLoadingAllPageAtom",
  default: false,
});

export const isLoadingGeneralAtom = atom({
  key: "isLoadingGeneralAtom",
  default: false,
});

export const isAuthenticatedAtom = atom({
  key: "isAuthenticatedAtom",
  default: false,
});

export const currentUserAtom = atom({
  key: "currentUserAtom",
  default: null,
});

export const errorMessageAtom = atom({
  key: "errorMessageAtom",
  default: "",
});

export const fileSizeAtom = atom({
  key: "fileSizeAtom",
  default: null,
});
