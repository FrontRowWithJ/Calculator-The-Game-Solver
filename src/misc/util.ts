import { useState } from "react";
import { operator } from "../misc";

export const darkenHex = (hex: string, amount: number) => {
  const rgb = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  const [r, g, b] = [16, 8, 0].map((shift, i) =>
    Math.round((rgb[i] * (1 - amount)) << shift)
  );
  return `#${(r + g + b).toString(16)}`;
};

type Callback<T> = (value: number) => T;

export const times = <T>(n: number, iter: T | Callback<T>) => {
  const cb = typeof iter === "function" ? iter : () => iter;
  return [...new Array(n).keys()].map(cb as Callback<T>);
};

export const values: {
  [op in operator]: {
    backgroundColor: string;
    canChange: boolean;
    canShowOp: boolean;
    has2ndNumber?: boolean;
  };
} = {
  "+": { backgroundColor: "#45484D", canChange: true, canShowOp: true },
  "×": { backgroundColor: "#45484D", canChange: true, canShowOp: true },
  "-": { backgroundColor: "#45484D", canChange: true, canShowOp: true },
  "÷": { backgroundColor: "#45484D", canChange: true, canShowOp: true },
  CLR: { backgroundColor: "#C42C2C", canChange: false, canShowOp: true },
  OK: { backgroundColor: "#48AC2F", canChange: false, canShowOp: true },
  "<<": { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  P: { backgroundColor: "#8B7CD7", canChange: true, canShowOp: false },
  "=>": {
    backgroundColor: "#EB6C15",
    canChange: true,
    canShowOp: true,
    has2ndNumber: true,
  },
  X: { backgroundColor: "#EB6C15", canChange: true, canShowOp: true },
  "+/-": { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  Reverse: { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  SUM: { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  "Shift <": { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  "Shift >": { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  Mirror: { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  "[+]": { backgroundColor: "#EB6C15", canChange: true, canShowOp: true },
  Store: { backgroundColor: "#5C205C", canChange: false, canShowOp: true },
  Place: { backgroundColor: "#5C205C", canChange: false, canShowOp: true },
  Inv10: { backgroundColor: "#EB6C15", canChange: false, canShowOp: true },
  default: { backgroundColor: "#b6b1a5", canChange: false, canShowOp: false },
} as const;

export const change = (inc: number) => {
  return (number: string) => {
    const num = parseInt(number);
    if (isNaN(num)) return "0";
    return `${num + inc}`;
  };
};

export const useToggle = (
  length: number,
  cb?: (i: number, val: boolean) => void
) => {
  const [values, setValues] = useState<boolean[]>(times(length, false));
  const toggle = (index: number) =>
    setValues((values) =>
      values.map((_, i) => {
        const res = i === index && !values[i];
        i === index && cb && cb(i, res);
        return res;
      })
    );
  return [values, toggle] as const;
};

export const getNumber = (value: string, min: number, max: number) => {
  if (value === "" || value === "-") return value;
  const n = parseInt(value);
  return isNaN(n) ? "" : Math.max(min, Math.min(n, max));
};
