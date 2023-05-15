import { DisplayButtonProps } from "./types";
import "./DisplayButton.css";
import { darkenHex, values } from "../../misc/util";
import { DefaultLabel, ExponentLabel } from "../ButtonLabel";

const emptyButton = {
  backgroundColor: "#b6b1a5",
  canChange: false,
  canShowOp: false,
  has2ndNumber: false,
} as const;

export const DisplayButton = ({
  operator,
  number,
  number2,
  clear,
  canShowDelete,
}: DisplayButtonProps) => {
  const Label = operator === "X" ? ExponentLabel : DefaultLabel;
  const { backgroundColor, canShowOp, has2ndNumber, canChange } = operator
    ? values[operator]
    : emptyButton;

  const canDelete = !/^OK|CLR|default$/g.test(operator);
  return (
    <div>
      <div className="button-container" onClick={clear}>
        <div className="button" style={{ backgroundColor }}>
          <Label
            {...{
              canChange,
              has2ndNumber,
              operator,
              number,
              number2,
              canShowOp,
            }}
            isDisplayButton
          />
        </div>
        <span
          style={{ backgroundColor: darkenHex(backgroundColor, 0.3) }}
        ></span>
      </div>

      <button
        className="noselect"
        onClick={clear}
        style={{
          visibility: canDelete && canShowDelete ? "visible" : "hidden",
          backgroundColor: "rgb(196, 44, 44)",
        }}
      >
        Delete
      </button>
    </div>
  );
};
