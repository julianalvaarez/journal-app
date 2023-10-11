export const fileUpload = async (file) => {
  // Verificar si el archivo existe.
  if (!file) {
      throw new Error("No existe el archivo");
  }

  // URL de la API de Cloudinary para subir archivos.
  const cloudUrl = "https://api.cloudinary.com/v1_1/dmc6xoqqm/upload";

  // Crear un objeto FormData para enviar el archivo al servidor.
  const formData = new FormData();
  formData.append("upload_preset", "journal-app"); // Clave de carga preestablecida en Cloudinary.
  formData.append("file", file);

  try {
      // Enviar la solicitud POST a la API de Cloudinary con el archivo.
      const res = await fetch(cloudUrl, {
          method: "POST",
          body: formData,
      });

      // Manejar errores si la respuesta no es exitosa.
      if (!res.ok) {
          throw new Error("No se pudo subir imagen");
      }

      // Analizar la respuesta JSON de Cloudinary y devolverla.
      const cloudRes = await res.json();
      return cloudRes;
  } catch (error) {
      // Capturar cualquier error durante el proceso y lanzar una nueva excepción.
      throw new Error(`${error.message}, Error de extensión`);
  }
};
