const layout = `
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

  return (
		`
    <div>
      <span class="property">${stmt.propertyID}</span>
      <span class="label" style="margin-left: 5px">
        (${stmt.propertyLabel})
      </span>
      <ul>
        ${entries.map(([k, v]) =>
          keysToIgnore.includes(k) ? null : (
            `<li>
              <i>${k}</i> "${v}"
            </li>`
          )
        ).join('')}
      </ul>
    </div>`
  );
}

function renderShape(shape, n) {
  return `
    <div class="shapeDiv">
      <div class="shapeProperty">${shape.shapeLabel}</div>

      <div class="statementDiv">
        ${shape.statement_templates.map(renderStatement).join('')}
      </div>
    </div>
  `;
}

export function Doc({ shapes }) {
  const [start, end] = layout.split("{}");
  const body = `<div>${shapes.map((s, i) => renderShape(s, i + 1)).join('')}</div>`;

  return [start, body, end].join('');
}