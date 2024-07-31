import { useLiveQuery } from "dexie-react-hooks";
import { Footer } from "../../components/Footer";
import { Loader } from "../../components/Loader";
import { db, Video } from "../../services/db.service";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";

export const Library = () => {
  const videos = useLiveQuery(() => db.videos.toArray());
  const navigate = useNavigate();

  console.log("videos", videos);
  return (
    <div className="max-h-screen flex-col flex">
      <div className="mt-[24px] mb-[40px] text-lightGrey text-3xl font-bold">
        Video library
      </div>
      <div className="overflow-y-auto flex-1 flex flex-col">
        {videos?.map((video) => (
          <LibVideo key={video.id} video={video} />
        ))}
      </div>
      <div>
        <PrimaryButton
          onClick={() => {
            navigate("/add_video");
          }}
        >
          Add a video
        </PrimaryButton>
        <Footer />
      </div>
    </div>
  );
};

export const LibVideo = ({ video }: { video: Video }) => {
  console.log("video.video_id", video.video_id);
  const navigate = useNavigate();
  const learned_subtitles = useLiveQuery(() =>
    db.subtitles
      .where("video_id")
      .equals(video.video_id)
      .and((subtitle) => subtitle.fsrsCard.due > new Date())
      .toArray()
  );

  console.log("learned_subtitles", learned_subtitles?.length);

  const count = useLiveQuery(() =>
    db.subtitles.where("video_id").equals(video.video_id).count()
  );

  if (!count || !learned_subtitles) return null;

  const progress = ((learned_subtitles?.length ?? 1) / count) * 100;

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
        <div className={`items-end flex videoid_${video.video_id}`}>
          <Loader
            progress={Math.round(progress).toString()}
            id={video.video_id}
          />
          <div className="ml-[14px] text-xs text-grey font-bold">
            {learned_subtitles?.length ?? 1} out of {count} mastered
          </div>
        </div>
      </div>
    </div>
  );
};
