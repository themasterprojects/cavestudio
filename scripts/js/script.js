import { DefaultImports } from "../../src/components/Editors/Editors";
import { WebAppTitle, ColorThemes } from "../../src/components/Container/Container";

export class Program {

  Main() {
    const log = console.log;

    const editorItemContainer = $(".editorItemContainer");
    const editorHeaderContainer = $(".editorHeaderContainer");
    const edHeadersF = $(".edHeadersF");
    const editorItem = document.querySelectorAll(".editorItem");
    const displayProjectName = $(".displayProjectName .og-prjectTitle");
    const projectTitleInput = $(".projectTileInput input");
    const submitChanges = $(".submitChanges");
    const ProjectTitleS = $(".ProjectTitleS");
    const libraryItemContainer = $(".libraryItemContainer");
    const useTailwind = $(".useTailwind");
    const headerItemContainer = $(".headerItemContainer");
    const optionItemContainer = $(".optionItemContainer");
    const header = $(".header");
    const editProjectTitleContainer = $(".editProjectTitleContainer");
    const editProjectTitleInput = $(".editProjectTitleInput");
    const cancelProjectTitle = $(".cancelProjectTitle");
    const submitProjectTitle = $(".submitProjectTitle");

    let EditorConfig = {
      "projectTitle": localStorage.getItem("EditorConfig") ? JSON.parse(localStorage.getItem("EditorConfig")).projectTitle : "Untitled Project",
      "theme": localStorage.getItem("EditorConfig") ? JSON.parse(localStorage.getItem("EditorConfig")).theme : "Dark",
      "themeColor": localStorage.getItem("EditorConfig") ? JSON.parse(localStorage.getItem("EditorConfig")).themeColor : "atom-one-dark",
      "fontSize": localStorage.getItem("EditorConfig") ? JSON.parse(localStorage.getItem("EditorConfig")).fontSize : "14px",
      "fontFamily": localStorage.getItem("EditorConfig") ? JSON.parse(localStorage.getItem("EditorConfig")).fontFamily : "Monospace"
    }

    let projectTitle = EditorConfig.projectTitle;
    let IsConnected = false;

    let html = "";
    let css = "";

    let includeTailwind = false;

    let javascript = "";
    let jquery = "";
    let vue = "";
    let typescript = "";
    let coffeescript = ""
    let livescript = "";
    let babel = "";
    let lodash = "";
    let three = "";

    localStorage.setItem("jsTagBg", "rgb(240,219,79)");

    let jsLibrary = "JavaScript";

    let jsLibrariesColors = {
      "Vanilla": "rgb(240,219,79)",
      "Typescript": "#007acc",
      "Vue": "#42b883",
      "jQuery": "#0769ad",
      "Three": "lightgreen"
    }

    let jsTagBg = localStorage.getItem("jsTagBg") ? localStorage.getItem("jsTagBg") : jsLibrariesColors.Vanilla;

    localStorage.setItem("jsLibrary", jsLibrary);

    let themes = [
      {
        "Light": {
          "headerBg": "rgb(230,230,230)",
          "bodyBg": "rgb(230,230,230)",
          "textColor": "rgb(0,0,0)"
        },
        "Dark": {
          "headerBg": "rgb(24,24,24)",
          "bodyBg": "rgb(24,24,24)",
          "textColor": "rgb(0,0,0)"
        }
      }
    ]

    function GetStoredItem(key, def) {
      return localStorage.getItem(key) ? localStorage.getItem(key) : def
    }

    function InactiveLibraries() {
      $(libraryItemContainer).each((i, libraryItemContainer) => {
        $(libraryItemContainer).removeClass("activeLibrary");
      });
    }

    function SetTheme() {
      switch ($("html").attr("theme")) {
        case "Light":
          $("html").addClass("light");
          $("html").removeClass("dark");
          break;
        case "Dark":
          $("html").addClass("dark");
          $("html").removeClass("light");
          break;
        default:
          $("html").addClass("dark");
          $("html").removeClass("light");
          break;
      }
    }

    $(libraryItemContainer).first().addClass("activeLibrary");

    $(libraryItemContainer).each((i, libraryItemContainer) => {

      function MainClickEvent() {
        InactiveLibraries();
        $(libraryItemContainer).addClass("activeLibrary");

        jsLibrary = $(libraryItemContainer).find(".libraryItem span").text().split(" ").join("");

        $(".editCode .import").empty();
        $(".editorsOpsBack").css("height", $(".librariesListContainer").height());

        const icon = $(editorHeaderContainer).last().find("img");
        const lang = $(editorHeaderContainer).last().find("span");

        function SetJsColor(colorTheme, iconName, text) {
          localStorage.setItem("jsTagBg", colorTheme);
          jsTagBg = localStorage.getItem("jsTagBg");

          $(icon).attr("src", `../src/assets/icons/${iconName}`);
          $(lang).text(text);
          $(edHeadersF).css("background", jsTagBg);
        }

        function ConfigLibrary(library, title = "JavaScript", libraryTheme = jsLibrariesColors.Vanilla, image = "js.png") {
          $(".editorItem[data-editor-lang='js'] textarea").val(localStorage.getItem(`Code:${library}`));
          $(".editorItem[data-editor-lang='js'] .HighlightCode").text(localStorage.getItem(`Code:${library}`));

          SetJsColor(libraryTheme, image, title);
        }

        switch (jsLibrary) {
          case "Vue":
            ConfigLibrary(jsLibrary, jsLibrary, jsLibrariesColors.Vue, "vue.png");
            break;
          case "TypeScript":
            ConfigLibrary(jsLibrary, jsLibrary, jsLibrariesColors.Typescript, "ts.png");
            break;
          case "CoffeeScript":
            ConfigLibrary(jsLibrary);
            break;
          case "jQuery":
            ConfigLibrary(jsLibrary, jsLibrary, jsLibrariesColors.jQuery, "jquery.png");
            break;
          case "LiveScript":
            ConfigLibrary(jsLibrary);
            break;
          case "Babel":
            ConfigLibrary(jsLibrary);
            break;
          case "Lodash":
            ConfigLibrary(jsLibrary);
            break;
          case "Three.js":
            $(".editorItem[data-editor-lang='js'] textarea").val(localStorage.getItem("Code:Three"));
            $(".editCode .import").html(`<pre><code id="importThree" className="hljs language-javascript">${DefaultImports["Three.js"]}</code></pre>`);

            hljs.highlightElement(document.querySelector(".editCode .import #importThree"));

            ConfigLibrary(jsLibrary, jsLibrary, jsLibrariesColors.Three, "three.png");
            break;
          case "JavaScript":
            ConfigLibrary(jsLibrary, jsLibrary, jsLibrariesColors.Vanilla, "js.png");
            break;
        }

        localStorage.setItem("jsLibrary", jsLibrary);
      }

      $(libraryItemContainer).on("click", MainClickEvent);

      $(".editorItem[data-editor-lang='js'] textarea").val(localStorage.getItem(`Code:JavaScript`));
      $(".editorItem[data-editor-lang='js'] .HighlightCode").text(localStorage.getItem(`Code:JavaScript`));

    });

    editorItem.forEach((editorItem) => {
      const textarea = editorItem.querySelector("textarea");
      const HighlightCode = editorItem.querySelector(".HighlightCode");

      textarea.spellcheck = false;
      textarea.style.height = "100vh";
      textarea.scrollTop = 10

      function SetHighlighted(target) {
        HighlightCode.removeAttribute("data-highlighted");
        HighlightCode.textContent = `${target}`;
        hljs.highlightElement(HighlightCode);
      }

      function TextareaInputConfig() {
        textarea.style.height = textarea.scrollHeight + "px";

        SetHighlighted(textarea.value);
      }

      function AddTabs(e) {
        if (e.key == "Tab") {
          const start = e.target.selectionStart;
          const end = e.target.selectionEnd;

          e.target.value = e.target.value.substring(0, start) + '\t' + e.target.value.substring(end);

          e.target.selectionStart = e.target.selectionEnd = start + 1;

          SetHighlighted(e.target.value);
        }
      }

      SetHighlighted(textarea.value);

      textarea.addEventListener("input", TextareaInputConfig);
      textarea.addEventListener("focus", TextareaInputConfig);
      textarea.addEventListener("keydown", e => { AddTabs(e) });

      function Config(library, lang) {
        lang = textarea.value;

        localStorage.setItem(`Code:${library}`, lang);
      }

      switch (editorItem.getAttribute("data-editor-lang")) {
        case "html":
          textarea.addEventListener("input", () => {
            html = textarea.value;
            localStorage.setItem("Code:Html", html);
          });

          textarea.value = GetStoredItem("Code:Html", `<!---

The Game Cave LLC. Presents -> Cave Studio For Front-End Web Development;

The Free and Open Source Online Text Editor

Developed By Solo Web Developer @Master;

Socials ->

	"instagram": "@itzyahya777",
     "youtube": "@7kClips"
                                                                                                                 
 --->                                    `);
          break;
        case "css":
          textarea.addEventListener("input", () => {
            css = textarea.value;
            localStorage.setItem("Code:Css", css);
          });

          textarea.value = GetStoredItem("Code:Css", "");
          break;
        case "js":
          textarea.addEventListener("input", () => {
            switch (jsLibrary) {
              case "Vue":
                Config(jsLibrary, vue);
                break;
              case "TypeScript":
                Config(jsLibrary, typescript);
                break;
              case "CoffeeScript":
                Config(jsLibrary, coffeescript);
                break;
              case "jQuery":
                Config(jsLibrary, jquery);
                break;
              case "LiveScript":
                Config(jsLibrary, livescript);
                break;
              case "Babel":
                Config(jsLibrary, babel);
                break;
              case "Lodash":
                Config(jsLibrary, lodash);
                break;
              case "Three.js":
                Config(jsLibrary, three);
                break;
              default:
                Config(jsLibrary, javascript);
                break;
            }
          });
          break;
      }


    });

    $(edHeadersF).css({
      width: $(editorHeaderContainer).first().css("width"),
      top: $(editorHeaderContainer).first().outerHeight(),
      left: $(editorHeaderContainer).first().offset().left,
      background: $(editorHeaderContainer).first().attr("data-color"),
      transition: "500ms"
    });

    function HideEditors() {
      $(editorItemContainer).each((i, editorItemContainer) => {
        $(editorItemContainer).addClass("hidden");
        $(editorHeaderContainer).scrollTop(1);
      });
    }

    function ActiveFollower(editorHeaderContainer) {
      $(edHeadersF).css({
        width: $(editorHeaderContainer).css("width"),
        top: $(editorHeaderContainer).outerHeight(),
        left: $(editorHeaderContainer).offset().left,
        background: $(editorHeaderContainer).attr("data-color"),
      });
    }

    $(editorItemContainer).first().removeClass("hidden");

    function InactiveEditorsHeaders() {
      $(editorHeaderContainer).each((i, editorHeaderContainer) => {
        $(editorHeaderContainer).removeClass("activeHeader");
      });
    }

    $(editorHeaderContainer).each((i, editorHeaderContainer) => {
      $(editorHeaderContainer).on("click", () => {
        if (i == 2) $(editorHeaderContainer).attr("data-color", localStorage.getItem("jsTagBg"));

        $(document.body).scrollTop(0);

        function FullScreenModeFollower() {
          InactiveEditorsHeaders()
          $(editorHeaderContainer).addClass("activeHeader");
        }

        if ($(document.body).attr("class").includes("FullScreenMode"))
          FullScreenModeFollower();

        ActiveFollower(editorHeaderContainer);

        $(editorItemContainer).each((i, editorItemContainer) => {

          if ($(editorItemContainer).attr("class").includes($(editorHeaderContainer).attr("data-editor"))) {
            HideEditors();
            $(editorItemContainer).removeClass("hidden");

            // $(editorItemContainer).find("textarea").focus();
          }

          $(editorItemContainer).on("click", () => {
            $(editorItemContainer).find("textarea").focus();
          });
        });


      });
    });

    $(projectTitleInput).on("input", () => {
      projectTitle = $(projectTitleInput).val();
    });

    function SubmitProjectName() {
      if (projectTitle.trim().split().join("").length > 0) {
        $(displayProjectName).text(projectTitle);
      }
      else {
        projectTitle = "Untitled Project";
        $(displayProjectName).text(projectTitle);
      }

      $(ProjectTitleS).empty();
      $(document).attr("title", `${projectTitle} - ${WebAppTitle}`);

      IsConnected = true;

      EditorConfig.projectTitle = projectTitle;

      localStorage.setItem("EditorConfig", JSON.stringify(EditorConfig));
      localStorage.setItem("IsConnected", IsConnected);
    }

    $(document).attr("title", `${EditorConfig.projectTitle} - Cave Studio`);

    $(submitChanges).on("click", SubmitProjectName);
    $(window).on("keydown", e => {
      if (e.key == "Enter")
        SubmitProjectName();
      if (e.key == "Tab")
        e.preventDefault();
    });

    $(useTailwind).on("click", () => {
      $(useTailwind).toggleClass("activeLibrary");

      if ($(useTailwind).attr("class").includes("activeLibrary")) {
        includeTailwind = true;
      }
      else {
        includeTailwind = false;
      }

      localStorage.setItem("includeTailwind", includeTailwind);
    });

    localStorage.getItem("includeTailwind") ?
      localStorage.getItem("includeTailwind") == 'true' ?
        $(useTailwind).addClass("activeLibrary") :
        $(useTailwind).removeClass("activeLibrary") : "";


    $(headerItemContainer).each((i, headerItemContainer) => {
      const optionsContainer = $(headerItemContainer).find(".optionsContainer");

      function HandleMouseover() {
        $(optionsContainer).removeClass("hidden");
      }

      function HandleMousout() {
        $(optionsContainer).addClass("hidden");
      }

      $(headerItemContainer).on({
        mouseover: HandleMouseover,
        mouseout: HandleMousout
      });
    });

    function SetCodeTheme(path) {
      $("link[data-src='ColorTheme']").attr("href", path);
    }

    $(optionItemContainer).each((i, optionItemContainer) => {
      function ShowList() {
        const secondList = $(optionItemContainer).find(".secondList");
        const themesListContainer = $(optionItemContainer).find(".themesListContainer");
        const sizesListContainer = $(optionItemContainer).find(".sizesListContainer");
        const ffListContainer = $(optionItemContainer).find(".ffListContainer");

        if ($(secondList)) {
          $(secondList).removeClass("hidden");
        }

        if ($(themesListContainer)) {
          $(themesListContainer).removeClass("hidden");

          const themeItemContainer = $(themesListContainer).find(".themeItemContainer");

          function HideInactive() {
            $(themeItemContainer).each((i, themeItemContainer) => {
              $(themeItemContainer).removeClass("activeFancyItem");
            });
          }

          $(themeItemContainer).each((i, themeItemContainer) => {

            $(themeItemContainer).on({
              click: () => {

                $("html").attr("theme", `${$(themeItemContainer).find("span").text().split(" ").join("")}`);
                SetTheme();

                HideInactive();
                $(themeItemContainer).addClass("activeFancyItem");

                EditorConfig.theme = $("html").attr("theme");
                localStorage.setItem("EditorConfig", JSON.stringify(EditorConfig));
              },
              mouseover: () => {
                const colorThemeItemContainer = $(".thirdListThemes").find(".colorThemeItemContainer");

                function Inactive() {
                  $(colorThemeItemContainer).each((i, colorThemeItemContainer) => {
                    $(colorThemeItemContainer).removeClass("activeFancyItem");
                  });
                }

                if ($(themeItemContainer).find(".themesElements span").text().trim() == "Light") {
                  $(".thirdListThemes").first().removeClass("hidden");
                  $(".thirdListThemes").last().addClass("hidden");
                }
                else {
                  $(".thirdListThemes").last().removeClass("hidden");
                  $(".thirdListThemes").first().addClass("hidden");
                }

                $(colorThemeItemContainer).each((i, colorThemeItemContainer) => {
                  $(colorThemeItemContainer).on("click", () => {
                    const colorThemeItem = $(colorThemeItemContainer).find("p");

                    Inactive();
                    $(colorThemeItemContainer).addClass("activeFancyItem");

                    EditorConfig.themeColor = $(colorThemeItem).text().trim().split(" ").join("-");
                    localStorage.setItem("EditorConfig", JSON.stringify(EditorConfig));

                    SetCodeTheme(`/src/assets/colorThemes/highlight/styles/${EditorConfig.themeColor}.css`);
                  });
                });

              },
            })
          });
        }

        if ($(sizesListContainer)) {
          const sizesItemContainer = $(sizesListContainer).find(".sizesItemContainer");

          function HideInactive() {
            $(sizesItemContainer).each((i, sizesItemContainer) => {
              $(sizesItemContainer).removeClass("activeFancyItem");
            });
          }

          $(sizesItemContainer).each((i, sizesItemContainer) => {
            $(sizesItemContainer).on("click", () => {
              const size = $(sizesItemContainer).find("span");

              function SetFontSize(item) {
                $(item).each((i, item) => {
                  $(item).css("font-size", $(size).text());
                });
              }

              SetFontSize("textarea");
              SetFontSize(".HighlightCode");

              $(".editCode .import").css("font-size", $(size).text());

              HideInactive();
              $(sizesItemContainer).addClass("activeFancyItem");

              EditorConfig.fontSize = $(size).text();
              localStorage.setItem("EditorConfig", JSON.stringify(EditorConfig));

            })
          });
        }

        if ($(ffListContainer)) {
          const ffItemContainer = $(ffListContainer).find(".ffItemContainer");

          function HideInactive() {
            $(ffItemContainer).each((i, ffItemContainer) => {
              $(ffItemContainer).removeClass("activeFancyItem");
            });
          }

          function SetFontFamily(item) {
            $(item).each((i, item) => {
              $(item).css("font-family", EditorConfig.fontFamily);
            });
          }

          $(ffItemContainer).each((i, ffItemContainer) => {
            $(ffItemContainer).on("click", () => {
              const font = $(ffItemContainer).find("span");

              HideInactive();
              $(ffItemContainer).addClass("activeFancyItem");

              EditorConfig.fontFamily = $(font).text().trim();
              localStorage.setItem("EditorConfig", JSON.stringify(EditorConfig));

              SetFontFamily("textarea");
              SetFontFamily(".HighlightCode");

            });
          });
        }
      }

      function HideList() {
        const secondList = $(optionItemContainer).find(".secondList");

        if ($(secondList)) {
          $(secondList).addClass("hidden");
        }
      }

      $(optionItemContainer).on({
        mouseover: ShowList,
        mouseout: HideList
      });
    });

    function SetFont(item) {
      $(item).each((i, target) => {
        $(target).css({
          "font-size": EditorConfig.fontSize,
          "font-family": EditorConfig.fontFamily,
        });
      });
    }

    SetFont(".HighlightCode");
    SetFont("textarea");

    const editTitleInput = $(editProjectTitleInput).find("input");

    function SubmitRenameProject() {
      EditorConfig.projectTitle = $(editTitleInput).val()
      localStorage.setItem("EditorConfig", JSON.stringify(EditorConfig));

      HideRenameProjectPopup();
      location.reload();
    }

    function HideRenameProjectPopup() {
      $(editProjectTitleContainer).addClass("hidden");
      $(editProjectTitleContainer).removeClass("flex");
    }

    $(submitProjectTitle).on("click", SubmitRenameProject);
    $(cancelProjectTitle).on("click", () => {
      HideRenameProjectPopup();
      $(editTitleInput).val("");
    });

    $(".sizesItemContainer").each((i, sizesItemContainer) => {
      const size = $(sizesItemContainer).find("span");

      if ($(size).text() == EditorConfig.fontSize) {
        $(sizesItemContainer).addClass("activeFancyItem");
      }
    });

    $(".colorThemeItemContainer").each((i, item) => {
      const theme = $(item).find("p");

      if ($(theme).text().trim().split(" ").join("-") == EditorConfig.themeColor) {
        $(item).addClass("activeFancyItem");
      }
    });

    $(".themeItemContainer").each((i, item) => {
      const theme = $(item).find("span");

      if ($(theme).text().trim("") == EditorConfig.theme) {
        $(item).addClass("activeFancyItem");
      }
    });

    $(".ffItemContainer").each((i, item) => {
      const theme = $(item).find("span");

      if ($(theme).text().trim("") == EditorConfig.fontFamily) {
        $(item).addClass("activeFancyItem");
      }
    });

    $("html").attr("theme", `${EditorConfig.theme}`);

    SetTheme();
    SetCodeTheme(`/src/assets/colorThemes/highlight/styles/${EditorConfig.themeColor}.css`);

    document.addEventListener("wheel", e => {
      if (e.ctrlKey) {
        e.preventDefault()
      }
    }, { passive: false });

    document.addEventListener("touchmove", e => {
      if (e.scale != 1)
        e.preventDefault()
    }, { passive: false })
  }

}