export type SevenSegmentDisplayProps = {
  numberOfDigits: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  canTeleport?: boolean;
  setTeleportFrom?: (i: number, val: boolean) => void;
  setTeleportTo?: (i: number, val: boolean) => void;

};
