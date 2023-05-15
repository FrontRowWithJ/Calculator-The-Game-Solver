import { useState } from "react";
import { change, darkenHex, values } from "../../misc/util";
import "./Button.css";
import { ButtonProps } from "./types";
import { ChangeButtons } from "../ChangeButtons";
import { DefaultLabel, ExponentLabel } from "../ButtonLabel";

export const Button = ({
  operator,
  className,
  addButton,
  onClick,
}: ButtonProps) => {
  const { backgroundColor, canChange, canShowOp, has2ndNumber } =
    values[operator];
  const [translateY, setTranslateY] = useState<"0%" | "14.2%">("0%");
  const [number, setNumber] = useState<number>(0);
  const [number2, setNumber2] = useState<string>("0");
  const Label = operator === "X" ? ExponentLabel : DefaultLabel;
  const isOkOrClr = /^OK|CLR$/g.test(operator);
  const onPointerDown: React.MouseEventHandler<HTMLElement> = ({ target }) => {
    const className = (target as HTMLElement).className;
    if (className.includes("triangle")) return;
    setTranslateY("14.2%");
  };

  const onPointerUp = () => setTranslateY("0%");
  return (
    <div className={className}>
      <div
        className="button-container no-select"
        onClick={() => {
          if (operator === "CLR") onClick && onClick();
          else if (operator === "OK") onClick && onClick();
        }}
      >
        <div
          className="button"
          style={{
            backgroundColor,
            transform: `translateY(${translateY})`,
          }}
          onPointerUp={isOkOrClr ? onPointerUp : undefined}
          onPointerDown={isOkOrClr ? onPointerDown : undefined}
          onPointerLeave={isOkOrClr ? onPointerUp : undefined}
        >
          {canChange && has2ndNumber ? (
            <>
              <ChangeButtons
                {...{ has2ndNumber, setNumber2, className: "number2-a" }}
              />
              <input
                className="number-2-label"
                type="text"
                value={number2}
                onChange={({ target: { value } }) => setNumber2(value)}
                onWheel={({ deltaY }) => setNumber2(change(-Math.sign(deltaY)))}
              />
            </>
          ) : (
            <></>
          )}
          {canChange ? (
            <ChangeButtons
              {...{ has2ndNumber, setNumber, className: "number2-b" }}
            />
          ) : (
            <></>
          )}
          <Label
            {...{
              canChange,
              has2ndNumber,
              operator,
              number,
              number2,
              canShowOp,
            }}
          />
        </div>
        <span
          style={{ backgroundColor: darkenHex(backgroundColor, 0.3) }}
        ></span>
      </div>
      {!isOkOrClr ? (
        <button
          className="noselect"
          onClick={() => addButton && addButton({ operator, number, number2 })}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          Add
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
