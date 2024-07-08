(() => {
  // app/render.js
  var layout = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      td {
        margin: 25px;
      }
      .shapeDiv {
        margin-top: 5px;
        border-style: solid;
        border-width: 2px;
        width: 100%;
      }
      .statementDiv {
        padding-left: 50px;
        width: 100%;
      }
      .property {
        font-weight: bold;
        margin-left: 25px;
      }
      .value {
        margin-left: 100 px;
      }
      .shapeProperty {
        font-weight: bold;
        border-bottom-style: dotted;
      }
    </style>
    <title></title>
  </head>

  <body>
    {}
  </body>
</html>
`;
  function renderStatement(stmt) {
    const entries = Object.entries(stmt);
    const keysToIgnore = ["propertyID", "propertyLabel"];
    return `
    <div>
      <span class="property">${stmt.propertyID}</span>
      <span class="label" style="margin-left: 5px">
        (${stmt.propertyLabel})
      </span>
      <ul>
        ${entries.map(
      ([k, v]) => keysToIgnore.includes(k) ? null : `<li>
              <i>${k}</i> "${v}"
            </li>`
    ).join("")}
      </ul>
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
  function Doc({ shapes }) {
    const [start, end] = layout.split("{}");
    const body = `<div>${shapes.map((s, i) => renderShape(s, i + 1)).join("")}</div>`;
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
      let html = Doc(json);
      const ele = document.getElementById("doc");
      ele.innerHTML = html;
      const a = document.getElementById("download");
      a.setAttribute("href", "data:text/html;charset=utf-8, " + encodeURIComponent(html));
      a.setAttribute("download", "doc");
      a.classList.remove("hidden");
    };
    let text = reader.readAsText(e.target.files[0]);
  }
})();
