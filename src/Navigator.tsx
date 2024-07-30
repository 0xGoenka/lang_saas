import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Video } from "./pages/Video/Video";
import { Feedback } from "./pages/Video/Feedback";
import { PlayAgain } from "./pages/Video/PlayAgain";
import { Library } from "./pages/Video/Library";
import { AddVideo } from "./pages/Video/AddVideo";
import { Toaster } from "react-hot-toast";

export const Navigator = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/video/:video_id" Component={Video} />
        <Route path="/feedback" Component={Feedback} />
        <Route path="/playagain" Component={PlayAgain} />
        <Route path="/add_video" Component={AddVideo} />
        <Route path="/" Component={Library} />
      </Routes>
    </BrowserRouter>
  );
};
