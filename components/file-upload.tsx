"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadProps) => {
  // Extract file extension safely
  const getExtension = (url: string) => {
    if (!url) return "";
    const cleanUrl = url.split("?")[0].split("#")[0];
    return cleanUrl.split(".").pop()?.toLowerCase() || "";
  };

  const extension = getExtension(value);
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  
  // Explicitly check if it's an image; otherwise treat as PDF/Document
  const isImage = imageExtensions.includes(extension);
  const isPDF = !isImage && !!value;

  // Render PDF / File Card Preview
  if (value && isPDF) {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 border border-slate-200 dark:border-slate-800">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-500 flex-shrink-0" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline break-all max-w-[200px]"
        >
          PDF Attachment
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Render Image Preview
  if (value && isImage) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const file = res?.[0];
        if (file) {
          let url = file.url;
          // Append extension hash if UploadThing URL lacks it
          if (file.name?.toLowerCase().endsWith(".pdf") && !url.toLowerCase().includes(".pdf")) {
            url = `${url}#.pdf`;
          }
          onChange(url);
        }
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};