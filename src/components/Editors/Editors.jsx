import React, { useEffect, useState } from "react";
import "./EditorStyles/editor.css"

export const DefaultImports = {
  "Three.js": "import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.min.js';"
}

export default function Editors() {

  // editor bg : rgb(29,30,34)

  const [editors, setEditors] = useState([
    {
      "title": "htmlEditor",
      "lang": "html",
    },
    {
      "title": "cssEditor",
      "lang": "css",
    },
    {
      "title": "jsEditor",
      "lang": "js",
    },
  ]);

  const [libraries, setLibraries] = useState([
    {
      "library": "JavaScript"
    },
    {
      "library": "Vue"
    },
    {
      "library": "TypeScript"
    },
    {
      "library": "jQuery"
    },
    {
      "library": "CoffeeScript"
    },
    {
      "library": "LiveScript"
    },
    {
      "library": "Babel"
    },
    {
      "library": "Lodash"
    },
    {
      "library": "Three.js"
    },
  ]);

  return (
    <>
      <div className="editorsContainer w-[100vw] h-full resize-x">
        <div className="editorsWrapper h-full">
          <div className="editors h-full">
            {
              editors.map((editor, i) => (
                <div className={`editorItemContainer ${editor.title} text-white h-full w-full hidden`} key={i}>
                  <div className="editorItemWrapper h-full w-full">
                    {
                      editor.lang == "js" ?
                        <>
                          <div className="librariesListContainer OptsLangsList fixed left-0 right-0 z-[100]">
                            <div className="librariesList flex items-center gap-[5px] p-[5px] flex-wrap">
                              {
                                libraries.map((library, i) => (
                                  <div className="libraryItemContainer fancyBtn text-[13px] font-semibold  py-[4px] px-[11px] rounded cursor-pointer transition duration-300 select-none" key={i}>
                                    <div className="libraryItem">
                                      <span> {library.library} </span>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                          <div className="editorsOpsBack flex flex-1 h-[55px]"></div>
                        </>
                        : editor.lang == "html" ?
                          <div className="useTailwindContainer p-[5px]">
                            <div className="useTailwind fancyBtn text-[13px] text-[rgb(170,170,170)] font-semibold bg-[rgb(30,30,30)] py-[4px] px-[11px] rounded cursor-pointer transition duration-300 hover:bg-[rgb(40,40,40)] hover:text-[rgb(200,200,200)] select-none w-max">
                              <span>Tailwind</span>
                            </div>
                          </div>
                          : ``
                    }
                    <div className="editorItem w-full flex items-center gap-[10px]" data-editor-lang={editor.lang}>

                      <div className="hidden rowsIndicatorContainer text-[13px] text-[rgb(170,170,170)] w-max h-full font-mono bg-slate-100 text-right">
                        <div
                          className="rowsindicator flex flex-col px-1 justify-start bg-slate-800 flex-1 h-full">
                          <div>1</div>
                        </div>
                      </div>

                      <div className="edit w-full h-full relative">
                        <code className="editCode w-full">
                          {
                            editor.lang == "js" ?
                              <div
                                className="import"
                                style={{
                                  fontSize: `${localStorage.getItem("editorFontSize") ?
                                    localStorage.getItem("editorFontSize")
                                    : "14px"}`,
                                  margin: "5px 0"
                                }}>
                              </div>
                              : ''
                          }
                          <textarea
                            className="MainEditor bg-transparent w-full border-none outline-none "
                          >
                          </textarea>
                        </code>

                        <div className="HighlightCodeContainer">
                          <pre>
                            <code className={`HighlightCode language-${editor.lang}`}>
                            </code>
                          </pre>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </>
  )
}