import React from "react";

export default function Code() {

  return (
    <>

      <div className="downloadCodeContainer fixed inset-0  bg-[rgb(0,0,0,.5)] flex items-center justify-center hidePopup transition duration-300">
        <div className="downloadCodeWrapper flex items-center justify-center px-[15px] py-[10px] h-full">
          <div className="downloadCode h-full">
            <div className="downloadCodeHeaderContainer backdrop-blur-xl rounded flex items-center justify-between px-[10px] py-[7px] text-[13px]">
              <div className="downloadCodeHeader cursor-pointer">
                <span> {localStorage.getItem("ProjectTitle") ? localStorage.getItem("ProjectTitle") : "Your Code"} </span>
              </div>
              <div className="downloadCodeHeader2Container flex items-center gap-[7px] cursor-pointer">
                <div className="codeHeaderItem SaveDownloadCode">
                  <span> Save </span>
                </div>
                <div className="codeHeaderItem hideCodePopup">
                  <span> Exit </span>
                </div>
              </div>
            </div>
            <div className="textCodeContainer rounded max-h-[80%] w-[90vw] overflow-scroll" >
              <div className="textCode">
                <pre>
                  <code>
                    {
                      localStorage.getItem("Code:Html")
                    }
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}