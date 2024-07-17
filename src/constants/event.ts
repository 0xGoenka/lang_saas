import { NavigateFunction } from "react-router-dom";

console.log({ window });

export const E_EVENT = {
  display_subtitle: {
    add: (navigate: NavigateFunction) => {
      window.addEventListener("display_subtitle", () => {
        console.log("display_subtitle");
        navigate("/playagain");
      });
    },
    remove: () => {
      window.removeEventListener("display_subtitle", () => {});
    },
    dispatch: () => {
      window.dispatchEvent(new Event("display_subtitle"));
    },
  },
};
