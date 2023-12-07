export const fillWithZeros = (val, size) => {
  let newVal = val + "";
  while (newVal.length < size) {
    newVal = "0" + newVal;
  }
  return newVal;
};

export const IsOnlyNumbers = (val) => {
  const re = /^[0-9\b]+$/;
  if (val === "" || re.test(val)) {
    return true;
  }
  return false;
};

export const onlyAceptNumbers = (val) => {
  const onlyNums = val.replace(/[^0-9]/g, "");
  return onlyNums;
};

export const validateRucLength = (val) => {
  if (val.length === 10 || val.length === 13) {
    return true;
  }
  return false;
};

export const getToday = () => {
  let d = new Date();
  d = d.toLocaleString("es-CO", { timeZone: "Etc/GMT+5" });
  let onlyDate = d.split(",")[0];
  let dateSplited = onlyDate.split("/");
  const dformat =
    dateSplited[2] +
    "-" +
    fillWithZeros(dateSplited[1], 2) +
    "-" +
    fillWithZeros(dateSplited[0], 2);
  return dformat;
};
export const getTomorrow = () => {
  let d = new Date();
  const dformat =
    d.getFullYear() +
    "-" +
    fillWithZeros(d.getMonth() + 1, 2) +
    "-" +
    fillWithZeros(d.getDate() + 1, 2);
  return dformat;
};
export const getNextMonth = () => {
  let d = new Date();
  d = d.toLocaleString("es-CO", { timeZone: "Etc/GMT+5" });
  let onlyDate = d.split(",")[0];
  let dateSplited = onlyDate.split("/");
  let day = fillWithZeros(dateSplited[0], 2);
  if (day === "31") {
    if (fillWithZeros(dateSplited[1], 2) === "01") {
      day = "28";
      return;
    }
    day = "30";
  }
  const dformat =
    dateSplited[2] +
    "-" +
    fillWithZeros(parseInt(dateSplited[1]) + 1, 2) +
    "-" +
    day;
  return dformat;
};

export const getDateToTextFieldOld = (date) => {
  if (!date) {
    return "";
  }
  const splitedDateTime = date.split("T");
  const splitedDate = splitedDateTime[0].split("-");
  return splitedDate[0] + "-" + splitedDate[1] + "-" + splitedDate[2];
};
export const getDateToTextField = (date) => {
  if (!date) {
    return "";
  }
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate()
  const dateToTextField = year + "-" + fillWithZeros(month, 2) + "-" + fillWithZeros(day, 2);
  return dateToTextField
};

export const validDataRangeText = (firstDate, secondDate) => {
  if (firstDate === "" || secondDate === "") {
    return false;
  }
  let startDate = new Date(firstDate);
  let endDate = new Date(secondDate);
  return startDate < endDate;
};

export const dateIsInRange = (firstDate, secondDate, toControl) => {
  if (firstDate === "" || secondDate === "") {
    return false;
  }
  let startDate = new Date(firstDate);
  let endDate = new Date(secondDate);
  let toValidate = new Date(toControl);

  return (startDate <= toValidate && toValidate <= endDate)
};

export const getNameById = (dataId, allData, toReturn) => {
  const found = allData?.find((u) => u.id === dataId);
  if (found) {
    return found[toReturn];
  }

  return "";
};

export const getNameByPath = (dataId, allData, toReturn) => {
  const found = allData?.find((u) => u.path === dataId);
  if (found) {
    return found[toReturn];
  }

  return "";
};

export const handleChangeMultipleSelect = (event, setstate) => {
  const {
    target: { value },
  } = event;
  setstate(
    typeof value === "string" ? value.split(",") : value
  );
};

export const getStatusName = (value) => {
  switch (value) {
    case 0:
      return "Registrado";
    case 1:
      return "Guardado sin Enviar";
    case 2:
      return "Enviado para Revisión";
    case 3:
      return "Necesita Convalidación";
    case 4:
      return "Enviado para Convalidación";
    case 5:
      return "Aprobado";
    case 6:
      return "Rechazado";
    default:
      return "No identificado";
  }
};

export const generalStatusAllowesToQualify = (value) => {
  switch (value) {
    case 0:
      return false;
    case 1:
      return false;
    case 2:
      return true;
    case 3:
      return false;
    case 4:
      return true;
    case 5:
      return false;
    case 6:
      return false;
    default:
      return false;
  }
};

export const base64ToArrayBuffer = (base64) => {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};
export const saveByteArray = (reportName, byte) => {
  var blob = new Blob([byte], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
};
export const viewByteArray = (byte) => {
  var blob = new Blob([byte], { type: "application/pdf" });
  var fileURL = window.URL.createObjectURL(blob);
  let tab = window.open();
  tab.location.href = fileURL;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!bytes) return "Indefinido";
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
