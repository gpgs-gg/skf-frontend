export const normalize = (val) => {
  if (val === undefined || val === null) return "N/A";

  const cleaned = val.toString().trim();

  return cleaned || "N/A";
};

export const formatDateTime = () => {
  return new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/* =====================================================
   UPDATE WORKLOG
===================================================== */

export const generateWorklog = (oldData, newData, userName, empId) => {
  let changes = [];

  Object.keys(newData).forEach((key) => {
    // skip worklog field itself
    if (key === "WorkLog") return;

    const oldValue = normalize(oldData?.[key]);
    const newValue = normalize(newData?.[key]);

    if (oldValue !== newValue) {
      changes.push(`${key} changed from ${oldValue} to ${newValue}`);
    }
  });

  if (changes.length === 0) {
    return oldData?.WorkLog || "";
  }

  const logHeader = `[${formatDateTime()} ${empId} ${userName}]`;

  return `${logHeader}
${changes.join("\n")}

${oldData?.WorkLog || ""}`;
};

/* =====================================================
   CREATE WORKLOG
===================================================== */

export const generateCreateWorklog = (newData, userName, empId) => {
  let changes = [];

  Object.keys(newData).forEach((key) => {
    if (key === "WorkLog") return;

    const value = normalize(newData?.[key]);

    if (value === "N/A" || value === "-" || value === "null") {
      return;
    }

    changes.push(`${key} set to ${value}`);
  });

  const logHeader = `[${formatDateTime()}  ${empId} ${userName}]`;

  return `${logHeader}
Created new customer

${changes.join("\n")}

`;
};