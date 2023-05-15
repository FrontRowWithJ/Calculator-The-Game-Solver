import { operator } from "../../misc";

export type DisplayButtonProps = {
  operator: operator;
  number?: number;
  number2?: string;
  clear?: () => void;
  canShowDelete?: boolean;
};
