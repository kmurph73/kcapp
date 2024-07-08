import { Doc } from "./render.js";

const inputElement = document.getElementById("fileElem");
inputElement.addEventListener("change", handleFiles, false);

export function handleFiles(e) {
  const fileList = this.files;
  // const text = reader.readAsText(fileList[0]);

  fileList[0].name;
  const reader = new FileReader()

  reader.onload = (e) => {
    let json;

    try {
      json = JSON.parse(e.target.result);
    } catch (error) {
      alert("couldnt parse json document");
      return;
    }

    let html = Doc(json);
    // console.log(html);
    const ele = document.getElementById("doc");
    ele.innerHTML = html;

    // const btn = document.getElementById("download_btn");
    // add texts as a href of <a> element after encoding.

    const a = document.getElementById("download");
    a.setAttribute('href', 'data:text/html;charset=utf-8, '+ encodeURIComponent(html));
    a.setAttribute('download', "doc");
    a.classList.remove("hidden");
  };

  let text = reader.readAsText(e.target.files[0])
}
// }
