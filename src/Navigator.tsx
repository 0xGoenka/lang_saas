import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Video } from "./pages/Video/Video";
import { Feedback } from "./pages/Video/Feedback";
import { PlayAgain } from "./pages/Video/PlayAgain";

export const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Video} />
        <Route path="/feedback" Component={Feedback} />
        <Route path="/playagain" Component={PlayAgain} />
      </Routes>
    </BrowserRouter>
  );
};
