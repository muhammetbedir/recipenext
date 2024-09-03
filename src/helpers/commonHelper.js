export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result?.toString() || "";
      const [, base64Data] = base64String.split(";base64,");
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};
