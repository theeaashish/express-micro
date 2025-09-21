import { supportedMimes } from "../config/filesystem.config.ts";
import { v4 as uuid } from "uuid";

export const imageValidator = (size: number, mime: string) => {
  if (bytesToMb(size) > 2) {
    return "File size should be less than 2MB";
  } else if (!supportedMimes.includes(mime)) {
    return "Image type not supported";
  }

  return null;
};

export const bytesToMb = (bytes: number) => {
  return bytes / (1024 * 1024);
};

export const generateRandomNum = () => {
  return uuid();
};
