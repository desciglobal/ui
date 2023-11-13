import { useState } from "react";
import toast from "react-hot-toast";

export function useFileUpload() {
  const [eventImageFile, setEventImageFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onEventImageFileChange = (e) => {
    const file = e.target.files[0];
    setEventImageFile(file);
  };

  async function fileUpload() {
    const formData = new FormData();
    formData.append("file", eventImageFile);

    try {
      setIsUploading(true);
      const response = await fetch(`/api/hygraph/fileUpload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const uploadedFile = await response.json();
        setIsUploading(false);
        setUploadedFile(uploadedFile);
        setEventImageFile(undefined);
        toast.success("File Uploaded");
      }
    } catch (err) {
      console.error("Error uploading file: ", err);
      toast.error("Error Uploading the file", err);
    }
  }

  async function fileDelete() {
    //@ts-ignore
    if (!uploadedFile || !uploadedFile.id) {
      toast.error("No file selected for deletion");
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/hygraph/fileDelete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //@ts-ignore

        body: JSON.stringify({ fileId: uploadedFile.id }),
      });

      if (response.ok) {
        const deletedFile = await response.json();
        setIsDeleting(false);
        setUploadedFile(undefined);
        toast.success("File Deleted");
      }
    } catch (err) {
      console.error("Error deleting file: ", err);
      toast.error("Error deleting file", err);
    }
  }

  async function filePublish() {
    //@ts-ignore
    if (!uploadedFile || !uploadedFile.id) {
      return;
    }

    try {
      const response = await fetch(`/api/hygraph/filePublish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //@ts-ignore

        body: JSON.stringify({ fileId: uploadedFile.id }),
      });

      if (response.ok) {
        const publishedFile = await response.json();
        toast.success("File published");
        console.log("Publishes from Hook", publishedFile);
      }
    } catch (err) {
      console.error("Error publishing file: ", err);
      toast.error("Error publishing file", err);
    }
  }

  return {
    eventImageFile,
    setEventImageFile,
    uploadedFile,
    setUploadedFile,
    isUploading,
    isDeleting,
    setIsUploading,
    fileUpload,
    onEventImageFileChange,
    fileDelete,
    filePublish,
  };
}
