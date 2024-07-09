const layout = `
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

const keysToIgnore = ["propertyID", "propertyLabel"];

function renderStatement(stmt) {
  const entries = Object.entries(stmt);

  return (
		`
    <div class="wrapper">
      <span class="label" style="margin-left: 5px">
        ${stmt.propertyLabel}
      </span>
      <span class="property">
        (${stmt.propertyID})
        <ul>
          ${entries.map(([k, v]) =>
            keysToIgnore.includes(k) ? null : (
              `<li>
                <i>${k}</i> "${v}"
              </li>`
            )
          ).join('')}
        </ul>
      </span>
    </div>`
  );
}

function renderShape(shape, n) {
  const statements = shape.statement_templates || shape.statement_constraints;

  return `
    <div class="shapeDiv">
      <div class="shapeProperty">${shape.shapeLabel}</div>

      ${statements && statements.length > 0 ? `
        <div class="statementDiv">
          ${statements.map(renderStatement).join('')}
        </div>
        ` : '' }
      
    </div>
  `;
}
export function Body({ shapes }) {
  return `<div>${shapes.map((s, i) => renderShape(s, i + 1)).join('')}</div>`;
}

export function Doc(body) {
  const [start, end] = layout.split("{}");

  return [start, body, end].join('');
}