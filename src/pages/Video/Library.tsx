import { useLiveQuery } from "dexie-react-hooks";
// import { PrimaryButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Loader } from "../../components/Loader";
import { db, Video } from "../../services/db.service";
import { useNavigate } from "react-router-dom";

export const Library = () => {
  const videos = useLiveQuery(() => db.videos.toArray());
  // const navigate = useNavigate();

  console.log("videos", videos);
  return (
    <div className="h-screen flex-col flex">
      <div className="flex-1 flex flex-col">
        <div className="mt-[24px] mb-[40px] text-lightGrey text-3xl font-bold">
          Video library
        </div>
        <div className="flex-1 overflow-y-auto">
          {videos?.map((video) => (
            <LibVideo key={video.id} video={video} />
          ))}
        </div>
      </div>
      <div>
        {/* <PrimaryButton
          onClick={() => {
            navigate("/add_video");
          }}
        >
          Add a video
        </PrimaryButton> */}
        <Footer />
      </div>
    </div>
  );
};

export const LibVideo = ({ video }: { video: Video }) => {
  console.log("video.video_id", video.video_id);
  const navigate = useNavigate();
  // const easy_subtitles = useLiveQuery(() =>
  //   db.subtitles
  //     .where("video_id")
  //     .equals(video.video_id)
  //     .and((subtitle) => subtitle.difficulty === E_Difficulty.EASY)
  //     .toArray()
  // );

  const count = useLiveQuery(() =>
    db.subtitles.where("video_id").equals(video.video_id).count()
  );

  if (!count) return null;

  const progress = ((1 + 1) / count) * 100;

  // console.log(
  //   "progress",
  //   progress,
  //   "videoId",
  //   video.video_id,
  //   "count",
  //   count,
  //   "easy_subtitles",
  //   easy_subtitles.length,
  //   easy_subtitles?.length + 1,
  //   ((easy_subtitles?.length + 1) / count) * 100,
  //   Math.round(progress).toString()
  // );

  return (
    <div
      className="flex text-lightGrey cursor-pointer mb-[16px]"
      onClick={() => navigate(`/video/${video.video_id}`)}
    >
      <div className="flex-1 mr-[16px]">
        <img
          src={`https://i.ytimg.com/vi/${video.video_id}/mqdefault.jpg`}
          alt="youtube thumbnail"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="font-bold text-xs leading-[15px]">{video.name}</div>
        <div className={`items-end flex ${video.video_id}`}>
          <Loader
            progress={Math.round(progress).toString()}
            id={video.video_id}
          />
          <div className="ml-[14px] text-xs text-grey font-bold">
            {1 + 1} out of {count} mastered
          </div>
        </div>
      </div>
    </div>
  );
};
