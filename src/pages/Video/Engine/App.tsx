import React from "react";
import {
  Engine,
  ExampleGenerator,
  ExampleLog,
  ParamsComponent,
} from "./Engine";
import { fsrs, FSRSVersion } from "ts-fsrs";

export const App = () => {
  const [cards, setCards] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [f, setF] = React.useState(fsrs());
  console.log({ cards, logs });
  return (
    <div className="w-full text-white">
      <div className="text-xl text-center text-white">
        Current TS-FSRS Version:{FSRSVersion}
      </div>
      <div className="text-lg text-center">Example</div>
      <div className="flex">
        <Engine
          cardRecord={cards}
          f={f}
          className={"flex-initial w-1/2 pr-2 "}
        />
        <ExampleLog logRecord={logs} className={"flex-initial w-1/2"} />
      </div>
      <div className="flex justify-center mt-8">
        <ExampleGenerator
          cards={cards}
          setCards={setCards}
          setLogs={setLogs}
          f={f}
        />
      </div>
      <ParamsComponent f={f} setF={setF} />
    </div>
  );
};
