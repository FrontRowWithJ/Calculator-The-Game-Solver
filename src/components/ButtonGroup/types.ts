import { buttonGroup } from "../../misc";

export type ButtonGroupProps = {
  buttonGroup: buttonGroup;
  clearButtonGroup: () => void;
  showSolution: () => void;
  setButtonGroup: React.Dispatch<React.SetStateAction<buttonGroup>>;
};
