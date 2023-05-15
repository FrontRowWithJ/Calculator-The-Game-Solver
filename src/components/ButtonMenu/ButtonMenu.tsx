import { ButtonMenuProps } from "./types";
import "./ButtonMenu.css";
import { Button } from "../Button";
import { values } from "../../misc/util";
import { operator } from "../../misc";

export const ButtonMenu = ({ addButton }: ButtonMenuProps) => {
  return (
    <div className="button-menu">
      {Object.keys(values)
        .filter((s) => !/^OK|CLR|Place|default$/g.test(s))
        .map((operator) => (
          <Button
            key={operator}
            operator={operator as operator}
            {...{ addButton }}
          />
        ))}
    </div>
  );
};
