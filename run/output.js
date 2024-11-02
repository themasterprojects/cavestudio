import { DefaultImports } from "../src/components/Editors/Editors";

function Script() {
  function GetStoredItem(key, def) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : def
  }

  const styles = document.querySelector("style");
  const vanillaScript = document.querySelector("script[data-src='VanillaJS']");
  const jquery = document.querySelector("script[data-src='jQuery']");
  const vue = document.querySelector("script[data-src='Vue']");
  const typescript = document.querySelector("script[data-src='Typescript']");
  const coffeeScript = document.querySelector("script[data-src='CoffeeScript']");
  const liveScript = document.querySelector("script[data-src='liveScript']");
  const babel = document.querySelector("script[data-src='Babel']");
  const lodash = document.querySelector("script[data-src='Lodash']");
  const three = document.querySelector("script[data-src='Three']");
  const tailwind = document.querySelector("script[data-src='tailwind']");

  const defThreeJSImport = DefaultImports["Three.js"];

    document.title = localStorage.getItem("EditorConfig") ? JSON.parse(localStorage.getItem("EditorConfig")).projectTitle : "Code Demo - Cave Studio"

  function RunCode() {
    let _HTML = GetStoredItem("Code:Html", "");
    let _CSS = GetStoredItem("Code:Css", "");

    let _JS = GetStoredItem("Code:JavaScript", "");
    let _JQUERY = GetStoredItem("Code:jQuery", "");
    let _VUE = GetStoredItem("Code:Vue", "");
    let _TYPESCRIPT = GetStoredItem("Code:TypeScript", "");
    let _COFFEESCRIPT = GetStoredItem("Code:CoffeeScript", "");
    let _LS = GetStoredItem("Code:LiveScript", "");
    let _BABEL = GetStoredItem("Code:Babel", "");
    let _LODASH = GetStoredItem("Code:Lodash", "");
    let _THREE = GetStoredItem("Code:Three.js", "");

    async function SendData(lang) {
      const res = await fetch("http://localhost:4040/save  ", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": lang
      });

      if (!res.ok) throw new Error("Failed sending data.. !");

      const data = await res.json();

      console.log("Success: ", data);
    }

    document.body.innerHTML = _HTML;
    styles.innerHTML = _CSS;
    vanillaScript.innerHTML = _JS;
    jquery.innerHTML = _JQUERY;
    vue.innerHTML = _VUE;
    coffeeScript.innerHTML = _COFFEESCRIPT;
    liveScript.innerHTML = _LS;
    babel.innerHTML = _BABEL;
    lodash.innerHTML = _LODASH;
    three.innerHTML = `
      ${defThreeJSImport}
      ${_THREE}
      ` ;

    if (localStorage.getItem("includeTailwind")) {
      if (localStorage.getItem("includeTailwind") == "true") {
        tailwind.src = "../scripts/3.4.5";
      }
    }
  }

  RunCode();

  document.head.removeChild(document.querySelector("script[src='/@vite/client']"))

  // window.onkeydown = e => {
  //   if (e.ctrlKey) {
  //     if (e.key.toLowerCase() == "s") {
  //       e.preventDefault();
  //       RunCode();
  //     }
  //   }
  // }

}

window.onload = Script;