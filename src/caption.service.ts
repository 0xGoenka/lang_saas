// export class CaptionService {
//   constructor() {}

//   async getSubs(langCode = "en", yturl: string) {
//     const pageText = await (await fetch(yturl)).text();

//     console.log(pageText);

//     const splitted = pageText
//       .split("ytInitialPlayerResponse = ")[1]
//       .split(";var")[0];

//     const ct =
//       JSON.parse(splitted).captions.playerCaptionsTracklistRenderer
//         .captionTracks;

//     const findCaptionUrl = (x) =>
//         ct.find((y) => y.vssId.indexOf(x) === 0)?.baseUrl,
//       firstChoice = findCaptionUrl("." + langCode);

//     const url = firstChoice
//       ? firstChoice + "&fmt=json3"
//       : (findCaptionUrl(".") ||
//           findCaptionUrl("a." + langCode) ||
//           ct[0].baseUrl) +
//         "&fmt=json3&tlang=" +
//         langCode;
//     return (await (await fetch(url)).json()).events.map((x) => ({
//       ...x,
//       text:
//         x.segs
//           ?.map((x) => x.utf8)
//           ?.join(" ")
//           ?.replace(/\n/g, " ")
//           ?.replace(/♪|'|"|\.{2,}|\<[\s\S]*?\>|\{[\s\S]*?\}|\[[\s\S]*?\]/g, "")
//           ?.trim() || "",
//     }));
//   }

//   async logSubs(langCode: string, yturl: string) {
//     const subs = await this.getSubs(langCode, yturl);
//     const text = subs.map((x) => x.text).join("\n");
//     console.log(text);
//     return text;
//   }
//   async downloadSubs(langCode: string, yturl: string) {
//     const text = await this.logSubs(langCode, yturl);
//     const blob = new Blob([text], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "subs.txt";
//     a.click();
//     URL.revokeObjectURL(url);
//   }
// }
