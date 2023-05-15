import { SevenSegmentDisplayProps } from "./types";
import "./SevenSegmentDisplay.css";
import { SevenSegment } from "../SevenSegment/SevenSegment";
import { useRef, useState } from "react";
import { SevenSegmentProps } from "../SevenSegment/types";
import { useToggle, getNumber } from "../../misc/util";

const width = 50;
const height = 10;

export const SevenSegmentDisplay = ({
  numberOfDigits,
  value,
  setValue,
  label,
  canTeleport,
  setTeleportFrom,
  setTeleportTo,
}: SevenSegmentDisplayProps) => {
  const max = 10 ** numberOfDigits - 1;
  const min = -(10 ** (numberOfDigits - 1) - 1);
  const number = getNumber(value, min, max);
  const digits = number
    .toString()
    .padStart(numberOfDigits, "x")
    .split("") as SevenSegmentProps["value"][];
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [teleportFroms, setTeleportFroms] = useToggle(
    numberOfDigits,
    setTeleportFrom
  );
  const [teleportTos, setTeleportTos] = useToggle(
    numberOfDigits,
    setTeleportTo
  );

  const change = (delta: number) => {
    setValue((value) => {
      const n = parseInt(value);
      if (isNaN(n)) return "0";
      return Math.max(min, Math.min(n + delta, max)).toString();
    });
  };

  return (
    <div
      onClick={() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
        inputRef.current.select();
        setIsHighlighted(true);
      }}
      className="seven-segment-display"
      style={{ gridTemplateColumns: `repeat(${numberOfDigits}, 1fr)` }}
      onWheel={({ deltaY }) => {
        change(Math.sign(-deltaY));
        setIsHighlighted(false);
      }}
    >
      <div className="label">{label}</div>
      {digits.map((value, key) => {
        return (
          <SevenSegment
            {...{
              key,
              value,
              width,
              height,
              isHighlighted: isHighlighted && value !== "x",
              isCurrent: key === digits.length - 1 && isSelected,
              canTeleport,
              canTeleportFrom: teleportFroms[key],
              canTeleportTo: teleportTos[key],
              toggleTeleportFrom: () => setTeleportFroms(key),
              toggleTeleportTo: () => setTeleportTos(key),
            }}
          />
        );
      })}
      <input
        type="text"
        ref={inputRef}
        value={number}
        onChange={({ target: { value } }) => {
          if (!/^-?\d*$/.test(value)) return;
          setValue(value);
          setIsHighlighted(false);
        }}
        onKeyUp={({ key }) => {
          if (key === "ArrowUp") change(1);
          if (key === "ArrowDown") change(-1);
          if (key === "ArrowUp" || key === "ArrowDown") setIsHighlighted(false);
        }}
        onFocus={() => {
          setIsSelected(true);
          setIsHighlighted(true);
        }}
        onBlur={() => {
          setIsSelected(false);
          setIsHighlighted(false);
        }}
      />
    </div>
  );
};
