import { SolutionProps } from "./types";
import "./Solution.css";
import { DisplayButton } from "../DisplayButton";
import { genButton, solve } from "../../misc";
import { Mascott } from "../Mascott";

export const Solution = ({
  operations,
  canShowResult,
  moves,
  start,
  goal,
  teleportFrom,
  teleportTo,
}: SolutionProps) => {
  const solution: ReturnType<typeof solve> = [];
  if (
    canShowResult &&
    !isNaN(start) &&
    !isNaN(goal) &&
    !isNaN(moves) &&
    operations.length > 0
  ) {
    const ops = operations.map(genButton);
    solution.push(
      ...solve(start, ops.flat(), moves, goal, teleportFrom, teleportTo)
    );
  }
  const isSolution = !(canShowResult && !solution.length);
  return (
    <div className="solution-container">
      <Mascott emotion={isSolution ? "happy" : "sad"} />
      {isSolution ? (
        <div
          className="solution"
          style={{
            gridTemplateColumns: `repeat(${solution.length}, 1fr)`,
          }}
        >
          {solution.map((props, key) => (
            <DisplayButton {...{ ...props, key }} />
          ))}
        </div>
      ) : (
        <div className="no-solution">No solution found</div>
      )}
    </div>
  );
};
