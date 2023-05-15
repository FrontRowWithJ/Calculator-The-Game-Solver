import { buttonGroup } from "../../misc";

export type SolutionProps = {
  moves: number;
  canShowResult?: boolean;
  operations: buttonGroup;
  start: number;
  goal: number;
  teleportFrom: number | undefined;
  teleportTo: number | undefined;
};
