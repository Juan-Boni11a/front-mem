export const errorMapping = (error) => {

  let messageToShow = null;

  switch (error.code) {
    case 503:
      messageToShow = "ERROR EN EL SERVIDOR";
      break;
    case 502:
      messageToShow = "ERROR EN EL SERVIDOR 2";
      break;
    default:
      break;
  }
  if (!messageToShow) {
    if (error.message) {
      messageToShow = error.message;
    } else {
      messageToShow = "Existe un error";
    }
  }


  return messageToShow;
};
