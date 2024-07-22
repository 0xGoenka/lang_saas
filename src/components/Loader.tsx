import "./Loader.css";

export const Loader = ({ progress }: { progress: string }) => {
  const r = document.querySelector("body");
  if (r) r.style.setProperty("--progress", progress);

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
