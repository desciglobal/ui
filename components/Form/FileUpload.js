import Image from "next/image";

export default function FileUpload({
  isUploading,
  isDeleting,
  fileUpload,
  fileDelete,
  uploadedFile,
  onEventImageFileChange,
  eventImageFile,
}) {
  function handleFileDelete() {
    fileDelete();
    // set uploaded file to zero
  }

  if (isUploading) {
    return (
      <div>
        <div className=""></div>
        <p>Uploading...</p>
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
      </div>
    );
  }
  if (isDeleting) {
    return (
      <div>
        <div className=""></div>
        <p>Deleting...</p>
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
      </div>
    );
  }

  return (
    <div>
      {uploadedFile ? (
        <div className="flex w-full justify-between">
          <Image
            src={uploadedFile.url}
            alt="Uploaded Image"
            width={200} // Set the desired size
            height={200}
          />
          <button
            type="button"
            className={"underline"}
            onClick={handleFileDelete}
          >
            Delete
          </button>
        </div>
      ) : (
        <>
          <div className="flex w-full justify-between">
            <input
              id="event_image_file"
              type="file"
              accept="image/png, image/jpeg"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={onEventImageFileChange}
            />
            {eventImageFile ? (
              <button
                type="button"
                className={"underline"}
                onClick={fileUpload}
              >
                UPLOAD
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
