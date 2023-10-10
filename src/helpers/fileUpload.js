export const fileUpload = async (file) => {
  if (!file) throw new Error("No existe el archivo");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dmc6xoqqm/upload";
  const formData = new FormData();
  
  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  try {
    const res = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("No se pudo subir imagen");

    const cloudRes = await res.json()

    return cloudRes

  } catch (error) {
    throw new Error(`${error.message}, Error de extension`);
  }
};
