import { operator } from "../../misc";

export type ButtonLabelProps = {
  canChange: boolean;
  has2ndNumber?: boolean;
  number?: number;
  operator?: operator;
  number2?: string;
  canShowOp: boolean;
  isDisplayButton?: boolean;
};
