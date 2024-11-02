import React, { useEffect, useRef, useState } from "react";
import "./header.css"

import htmlIcon from "../../assets/icons/html.png"
import cssIcon from "../../assets/icons/css.png"
import jsIcon from "../../assets/icons/js.png"

import editorLogo from "../../assets/logos/VsCodeRed.png";

import { ColorThemes, WebAppTitle } from "../Container/Container";
import Code from "../DownloadCode/Code";

export default function Header() {

 function NewFile() {
  document.querySelector(".newFilePopupContainer").classList.remove("hidden");
 }

 function OpenNewFile() {
  localStorage.clear();
  location.reload();
 }

 function NewTab() {
  open(location.href);
 }

 function Run() {
  open("run/")
 }

 function Close() {
  location.href = "https://www.google.com/";
 }

 function HideNotice() {
  document.querySelector(".newFilePopupContainer").classList.add("hidden");
 }

 async function DownloadPage() {

  try {
   const res = await fetch("http://localhost:3030/download");
   const data = await res.text();

   const blob = new Blob([data], { "type": "text/html" });

   const downloadLink = URL.createObjectURL(blob);

   const CodeContainer = document.querySelector(".downloadCodeContainer");
   const CodeArea = CodeContainer.querySelector("code");
   const hideCodePopup = CodeContainer.querySelector(".hideCodePopup");

   CodeArea.textContent = `${data}`;
   hljs.highlightElement(CodeArea);

   CodeContainer.classList.replace("hidePopup", "showPopup");

   hideCodePopup.addEventListener("click", () => {
    CodeContainer.classList.replace("showPopup", "hidePopup");
   });

   // const link = document.createElement("a");
   // document.body.appendChild(link);

   // link.href = downloadLink;
   // link.download = `${document.title}.html`;
   // link.click();

   // document.body.removeChild(link);
  }
  catch (e) {
   console.log("react: failed");
  }
 }

 function ChangeLayout() {
  document.body.classList.toggle("FullScreenMode");
  SetHeight();
 }

 function RenameProject() {
  document.querySelector(".editProjectTitleContainer").classList.remove("hidden");
  document.querySelector(".editProjectTitleContainer").classList.add("flex");
 }

 // ChangeLayout();

 const [fileOptions, setFileOptions] = useState([
  {
   "title": "File",
   "options": [{
    "title": "New File",
    "do": NewFile,
   },
   {
    "title": "New Tab",
    "do": NewTab,
   },
   {
    "title": "Run",
    "do": Run,
   },
   {
    "title": "Rename Project",
    "do": RenameProject,
   },
   {
    "title": "Save As",
    "do": DownloadPage,
   },
   {
    "title": "Close",
    "do": Close,
   }]
  },
  {
   "title": "View",
   "options": [{
    "title": "Appearance",
    "themes": ["Light", "Dark"],
    "colors": [ColorThemes.Light, ColorThemes.Dark],
    "do": () => { },
   },
   {
    "title": "Font Size",
    "sizes": ["10px", "14px", "18px", "20px", "24px", "28px", "32px"],
    "do": () => { },
   }, {
    "title": "Font Family",
    "ff": [
     "Monospace", "Courier New", "Courier", "Inter",
     "Segoe UI", "Times New Roman", "Cursive", "Georgia",
     "Impact", "Verdana", "Trebuchet MS", "Arial", "Sans-serif"
    ],
    "do": () => { },
   }, {
    "title": "Minimal Layout",
    "do": ChangeLayout,
   }]
  },
  {
   "title": "Go",
   "options": [{
    "title": `Tasks App`,
    "do": () => open("https://taskscave.netlify.app/"),
   }, {
    "title": "The Stream Cave",
    "do": () => open("https://thestreamcave.netlify.app/"),
   }]
  },
  {
   "title": "About",
   "options": [{
    "title": "Made By Master Yahya"
   }, {
    "title": "The Game Cave Studios"
   }]
  },
 ]);

 function SetHeight() {
  const header = document.querySelector("#header");
  const headerb = document.querySelector("#headerb");

  headerb.style.height = header.offsetHeight + "px";
 }

 function Script() {
  SetHeight();

  window.onkeydown = (e) => {
   if (e.ctrlKey && e.key.toLowerCase() == "k") {
    e.preventDefault();
    NewFile();
   }
   if (e.ctrlKey && e.key.toLowerCase() == "s") {
    e.preventDefault();
    DownloadPage();
   }
   if (e.ctrlKey && e.code == "Space") {
    e.preventDefault();
    Run();
   }
  }
 }

 useEffect(() => {
  Script() 
 }, [])

 const [editorHeaders, setEditorHeaders] = useState([
  {
   "title": "HTML",
   "icon": htmlIcon,
   "editor": "htmlEditor",
   "color": "rgb(242, 140, 40)"
  },
  {
   "title": "CSS",
   "icon": cssIcon,
   "editor": "cssEditor",
   "color": "rgb(6,182,212)"
  },
  {
   "title": "JavaScript",
   "icon": jsIcon,
   "editor": "jsEditor",
   "color": localStorage.getItem("jsTagBg") ? localStorage.getItem("jsTagBg") : "rgb(240,219,79)"
  },
 ]);

 return (
  <>

   <header className="fixed top-0 left-0 right-0 z-[999] " id="header">
    <div className="headerContainer z-[999] p-[5px] flex items-center justify-between text-[13px]">
     <div className="right flex flex-1 items-center">
      <div className="editorLogoContainer">
       <div className="editorLogo px-[5px] mb-[2px]" title="Cave Editor">
        <img src={editorLogo} alt="" className="w-4" />
       </div>
      </div>
      <div className="controls">
       <div className="header flex items-center gap-[5px]">
        {
         fileOptions.map((fileOptions, i) => (
          <div className="headerItem headerItemContainer relative select-none rounded" key={i}>
           <div className="headerItem cursor-pointer py-[2px] px-[8px] rounded">
            <span> {fileOptions.title} </span>
           </div>
           <div className="optionsContainer hidden absolute backdrop-blur-xl p-[5px] rounded shadow-md z-[999]">
            <div className="optionsLists">
             {
              fileOptions.options.map((option, i) => (
               <div className="optionItemContainer relative" key={i}>
                <div
                 className="optionItem secondListItemContainer cursor-pointer py-[5px] px-[13px] min-w-[200px] w-max whitespace-nowrap font-medium rounded "
                 onClick={() => { option.do() }}>
                 <span className="flex flex-1 items-center justify-between">
                  {option.title}

                  {option.title == "Appearance" || option.title == "Font Size" || option.title == "Font Family" ? <b>&rarr;</b> : ''}
                  {option.title == "New File" ? <span className="text-[10px]">Ctrl + K</span> : ''}
                  {option.title == "Run" ? <span className="text-[10px]">Ctrl + Space</span> : ''}
                  {option.title == "Save As" ? <span className="text-[10px]">Ctrl + S</span> : ''}
                  {fileOptions.title == "Go" ? <span style={{ "rotate": "-45deg" }}>	&rarr;</span> : ''}
                  {option.title == "Made By Master Yahya" ? <span> &copy;</span> : ''}
                  {option.title == "The Game Cave Studios" ? <span> &trade;</span> : ''}
                 </span>
                </div>
                {
                 option.title == "Appearance" ?
                  <div className="themesListContainer secondList secondListDefault hidden absolute left-[100%] top-0 p-[5px] shadow-md rounded">
                   <div className="themesList">
                    {
                     option.themes.map((t, i) => (
                      <div className="themeItemContainer secondListItemContainer cursor-pointer py-[4px] px-[10px] whitespace-nowrap font-medium rounded" key={i}>
                       <div className="themeItem">
                        <div className="flex item-center justify-between themesElements">
                         <div>
                          <span> {t} </span>
                         </div>
                         <div>
                          <b>&rarr;</b>
                         </div>
                        </div>
                       </div>

                       {
                        i == 0 ?
                         <div className="thirdListContainer right-0 thirdList thirdListThemes secondListDefault hidden absolute left-[100%] top-0 p-[3px] shadow-md rounded">
                          <h1 className="thirdListH">Light Themes</h1>
                          {

                           option.colors[i].map((color, i) => (
                            <div className="colorThemeItemContainer secondListItemContainer cursor-pointer py-[4px] px-[10px] whitespace-nowrap  font-medium rounded capitalize" key={i}>
                             <div className="colorThemeItem">
                              <p> {color.theme.split("-").join(" ")} </p>
                             </div>
                            </div>
                           ))
                          }
                         </div>
                         :
                         <div className="thirdListContainer w-full right-0 thirdList thirdListThemes hidden secondListDefault absolute left-[100%] top-0 p-[3px] shadow-md rounded">
                          <h1 className="thirdListH">Dark Themes</h1>
                          {
                           option.colors[i].map((color, i) => (
                            <div className="colorThemeItemContainer secondListItemContainer cursor-pointer py-[4px] px-[10px] whitespace-nowrap  font-medium rounded capitalize" key={i}>
                             <div className="colorThemeItem">
                              <p> {color.theme.split("-").join(" ")} </p>
                             </div>
                            </div>
                           ))
                          }
                         </div>
                       }
                      </div>
                     ))
                    }
                   </div>
                  </div>
                  : option.title == "Font Size" ?
                   <div className="sizesListContainer secondList secondListDefault hidden absolute left-[100%] top-0 p-[5px] shadow-md rounded">
                    <div className="sizesList">
                     {
                      option.sizes.map((size, i) => (
                       <div className="sizesItemContainer secondListItemContainer cursor-pointer py-[4px] px-[10px] whitespace-nowrap  font-medium rounded" key={i}>
                        <div className="sizesItem">
                         <span> {size} </span>
                        </div>
                       </div>
                      ))
                     }
                    </div>
                   </div>
                   : option.title == "Font Family" ?
                    <div className="ffListContainer secondList secondListDefault  absolute left-[100%] top-0 p-[5px] shadow-md rounded hidden">
                     <div className="ffList">
                      {
                       option.ff.map((ff, i) => (
                        <div className="ffItemContainer secondListItemContainer cursor-pointer py-[4px] px-[10px] whitespace-nowrap  font-medium rounded" key={i}>
                         <div className="sizesItem">
                          <span> {ff} </span>
                         </div>
                        </div>
                       ))
                      }
                     </div>
                    </div>
                    : ''
                }
               </div>
              ))
             }
            </div>
           </div>
          </div>
         ))
        }
       </div>
      </div>
      <div className="mx-[10px] border-l border-[rgb(60,60,60)] h-[20px]" ></div>
      <div className="projectName flex flex-1">
       <div className="displayProjectName line-clamp-1 w-full font-semibold relative ">
        <span>
         <span className="og-prjectTitle">
          {localStorage.getItem("EditorConfig") ?
           JSON.parse(localStorage.getItem("EditorConfig")).projectTitle :
           "Untitled Project"}
         </span> - {WebAppTitle}
        </span>
        <div className="editProjectTitleContainer hidden transition duration-300 ml-2 fixed inset-0  items-center justify-center">
         <div className="editProjectTitleWrapper w-[80vw] px-[15px] py-[15px] rounded flex flex-col gap-[10px]">
          <div className="editProjectTitleHeaderContainer">
           <div className="editProjectTitleHeader flex items-center gap-[7px]">
            <div className="editProjectTitleSpan">
             <h1 className="text-[27px]">Rename Project</h1>
            </div>
            <div className="editProjectTitleIcon px-[5px]">
             <span> &#9998; </span>
            </div>
           </div>
          </div>
          <div className="editProjectTitle cursor-pointer flex flex-1">
           <div className="editProjectTitleInput transition duration-300 flex flex-1">
            <input type="text" placeholder="Enter.." className="outline-none border-l-[2px] border-solid focus:border-[crimson] py-[7px] px-[15px] flex flex-1 text-[21px]" />
           </div>
          </div>
          <div className="titleSubmitBtns flex items-center gap-[5px]">
           <div className="cancelProjectTitleContainer">
            <div className="titleSubmitBtn cancelProjectTitle">
             <span>Cancel</span>
            </div>
           </div>
           <div className="submitProjectTitleContainer">
            <div className="titleSubmitBtn submitProjectTitle">
             <span>Submit</span>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
     <div className="left">
      {/* <div className="runCodeMirror">
              <div className="runCodeBtnContainer">
                <div className="runCodeBtn font-medium cursor-pointer mx-[20px]">
                  <a href="run/" target="_blank">Run Code</a>
                </div>
              </div>
            </div> */}
     </div>
    </div>
    <div className="editorHeadersItemsContainer w-full">
     <div className="editorHeadersItems flex items-center relative">
      {
       editorHeaders.map((header, index) => (
        <div
         className="editorHeaderContainer flex items-center justify-center gap-[5px] cursor-pointer flex-1 p-[7px] select-none font-[Inter]"
         data-color={header.color}
         data-editor={header.editor}
         key={index}>
         <div className="editorHeaderIcon">
          <img src={header.icon} alt="" className="w-[20px]" />
         </div>
         <div className="editorHeader font-[600]">
          <span> {header.title} </span>
         </div>
        </div>
       ))
      }
      <div className="edHeadersF scale-x-[.3] top-0 absolute bg-[rgb(6,182,212)] w-0 h-[1px]"></div>
     </div>
    </div>
    <div className="newFilePopupContainer hidden z-[150] bg-[rgb(0,0,0,.3)] fixed inset-0 flex items-center justify-center">
     <div className="newFilePopup p-[20px] rounded bg-[rgb(200,10,50)]">
      <h1 className="text-[24px] font-semibold">Your Progress Will Not Be Saved</h1>
      <span>Create a New File ? </span>

      <div><b className="cursor-pointer" onClick={OpenNewFile}>Proceed</b></div>
      <div className="cursor-pointer" onClick={HideNotice}>Cancel</div>
     </div>
    </div>
   </header>
   <div className="headerb" id="headerb"></div>
   <Code />

  </>
 )
}