import { ButtonLabelProps } from "./types";
import "./ButtonLabel.css";

export const DefaultLabel = (props: ButtonLabelProps) => {
  const {
    canChange,
    has2ndNumber,
    operator,
    number,
    number2,
    canShowOp,
    isDisplayButton,
  } = props;
  return (
    <>
      {has2ndNumber ? number : ""}
      {canShowOp ? operator : ""}
      {has2ndNumber ? (
        <span style={{ color: isDisplayButton ? "" : "transparent" }}>
          {number2}
        </span>
      ) : canChange ? (
        number
      ) : (
        ""
      )}
    </>
  );
};

export const ExponentLabel = (props: ButtonLabelProps) => {
  const { number, canShowOp } = props;
  return (
    <span>
      {canShowOp ? "X" : ""}
      <sup>{number}</sup>
    </span>
  );
};
