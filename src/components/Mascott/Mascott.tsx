import "./Mascott.css";
import { MascottProps } from "./types";

export const Mascott = ({ emotion = "happy" }: MascottProps) => {
  return (
    <div className={`mascott face`}>
      <div className={`eye ${emotion}`}>
        <div className={`pupil ${emotion}`}></div>
        {emotion === "sad" ? (
          <div className="tear">
            <div></div>
            <div></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={`eye ${emotion}`}>
        <div className={`pupil ${emotion}`}></div>
        {emotion === "sad" ? (
          <div className="tear">
            <div></div>
            <div></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={`mouth ${emotion}`}>
        <div className={`tongue ${emotion}`}></div>
      </div>
    </div>
  );
};
