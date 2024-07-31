import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { PrimaryButton } from "../../components/Button";
import { ChangeEvent } from "react";
import { useServices } from "../../services/Services";
import { useObservable } from "micro-observables";
import toast from "react-hot-toast";

export const AddVideo = () => {
  const navigate = useNavigate();
  const { addVideoService } = useServices();

  const url = useObservable(addVideoService.videoUrl);
  const videoName = useObservable(addVideoService.videoName);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    addVideoService.setSubtitles(event.target.files);
  };

  return (
    <div>
      <Header text="Library" onClick={() => navigate("/")} />
      <div className="flex justify-center items-center h-[80vh] text-lightGrey">
        <div>
          <div className="text-3xl text-center">Add Video</div>
          <label>Youtube url</label>
          <input
            type="text"
            value={url}
            onChange={(e) => addVideoService.setVideoUrl(e.target.value)}
            className="text-dark px-4 py-1 w-full my-[16px] border-2 border-lightGrey rounded-md"
            placeholder="youtube url"
          />
          <label>Video title</label>
          <input
            type="text"
            value={videoName}
            onChange={(e) => addVideoService.setVideoName(e.target.value)}
            className="text-dark px-4 py-1 w-full my-[16px] border-2 border-lightGrey rounded-md"
            placeholder="Video title"
          />
          <label>Srt file</label>
          <input
            type="file"
            onChange={changeHandler}
            className="text-dark px-4 py-1 w-full my-[16px] border-2 border-lightGrey rounded-md"
            placeholder="youtube url"
          />
          <PrimaryButton
            onClick={() => {
              addVideoService.addVideoToLibrary();
              toast.success("Video added to library");
              navigate("/");
            }}
          >
            Add
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
