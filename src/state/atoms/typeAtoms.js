import { atom } from "recoil";

export const allTypesAtom = atom({
    key: "allTypesAtom",
    default: []
});

export const typesTreeAtom = atom({
    key: "typesTreeAtom",
    default: []
})

export const typeSelectedAtom = atom({
    key: "typeSelectedAtom",
    default: null
})

export const allTypesByLevelAtom = atom({
    key: "allTypesByLevelAtom",
    default:  []
})