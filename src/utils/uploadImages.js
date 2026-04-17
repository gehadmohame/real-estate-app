export const uploadImages = async (files) => {
  const urls = [];

  for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/your_cloud/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    urls.push(data.secure_url);
  }

  return urls;
};