import { operator, funcOp, Button, genButtonArgs } from "./types";

const { abs, floor, sign } = Math;
// symbols
// add n = + n
// sub n = - n
// mul n = * n
// div n = / n
// exp n = X n
// put n = P n
// change sign = +/- n
// switch a to b = => a b
// remove lsd  = <<
// sum = sum
// shift left = Shift <
// shift right = Shift >
// mirror = Mirror
// increase button val by n = [+] n
// store = Store
// place = Place
// reverse = Reverse

const isNumber = (n: unknown): n is number => typeof n === "number";

const addFunc: funcOp = function (n: number) {
  return n + this.number;
};

const subFunc: funcOp = function (n: number) {
  return n - this.number;
};

const putFunc: funcOp = function (n: number) {
  return +("" + n + this.number);
};

const mulFunc: funcOp = function (n: number) {
  return n * this.number;
};

const divFunc: funcOp = function (n: number) {
  return n / this.number;
};

const powFunc: funcOp = function (n: number) {
  return n ** this.number;
};

const shiftLeft: funcOp = (a: number) =>
  +(a.toString().substring(1) + a.toString().charAt(0));

const teleport = (n: number, tpFrom: number, tpTo: number) => {
  const s = ("00" + n).split("");
  const len = s.length;
  let b = +s[len - tpTo - 1];
  let a = +s.splice(len - tpFrom - 1, 1)[0];
  let index = len - tpTo - 2;
  while (b || a) {
    const sum = a + b;
    s[index--] = "" + (sum % 10);
    b = Math.floor(sum / 10);
    a = +s[index];
  }
  return +s.join("");
};

const shiftRight: funcOp = (a: number) => {
  const s = "" + a;
  return +(s.charAt(s.length - 1) + s.substring(0, s.length - 1));
};
const revAbs = (a: number) => ("" + abs(a)).split("").reverse().join("");
const replaceFunc =
  (b: number, c: string): funcOp =>
  (a: number) =>
    +("" + a).replace(new RegExp("" + b, "gi"), "" + c);

const removeLastDigit: funcOp = (a: number) => floor(a / 10);

const reverse: funcOp = (a: number) => +revAbs(a) * sign(a);

const sum: funcOp = (a: number) =>
  ("" + abs(a)).split("").reduce((a, b) => a + +b, 0) * sign(a);

const mirror: funcOp = (a: number) => +(a + revAbs(a));

const inv: funcOp = (a: number) =>
  +("" + abs(a))
    .split("")
    .map((n) => (+n ? "" + abs(+n - 10) : "0"))
    .join("") * sign(a);

const changeSign: funcOp = (a: number) => -a;

export const genStoreButtons = (start: number): [Button, Button] => {
  let save = start;
  const storeOp: funcOp = (a: number) => (save = a);
  const placeOp: funcOp = (a: number) => +("" + a + save);
  const store: Button = {
    canChange: false,
    operator: "Store",
    opFunc: storeOp,
    number: start,
  };
  const place: Button = {
    canChange: false,
    operator: "Place",
    opFunc: placeOp,
    number: start,
  };
  return [store, place];
};

const DELIMITER = "$";

function changeOperation(this: Button, buttons: Button[]) {
  buttons.forEach((button) => {
    if (button.canChange && typeof button.number === "number")
      button.number += this.number * Math.sign(this.number);
  });
}

function getOperation(str: string) {
  const tokens = str.split(DELIMITER) as [string, string, string];
  const symbol = tokens[0] as Exclude<
    operator,
    "Store" | "Place" | "CLR" | "OK" | "default"
  >;
  const a = +tokens[1];
  const b = tokens[2];

  switch (symbol) {
    case "+":
      return [true, addFunc, a] as const;
    case "-":
      return [true, subFunc, a] as const;
    case "×":
      return [true, mulFunc, a] as const;
    case "÷":
      return [true, divFunc, a] as const;
    case "X":
      return [true, powFunc, a] as const;
    case "P":
      return [true, putFunc, a] as const;
    case "=>":
      return [false, replaceFunc(a, b), a, b] as const;
    case "<<":
      return [false, removeLastDigit, 0] as const;
    case "+/-":
      return [false, changeSign, 0] as const;
    case "SUM":
      return [false, sum, 0] as const;
    case "Shift <":
      return [false, shiftLeft, 0] as const;
    case "Shift >":
      return [false, shiftRight, 0] as const;
    case "Mirror":
      return [false, mirror, 0] as const;
    case "[+]":
      return [false, changeOperation, a] as const;
    case "Reverse":
      return [false, reverse, 0] as const;
    case "Inv10":
      return [false, inv, 0] as const;
  }
}

export function genButton({ operator, number }: genButtonArgs): Button;
export function genButton({
  operator,
  number,
  number2,
}: genButtonArgs): [Button, Button];
export function genButton({
  operator,
  number,
  number2,
}: genButtonArgs): Button | [Button, Button] {
  if (operator === "Store") return genStoreButtons(number ?? 0);
  const str = [operator, number?.toString(), number2]
    .filter(Boolean)
    .join(DELIMITER);
  const [canChange, opFunc, n, n2] = getOperation(str);
  const op = str.split(DELIMITER)[0] as operator;
  const res = { canChange, operator: op, opFunc, number: n, number2: n2 };
  opFunc.bind(res);
  return res;
}

export const solve = (
  start: number,
  ops: Button[],
  movesLeft: number,
  goal: number,
  tpFrom?: number,
  tpTo?: number
) => {
  const solution: { operator: operator; number: number | undefined }[] = [];

  const solveInner = (
    start: number,
    curr: number,
    ops: Button[],
    movesMade: { operator: operator; number: number | undefined }[],
    movesLeft: number,
    goal: number
  ): number | undefined => {
    if (solution.length || !movesLeft) return;
    for (const op of ops) {
      if (solution.length) return;
      const { operator, number, number2 } = op;
      const newMovesMade = [...movesMade, { operator, number, number2 }];
      if (op.operator === "[+]") {
        const opsCopy = ops.map((op) => ({ ...op }));
        (op.opFunc as typeof changeOperation)(opsCopy);
        solveInner(start, curr, opsCopy, newMovesMade, movesLeft - 1, goal);
      } else if (op.operator === "Store") {
        const newOps = [...ops];
        const oldStIndex = ops.findIndex(
          ({ operator }) => operator === "Store"
        );
        const oldPlIndex = ops.findIndex(
          ({ operator }) => operator === "Place"
        );
        const oldSt = ops[oldStIndex];
        const oldPl = ops[oldPlIndex];
        const [newSt, newPl] = genStoreButtons((oldPl.opFunc as funcOp)(0));
        ops[oldStIndex] = newSt;
        ops[oldPlIndex] = newPl;
        (oldSt.opFunc as funcOp)(curr);
        solveInner(start, curr, newOps, newMovesMade, movesLeft - 1, goal);
      } else {
        let next = (op.opFunc as funcOp)(curr);
        if (
          !isNumber(next) ||
          curr === next ||
          !Number.isInteger(next) ||
          next === start ||
          next > 9999999
        )
          continue;
        let count = 5;
        if (tpFrom !== undefined && tpTo !== undefined && tpFrom !== tpTo)
          while (("" + next).length >= tpFrom + 1 && count) {
            next = teleport(next, tpFrom, tpTo);
            count--;
          }
        if (next === goal) return solution.push(...newMovesMade);
        solveInner(start, next, ops, newMovesMade, movesLeft - 1, goal);
      }
    }
    return;
  };
  solveInner(start, start, ops, [], movesLeft, goal);
  return solution;
};
