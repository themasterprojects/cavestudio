import React, { useEffect } from "react";

import Header from "../Header/Header";
import Editors from "../Editors/Editors";
import Output from "../Output/Output";
import ProjectTitle from "../ProjectTitle/ProjectTitle";

import { Program } from "../../../scripts/js/script";

export const WebAppTitle = "Cave Studio";

const OriginalLightThemesList = [
  "/src/assets/colorThemes/highlight/styles/gradient-light.css",
  "/src/assets/colorThemes/highlight/styles/intellij-light.css",
  "/src/assets/colorThemes/highlight/styles/arduino-light.css",
  "/src/assets/colorThemes/highlight/styles/atom-one-light.css",
  "/src/assets/colorThemes/highlight/styles/a11y-light.css",
  "/src/assets/colorThemes/highlight/styles/github.css",
  "/src/assets/colorThemes/highlight/styles/magula.css",
  "/src/assets/colorThemes/highlight/styles/mono-blue.css",
  "/src/assets/colorThemes/highlight/styles/foundation.css",
  "/src/assets/colorThemes/highlight/styles/docco.css",
  "/src/assets/colorThemes/highlight/styles/1c-light.css",
  "/src/assets/colorThemes/highlight/styles/lightfair.css",
  "/src/assets/colorThemes/highlight/styles/kimbie-light.css",
  "/src/assets/colorThemes/highlight/styles/googlecode.css",
  "/src/assets/colorThemes/highlight/styles/vs.min.css",
  "/src/assets/colorThemes/highlight/styles/stackoverflow-light.css",
  "/src/assets/colorThemes/highlight/styles/xcode.css"
];

const OriginalDarkThemesList = [
  "/src/assets/colorThemes/highlight/styles/atom-one-dark.css",
  "/src/assets/colorThemes/highlight/styles/a11y-dark.css",
  "/src/assets/colorThemes/highlight/styles/androidstudio.css",
  "/src/assets/colorThemes/highlight/styles/an-old-hope.css",
  "/src/assets/colorThemes/highlight/styles/codepen-embed.css",
  "/src/assets/colorThemes/highlight/styles/felipec.css",
  "/src/assets/colorThemes/highlight/styles/github-dark-dimmed.css",
  "/src/assets/colorThemes/highlight/styles/github-dark.css",
  "/src/assets/colorThemes/highlight/styles/gradient-dark.css",
  "/src/assets/colorThemes/highlight/styles/hybrid.css",
  "/src/assets/colorThemes/highlight/styles/kimbie-dark.css",
  "/src/assets/colorThemes/highlight/styles/lioshi.css",
  "/src/assets/colorThemes/highlight/styles/dark.css",
  "/src/assets/colorThemes/highlight/styles/pojoaque.css",
  "/src/assets/colorThemes/highlight/styles/monokai-sublime.css",
  "/src/assets/colorThemes/highlight/styles/monokai.css",
  "/src/assets/colorThemes/highlight/styles/night-owl.css",
  "/src/assets/colorThemes/highlight/styles/nord.css",
  "/src/assets/colorThemes/highlight/styles/tokyo-night-dark.css",
  "/src/assets/colorThemes/highlight/styles/obsidian.css",
  "/src/assets/colorThemes/highlight/styles/panda-syntax-dark.css",
  "/src/assets/colorThemes/highlight/styles/vscode-theme.css",
  "/src/assets/colorThemes/highlight/styles/srcery.css",
  "/src/assets/colorThemes/highlight/styles/stackoverflow-dark.css",
];

export const ColorThemes = {
  "Light": [],
  "Dark": []
}

function AddThemes(ogList, ct) {
  for (let i = 0; i < ogList.length; i++) {
    ct.push(
      {
        "theme": ogList[i].split("/src/assets/colorThemes/highlight/styles/").join("").split(".css").join("")
      }
    )
  }
}

AddThemes(OriginalLightThemesList, ColorThemes.Light);
AddThemes(OriginalDarkThemesList, ColorThemes.Dark);

export default function Container() {

  useEffect(() => {
    const activateScript = document.createElement("div");

    activateScript.className = "activateScript";

    document.body.appendChild(activateScript);

    activateScript.onclick = () => {
      new Program().Main();
    };

    activateScript.click();

    document.body.removeChild(activateScript);
  }, []);

  return (
    <>

      <div className="c">
        {
          !localStorage.getItem("IsConnected") || localStorage.getItem("IsConnected") == false ?
            <div className="ProjectTitleS">
              <ProjectTitle />
            </div>
            :
            ``
        }
        <div className="wrapper h-full w-full">
          <div className="w-full">
            <Header />
          </div>
          <div className="app flex items-center h-full">
            <div className="editorLeftSideContainer h-full">
              <div className="editorLeftSide h-full">
                <Editors />
              </div>
            </div>
            <div className="outputRightSideContainer h-full w-full hidden">
              <div className="outputRightSide h-full w-full">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}