import React from "react";
import "./title.css"

export default function ProjectTitle() {
  return (
    <>

      <div className="projectTitleContainer fixed top-0 left-0 right-0 z-[99999]
       rounded">
        <div className="copyrightAppTitle text-[24px] font-semibold text-center mt-[15px]">
          <div className="appTitle">
            <h1>Cave Studio</h1>
          </div>
        </div>
        <div className="px-[30px] py-[20px] ">
          <div className="projectTitle font-semibold flex flex-col gap-[10px]">
            <div className="projectTitleHeader capitalize">
              <h2>Project title :</h2>
            </div>
            <div className="projectTileInputContainer">
              <div className="projectTileInput">
                <input type="text" placeholder="Cave Editor.." className="bg-transparent text-[14px] py-[7px] px-[15px] outline-none border-[1px] rounded w-full" spellCheck="false" />
              </div>
            </div>
            <div className="submitChangesBtns border-[1px] border-[rgb(60,60,60)] rounded w-max text-[14px] py-[5px] px-[15px] font-medium hover:text-white">
              <div className="submitChanges flex-1 cursor-pointer">
                <span>Proceed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="titleOverlay fixed inset-0 z-[90] bg-[rgb(0,0,0,.4)]"></div>

    </>
  )
}