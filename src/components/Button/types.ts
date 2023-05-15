import { buttonGroup, operator } from "../../misc";

export type ButtonProps = {
  operator: operator;
  onClick?: () => void;
  className?: string;
  canChange?: boolean;
  addButton?: (button: buttonGroup[number]) => void;
};
