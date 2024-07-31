import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { PrimaryButton } from "../../components/Button";
import { ChangeEvent, useState } from "react";
import { useServices } from "../../services/Services";
import { useObservable } from "micro-observables";

export const AddVideo = () => {
  const [foreignSrtName, setForeignSrtName] = useState("");
  const [nativeSrtName, setNativeSrtName] = useState("");
  const navigate = useNavigate();
  const { addVideoService } = useServices();

  const url = useObservable(addVideoService.videoUrl);
  const videoName = useObservable(addVideoService.videoName);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setForeignSrtName(event?.target?.files?.[0]?.name ?? "");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    addVideoService.setSubtitles(event.target.files);
  };

  const changeHandlerNative = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNativeSrtName(event?.target?.files?.[0]?.name ?? "");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    addVideoService.setNativeSubtitles(event.target.files);
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
          <label>foreign subtitle .srt file</label>
          <input
            type="file"
            onChange={changeHandler}
            className="text-dark px-4 py-1 w-full mt-[16px] border-2 border-lightGrey rounded-md"
            placeholder="youtube url"
          />
          <div className="text-xs text-grey mb-[10px] mt-[5px]">
            {foreignSrtName}
          </div>
          <label>Native subtitle .srt file</label>
          <input
            type="file"
            onChange={changeHandlerNative}
            className="text-dark px-4 py-1 mt-[16px] border-2 border-lightGrey rounded-md w-full"
            placeholder="youtube url"
          />
          <div className="text-xs text-grey mb-[10px] mt-[5px]">
            {nativeSrtName}
          </div>
          <PrimaryButton
            onClick={() => {
              addVideoService.addVideoToLibrary(navigate);
            }}
          >
            Add
          </PrimaryButton>
          <a
            className="text-center text-lightGrey underline w-full m-auto items-center flex justify-center mt-4"
            href="https://www.loom.com/share/394e8e0dbcfe4d3c89eac8570e344baa?sid=e25226f6-af95-4aeb-8cd3-350c3c6477d4"
          >
            Cliquez ici pour visionner le tutoriel pour ajouter une vidéo
          </a>
        </div>
      </div>
    </div>
  );
};
