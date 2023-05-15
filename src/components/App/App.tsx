import { useState } from "react";
import "./App.css";
import { ButtonGroup } from "../ButtonGroup";
import { ButtonMenu } from "../ButtonMenu";
import { SevenSegmentDisplay } from "../SevenSegmentDisplay";
import { Solution } from "../Solution";
import { buttonGroup } from "../../misc";

export const App = () => {
  const [buttonGroup, setButtonGroup] = useState<buttonGroup>([]);
  const [moves, setMoves] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [canShowResult, setCanShowResult] = useState(false);
  const [teleportFrom, setTeleportFrom] = useState<number | undefined>(
    undefined
  );
  const [teleportTo, setTeleportTo] = useState<number | undefined>(undefined);
  const addButton = (button: buttonGroup[number]) => {
    setCanShowResult(false);
    setButtonGroup((buttons) => {
      if (buttons.length >= 5) return buttons;
      return [...buttons, button];
    });
  };
  const clearButtonGroup = () => {
    setCanShowResult(false);
    setButtonGroup([]);
  };
  const startLength = 5;
  return (
    <main className="App">
      <section className="top">
        <Solution
          operations={buttonGroup}
          moves={parseInt(moves)}
          canShowResult={canShowResult}
          start={parseInt(start)}
          goal={parseInt(goal)}
          teleportFrom={teleportFrom}
          teleportTo={teleportTo}
        />
      </section>
      <section className="middle">
        <SevenSegmentDisplay
          numberOfDigits={3}
          value={moves}
          setValue={(valueOrCallback) => {
            setCanShowResult(false);
            setMoves(valueOrCallback);
          }}
          label="Moves"
        />
        <SevenSegmentDisplay
          numberOfDigits={5}
          value={goal}
          setValue={(valueOrCallback) => {
            setCanShowResult(false);
            setGoal(valueOrCallback);
          }}
          label="Goal"
        />
        <SevenSegmentDisplay
          numberOfDigits={startLength}
          value={start}
          setValue={(valueOrCallback) => {
            setCanShowResult(false);
            setStart(valueOrCallback);
          }}
          label="Start"
          canTeleport
          setTeleportFrom={(i, val) => {
            setCanShowResult(false);
            setTeleportFrom(val ? startLength - i - 1 : undefined);
          }}
          setTeleportTo={(i, val) => {
            setCanShowResult(false);
            setTeleportTo(val ? startLength - i - 1 : undefined);
          }}
        />
      </section>
      <section className="bottom">
        <div>
          <ButtonMenu {...{ addButton }} />
          <ButtonGroup
            {...{
              buttonGroup,
              setButtonGroup: (buttons) => {
                setCanShowResult(false);
                setButtonGroup(buttons);
              },
              clearButtonGroup,
              showSolution: () => setCanShowResult(true),
            }}
          />
        </div>
      </section>
    </main>
  );
};
