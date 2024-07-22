import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Video } from "./pages/Video/Video";
import { Feedback } from "./pages/Video/Feedback";
import { PlayAgain } from "./pages/Video/PlayAgain";
import { Library } from "./pages/Video/Library";

export const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Video} />
        <Route path="/feedback" Component={Feedback} />
        <Route path="/playagain" Component={PlayAgain} />
        <Route path="/library" Component={Library} />
      </Routes>
    </BrowserRouter>
  );
};
