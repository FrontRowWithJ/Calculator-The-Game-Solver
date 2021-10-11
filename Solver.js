const { abs, floor } = Math;
// symbols
// add n = + n
// sub n = - n
// mul n = * n
// div n = / n
// exp n = e n
// put n = p n
// switch a to b = => a b
// remove lsd  = <<
// sum = sum
// shift left = <
// shift right = >
// mirror = m
// increase button val by n = [+] n
// store = st
// place = pl
// reverse = r

const solve = (start, ops, movesLeft, goal, st, end) => {
  const solution = [];
  const solveInner = (start, curr, ops, movesMade, movesLeft, goal) => {
    if (solution.length || !movesLeft) return;
    for (const op of ops) {
      const newMovesMade = [...movesMade, op.symbol];
      if (op.symbol.startsWith("[+]", 0)) {
        const opsCopy = ops.map((op) => {
          return { ...op };
        });
        op.op(opsCopy);
        solveInner(start, curr, opsCopy, newMovesMade, movesLeft - 1, goal);
      } else if (op.symbol === "st") {
        const newOps = [...ops];
        const [oldSt, oldPl] = ops.slice(ops.length - 2);
        ops.splice(ops.length - 2, 2, ...storeFuncs(oldPl.op(0)));
        oldSt.op(curr);
        solveInner(start, curr, newOps, newMovesMade, movesLeft - 1, goal);
      } else {
        let next = op.op(curr);
        if (
          !Number.isInteger(next) ||
          next === curr ||
          next === start ||
          next > 9999999
        ) {
          continue;
        }
        if (next === goal) return solution.push(...newMovesMade);
        while (("" + next).length >= st + 1) next = teleport(next, st, end);
        solveInner(start, next, ops, newMovesMade, movesLeft - 1, goal);
      }
    }
  };
  solveInner(start, start, ops, [], movesLeft, goal);
  if (!solution.length) console.log("No Solution Found");
  return solution;
};

function addFunc(a) {
  return a + this.number;
}

function subFunc(a) {
  return a - this.number;
}

function putFunc(a) {
  return +("" + a + this.number);
}

function mulFunc(a) {
  return a * this.number;
}

function divFunc(a) {
  return a / this.number;
}

function powFunc(a) {
  return a ** this.number;
}

const shiftLeft = (a) => +(("" + a).substr(1) + ("" + a).charAt(0));

const teleport = (n, start, end) => {
  const s = ("00" + n).split("");
  const len = s.length;
  let b = +s[len - end - 1];
  let a = +s.splice(len - start - 1, 1)[0];
  let index = len - end - 2;
  while (b || a) {
    const sum = a + b;
    s[index--] = "" + (sum % 10);
    b = floor(sum / 10);
    a = +s[index];
  }
  return +s.join("");
};

console.log(teleport(1000, 3, 1));

const shiftRight = (a) => {
  const s = "" + a;
  return +(s.charAt(s.length - 1) + s.substr(0, s.length - 1));
};
const revAbs = (a) => ("" + abs(a)).split("").reverse().join("");
const replaceFunc = (b, c) => (a) =>
  +("" + a).replace(new RegExp("" + b, "gi"), "" + c);

const removeLastDigit = (a) => floor(a / 10);
const reverse = (a) => (+revAbs(a) * abs(a)) / a;
const sum = (a) =>
  (("" + abs(a)).split("").reduce((a, b) => a + +b, 0) * abs(a)) / a;

const mirror = (a) => +(a + revAbs(a));
const inv = (a) =>
  (+("" + abs(a))
    .split("")
    .map((n) => (+n ? "" + abs(+n - 10) : "0"))
    .join("") *
    abs(a)) /
  a;

function changeFunc(arr) {
  arr.forEach((f) => {
    if (f.canChange) {
      const sign = f.number < 0 ? -1 : 1;
      const tokens = f.symbol.split(" ");
      f.symbol = tokens[0] + " " + (+tokens[1] + this.number * sign);
      f.number += this.number * sign;
    }
  });
}

const getFunc = (symbol) => {
  const tokens = symbol.split(" ");
  const a = +tokens[1];
  const b = tokens[2];
  switch (tokens[0]) {
    case "+":
      return [true, addFunc, a];
    case "-":
      return [true, subFunc, a];
    case "*":
      return [true, mulFunc, a];
    case "/":
      return [true, divFunc, a];
    case "e":
      return [true, powFunc, a];
    case "p":
      return [true, putFunc, a];
    case "=>":
      return [false, replaceFunc(a, b)];
    case "<<":
      return [false, removeLastDigit];
    case "sum":
      return [false, sum];
    case "<":
      return [false, shiftLeft];
    case ">":
      return [false, shiftRight];
    case "m":
      return [false, mirror];
    case "[+]":
      return [false, changeFunc, a];
    case "r":
      return [false, reverse];
    case "inv":
      return [false, inv];
    default:
      return [false, () => {}];
  }
};

export const storeFuncs = (start) => {
  let save = start;
  const store = { symbol: "st", op: (a) => (save = a) };
  const place = { symbol: "pl", op: (a) => +("" + a + save) };
  return [store, place];
};

export const opObject = (symbol) => {
  const [canChange, op, number] = getFunc(symbol);
  return {
    canChange: canChange,
    symbol: symbol,
    op: op,
    number: number,
  };
};

export default solve;
