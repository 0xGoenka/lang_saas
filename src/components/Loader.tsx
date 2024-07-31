import "./Loader.css";

export const Loader = ({ progress, id }: { progress: string; id: string }) => {
  try {
    const r = document.querySelector(".videoid_" + id) as HTMLElement;
    if (r) r.style.setProperty("--progress", progress);
  } catch (error) {
    console.log("error", error);
  }

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      className="circular-progress"
    >
      <circle className="bg"></circle>
      <circle className="fg"></circle>
    </svg>
  );
};
