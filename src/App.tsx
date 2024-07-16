import { useEffect, useState } from "react";
import "./App.css";
import YouTube, { YouTubeProps } from "react-youtube";
import { CaptionService } from "./caption.service";
import { Navigator } from "./Navigator";
import { ServicesProvider } from "./services/Services";
import { AppContainer } from "./components/AppContainer";

function youtube_parser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

function App() {
  // const [url, setUrl] = useState("https://www.youtube.com/watch?v=nr8biZfSZ3Y");
  // const [id, setID] = useState("");

  // useEffect(() => {
  //   const id = youtube_parser(url);
  //   console.log({ url, id });
  //   if (id) {
  //     setID(id);
  //   }
  // }, [url]);

  // if (id) {
  //   return (
  //     <div className="h-full w-full zindex-[100] border-3 bg-dark h-screen">
  //       <YouTube
  //         videoId={id}
  //         onReady={onPlayerReady}
  //         onStateChange={onStateChange}
  //       />
  //     </div>
  //   );
  // }

  return (
    <AppContainer>
      <ServicesProvider>
        <Navigator />
      </ServicesProvider>
    </AppContainer>
  );

  return (
    <>
      <div className="card">
        <input
          placeholder="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        ></input>
        <button>Search</button>
      </div>
    </>
  );
}

const onStateChange: YouTubeProps["onStateChange"] = (event) => {
  // access to player in all event handlers via event.target
  console.log("onStateChange", event.data, event.target.getCurrentTime());
};

const onPlayerReady: YouTubeProps["onReady"] = (event) => {
  // access to player in all event handlers via event.target
  console.log("onPlayerReady", event.data);
};

export default App;
