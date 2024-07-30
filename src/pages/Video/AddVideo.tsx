import { NavigateFunction, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { PrimaryButton } from "../../components/Button";
import { useEffect, useState } from "react";
import getYouTubeID from "get-youtube-id";
import axios from "axios";
import { WebVTTParser } from "webvtt-parser";
import { E_Difficulty } from "../../constants/contants";
import toast from "react-hot-toast";
import { DBService } from "../../services/db.service";

const dbService = new DBService();

const getSubs = async (video_id: string, navigate: NavigateFunction) => {
  try {
    const res = await axios.post("http://46.101.122.170:3000/get_sub", {
      video_id,
    });

    const subtitlesVtt = res.data;
    const splittedFile = subtitlesVtt.split("\n");
    const title = splittedFile[splittedFile.length - 1];

    console.log("res", res, "title", title);

    const parser = new WebVTTParser();
    const { cues } = parser.parse(subtitlesVtt, "metadata");
    const formatedCues = cues.map((cue) => ({
      video_id,
      subtitle: cue,
      difficulty: E_Difficulty.TOO_HARD,
    }));

    await dbService.addVideo(video_id, title);
    // await dbService.bulkAddSubtitle(formatedCues);

    console.log("formatedCues", formatedCues);
  } catch (error) {
    console.log("error", error);
    // throw error.response.data;
  } finally {
    navigate("/");
  }
};

export const AddVideo = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const id = getYouTubeID(url, { fuzzy: false });
    console.log("Youtube ID", id);
    if (id) {
      toast.promise(getSubs(id, navigate), {
        loading: "Loading subtitles...",
        success: <b>Subtitles saved!</b>,
        error: (err) => `${err.toString()}`,
      });
    }
  }, [url]);

  return (
    <div>
      <Header text="Library" onClick={() => navigate("/")} />
      <div className="flex justify-center items-center h-[80vh] text-lightGrey">
        <div>
          <div className="text-3xl text-center">Add Video</div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-dark px-4 py-1 w-full my-[16px] border-2 border-lightGrey rounded-md"
            placeholder="youtube url"
          />
          <PrimaryButton onClick={() => {}}>Add</PrimaryButton>
        </div>
      </div>
    </div>
  );
};
