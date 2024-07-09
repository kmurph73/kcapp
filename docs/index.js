(() => {
  // app/render.js
  var layout = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      .shapeDiv {
        margin-top: 5px;
        border-style: groove;
        border-width: 2px;
        width: 100%;
      }
      .statementDiv {
        padding-left: 50px;
        width: 100%;
      }
      .value {
        font-weight: bold;
        margin-left: 25px;
      }
      .property {
        margin-left: 20px;
      }
      .label {
        font-weight: bold;
      }
      .shapeProperty {
        font-weight: bold;
        border-bottom-style: dashed;
        font-size: large;
      }
      .wrapper {
        display: grid;
        grid-template-columns: 150px 600px;
      }
    </style>
    <title></title>
  </head>

  <body>
    {}
  </body>
</html>
`;
  var keysToIgnore = ["propertyID", "propertyLabel"];
  function renderStatement(stmt) {
    const entries = Object.entries(stmt);
    return `
    <div class="wrapper">
      <span class="label" style="margin-left: 5px">
        ${stmt.propertyLabel}
      </span>
      <span class="property">
        (${stmt.propertyID})
        <ul>
          ${entries.map(
      ([k, v]) => keysToIgnore.includes(k) ? null : `<li>
                <i>${k}</i> "${v}"
              </li>`
    ).join("")}
        </ul>
      </span>
    </div>`;
  }
  function renderShape(shape, n) {
    const statements = shape.statement_templates || shape.statement_constraints;
    return `
    <div class="shapeDiv">
      <div class="shapeProperty">${shape.shapeLabel}</div>

      ${statements && statements.length > 0 ? `
        <div class="statementDiv">
          ${statements.map(renderStatement).join("")}
        </div>
        ` : ""}
      
    </div>
  `;
  }
  function Body({ shapes }) {
    return `<div>${shapes.map((s, i) => renderShape(s, i + 1)).join("")}</div>`;
  }
  function Doc(body) {
    const [start, end] = layout.split("{}");
    return [start, body, end].join("");
  }

  // app/index.js
  var inputElement = document.getElementById("fileElem");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles(e) {
    const fileList = this.files;
    fileList[0].name;
    const reader = new FileReader();
    reader.onload = (e2) => {
      let json;
      try {
        json = JSON.parse(e2.target.result);
      } catch (error) {
        alert("couldnt parse json document");
        return;
      }
      const body = Body(json);
      const ele = document.getElementById("doc");
      ele.innerHTML = body;
      const html = Doc(body);
      const a = document.getElementById("download");
      a.setAttribute("href", "data:text/html;charset=utf-8, " + encodeURIComponent(html));
      a.setAttribute("download", "doc");
      a.classList.remove("hidden");
    };
    let text = reader.readAsText(e.target.files[0]);
  }
})();
