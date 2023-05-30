import { atom } from "recoil";

export const orgs = atom({
  key: "orgName",
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
