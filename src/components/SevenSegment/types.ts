export type SevenSegmentProps = {
  value: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "-" | "x";
  width: number;
  height: number;
  isHighlighted?: boolean;
  isCurrent?: boolean;
  canTeleport?: boolean;
  canTeleportTo?: boolean;
  canTeleportFrom?: boolean;
  toggleTeleportFrom?: () => void;
  toggleTeleportTo?: () => void;
};
