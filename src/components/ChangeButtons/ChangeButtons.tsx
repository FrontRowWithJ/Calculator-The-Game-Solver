import { ChangeButtonsProps } from "./types";
import "./ChangeButtons.css";
import { change } from "../../misc/util";

export const ChangeButtons = ({
  setNumber,
  has2ndNumber,
  className,
  setNumber2,
}: ChangeButtonsProps) => {

  const onWheel = ({ deltaY }: React.WheelEvent<HTMLDivElement>) => {
    const inc = -Math.sign(deltaY);
    setNumber && setNumber((number) => number + inc);
    setNumber2 && setNumber2(change(inc));
  };

  return (
    <>
      <div
        className={`increase ${has2ndNumber ? className : ""}`}
        onClick={() => {
          if (setNumber2) return setNumber2(change(1));
          setNumber && setNumber((number) => number + 1);
        }}
        onWheel={onWheel}
      >
        <div className="triangle-up"></div>
      </div>
      <div
        className={`decrease ${has2ndNumber ? className : ""}`}
        onClick={() => {
          if (setNumber2) return setNumber2(change(-1));
          setNumber && setNumber((number) => number - 1);
        }}
        onWheel={onWheel}
      >
        <div className="triangle-down"></div>
      </div>
    </>
  );
};
