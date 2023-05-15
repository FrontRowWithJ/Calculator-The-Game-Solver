import { SVGProps } from "./types";

type SegmentProps = SVGProps & { v?: boolean; w: number; h: number };

export const Segment = ({
  fill,
  v = false,
  w,
  h,
  stroke,
  className,
}: SegmentProps) => {
  const width = v ? h : w;
  const height = v ? w : h;
  const w2 = width * 0.5;
  const h2 = height * 0.5;
  const { viewBox, d } = v
    ? {
        viewBox: `0 0 ${width} ${height}`,
        d: ` M ${w2} 0 l ${w2} ${w2} v ${
          height - width
        } l -${w2} ${w2} l -${w2} -${w2} v -${height - width} z`,
      }
    : {
        viewBox: `0 0 ${width} ${height}`,
        d: `M 0 ${h2} l ${h2} -${h2} h ${
          width - height
        } l ${h2} ${h2} l -${h2} ${h2} h -${width - height} z`,
      };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
    >
      <path {...{ d, fill, stroke, strokeWidth: 1 }} />
    </svg>
  );
};
