export const getMoment = () => {
  let moment = { date: null, time: null };
  const date = new Date();
  const today = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
  const now = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  moment = { date: today, time: now };
  return moment;
};

export const handleImageChange = e => {
  e.preventDefault();
  const setState = {
    error: "",
    images: {}
  };

  const fileTypes = ["jpg", "jpeg", "png", "gif"];
  const reader = new FileReader();
  let file = e.target.files[0];
  if (file) {
    let extension = file.name
      .split(".")
      .pop()
      .toLowerCase();
    const isImage = fileTypes.indexOf(extension) > -1;

    const size = file.size < 1048487;
    if (!isImage) {
      setState.error = "No es un archivo de imagen";
      setState.images = { imageUrl: "" };
    } else if (!size) {
      setState.error = "Archivo demasiado grande";
      setState.images = { imageUrl: "" };
    } else {
      setState.error = null;
      // console.log(file);
      reader.onloadend = () => {
        setState.error = null;
        setState.images = { imageName: file.name, imageUrl: reader.result };
      };
      reader.readAsDataURL(file);
    }
  }
  return setState;
};
