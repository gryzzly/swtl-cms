// utils/widget-utils.js
export function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function selectWidget(field, fieldKey, currentItem = null) {
  const value =
    currentItem && currentItem[field.name]
      ? typeof currentItem[field.name] === "string"
        ? escapeHTML(currentItem[field.name])
        : currentItem[field.name]
      : "";

  // Handle built-in widgets first
  switch (field.widget) {
    case "date":
      const dateValue = value
        ? new Date(parseInt(value)).toISOString().split("T")[0]
        : "";
      return `
        <input
          type="date"
          id="${fieldKey}"
          name="${field.name}"
          value="${dateValue}"
        />`;
    case "boolean":
      return `
        <input
          type="checkbox"
          id="${fieldKey}"
          name="${field.name}"
          ${value ? "checked" : ""}
          value="true"
        />`;
  }

  // If it's a custom widget return the element
  if (field.widgetUrl) {
    return `<${field.widget}
      id="${fieldKey}"
      name="${field.name}"
      value="${value}"
      ${field.widgetConfig ? `config='${JSON.stringify(field.widgetConfig)}'` : ""}
    ></${field.widget}>`;
  }

  // Default to basic text input
  return `<input id="${fieldKey}" name="${field.name}" value="${value}"/>`;
}
