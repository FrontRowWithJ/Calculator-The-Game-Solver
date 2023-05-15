import { SevenSegmentProps } from "./types";
import "./SevenSegment.css";
import { Segment } from "../../resources/SVG";

const classNames = [
  "top",
  "top-left",
  "top-right",
  "middle",
  "bottom-left",
  "bottom-right",
  "bottom",
];

const digitMap = {
  0: [true, true, true, false, true, true, true],
  1: [false, false, true, false, false, true, false],
  2: [true, false, true, true, true, false, true],
  3: [true, false, true, true, false, true, true],
  4: [false, true, true, true, false, true, false],
  5: [true, true, false, true, false, true, true],
  6: [true, true, false, true, true, true, true],
  7: [true, false, true, false, false, true, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true],
  x: [false, false, false, false, false, false, false],
  "-": [false, false, false, true, false, false, false],
} as const;

export const SevenSegment = ({
  value,
  width,
  height,
  isHighlighted,
  isCurrent,
  canTeleport,
  canTeleportFrom,
  canTeleportTo,
  toggleTeleportFrom = () => {},
  toggleTeleportTo = () => {},
}: SevenSegmentProps) => {
  const number = digitMap[value];
  const fill = `#${isHighlighted ? "FFFFFF" : "363A32"}`;
  const backgroundColor = isHighlighted ? "#3589EB" : "";
  const stroke = isHighlighted ? "#3589EB" : "#a6b7a4";
  return (
    <div
      className="seven-segment-container-wrapper"
      style={{
        backgroundColor: isHighlighted ? "#3589EB" : "",
      }}
    >
      <div
        className="teleport"
        style={{ visibility: canTeleport ? "visible" : "hidden" }}
        onClick={(evt) => {
          evt.stopPropagation();
          toggleTeleportTo();
        }}
      >
        <div
          className="triangle-down"
          style={{
            borderBottomColor: `${fill}${canTeleportTo ? "" : "32"}`,
          }}
        ></div>
      </div>

      <div
        className="seven-segment-container"
        style={
          {
            "--segment-width": `${width}px`,
            "--segment-height": `${height}px`,
            backgroundColor,
          } as any
        }
      >
        {classNames.map((className, index) => (
          <div className={`segment ${className}`} key={index}>
            <Segment
              w={width}
              h={height}
              fill={`${fill}${number[index] ? "" : "32"}`}
              v={index % 3 !== 0}
              stroke={stroke}
            />
          </div>
        ))}
      </div>
      <div
        className="teleport"
        style={{ visibility: canTeleport ? "visible" : "hidden" }}
        onClick={(evt) => {
          evt.stopPropagation();
          toggleTeleportFrom();
        }}
      >
        <div
          className="triangle-down"
          style={{
            borderBottomColor: `${fill}${canTeleportFrom ? "" : "32"}`,
          }}
        ></div>
      </div>
      {isCurrent && (
        <Segment className="cursor" w={width} h={height} fill={fill} />
      )}
    </div>
  );
};
