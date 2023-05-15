export type ChangeButtonsProps = {
  has2ndNumber?: boolean;
  setNumber?: React.Dispatch<React.SetStateAction<number>>;
  setNumber2?: React.Dispatch<React.SetStateAction<string>>;
  className: "number2-a" | "number2-b";
};
