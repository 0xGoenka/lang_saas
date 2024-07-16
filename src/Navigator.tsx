import { BrowserRouter, Route } from "react-router-dom";
import { Video } from "./pages/Video/Video";
import { Feedback } from "./pages/Video/Feedback";
import { PlayAgain } from "./pages/Video/PlayAgain";

export const Navigator = () => {
  return (
    <BrowserRouter>
      <Route path="/" Component={Video} />
      <Route path="/feedback" Component={Feedback} />
      <Route path="/playagain" Component={PlayAgain} />
    </BrowserRouter>
  );
};
