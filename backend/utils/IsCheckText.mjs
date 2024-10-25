import axios from "axios";
import { fileTypeFromBuffer } from "file-type";

/**This check for isText? from url.if return false this is file type. */
export const IsCheckTextFromURL = async (url) => {
  try {
    if (!IsCheckUrl(url)) return true;
    const response = await axios({
      url,
      method: "GET",
      responseType: "arraybuffer", // Get the data as a binary buffer
    });

    // Check if the Content-Type indicates text
    const contentType = response.headers["content-type"];

    if (contentType.startsWith("text/") || contentType.includes("json")) {
      return true;
    }
    // If not text, try to detect if it's a binary file (image, video, etc.)
    const fileType = await fileTypeFromBuffer(response.data);

    if (fileType) {
      const isImage = fileType.mime.startsWith("image/");
      const isVideo = fileType.mime.startsWith("video/");

      if (isImage || isVideo) {
        return false;
      } else {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export function IsCheckUrl(input) {
  try {
    // Try creating a new URL object
    const url = new URL(input);

    // If successful, it means the input is a valid URL
    return true;
  } catch (err) {
    // If an error occurs, it means the input is not a valid URL
    return false;
  }
}
