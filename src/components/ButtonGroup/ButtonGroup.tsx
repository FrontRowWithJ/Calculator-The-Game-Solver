import { ButtonGroupProps } from "./types";
import "./ButtonGroup.css";
import { Button } from "../Button";
import { DisplayButton } from "../DisplayButton";

export const ButtonGroup = ({
  buttonGroup,
  clearButtonGroup,
  showSolution,
  setButtonGroup,
}: ButtonGroupProps) => {
  const removeButton = (index: number) => {
    setButtonGroup((buttons) => {
      const newButtons = [...buttons];
      newButtons.splice(index, 1);
      return newButtons;
    });
  };
  const clearButton = <Button operator="CLR" onClick={clearButtonGroup} />;
  const emptyButton = <DisplayButton operator="default" />;
  const [first, ...rest] = buttonGroup;
  const firstButton = first ? (
    <DisplayButton {...first} clear={() => removeButton(0)} canShowDelete />
  ) : (
    emptyButton
  );
  const restButtons = rest.map((props, i) => (
    <DisplayButton {...props} clear={() => removeButton(i + 1)} canShowDelete />
  ));
  for (let i = 0; i < 4 - rest.length; i++) restButtons.push(emptyButton);
  const buttons = [firstButton, clearButton, ...restButtons];
  return (
    <div className="button-group">
      {buttons.map((props, i) => {
        const _i = i >> 1;
        const _j = i % 2;

        return (
          <div
            key={i}
            className="button"
            style={{
              gridRow: `${_i + 1} / ${_i + 2}`,
              gridColumn: `${_j + 1} / ${_j + 2}`,
            }}
            onClick={() => {}}
          >
            {props}
          </div>
        );
      })}
      <Button operator="OK" onClick={showSolution} />
    </div>
  );
};
