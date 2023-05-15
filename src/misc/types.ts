export type operator =
  | "+"
  | "-"
  | "×"
  | "÷"
  | "<<"
  | "P"
  | "=>"
  | "X"
  | "+/-"
  | "Reverse"
  | "SUM"
  | "Shift <"
  | "Shift >"
  | "Mirror"
  | "[+]"
  | "Store"
  | "Place"
  | "Inv10"
  | "CLR"
  | "OK"
  | "default";

export type Button = {
  operator: operator;
  number: number;
  number2?: string;
  canChange: boolean;
  opFunc: WithThis<Button, funcA> | WithThis<Button, funcB>;
};

export type WithThis<TThisType, TFunc> = TFunc extends (
  ...args: infer TArgs
) => infer TReturnType
  ? (this: TThisType, ...args: TArgs) => TReturnType
  : never;

type funcA = (n: number) => number;
type funcB = (buttons: Button[]) => void;
export type funcOp = WithThis<Button, funcA>;

export type buttonGroup = Omit<Button, "canChange" | "opFunc">[];

export type genButtonArgs = {
  operator: operator;
  number: number;
  number2?: string;
};
