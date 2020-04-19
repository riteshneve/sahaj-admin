import { words, capitalize } from "lodash";

export const properCase = (string:any) =>
words(string)
    .map(capitalize)
    .join(' ');