import { atom } from "recoil";

export const orgNameState = atom({
  key: "orgNameState",
  default: "Netflix",
});

export const repoUrl = atom({
  key: "repoUrl",
  default: "",
});

export const cacheRepos = atom({
  key: "cacheRepo",
  default: [],
});
