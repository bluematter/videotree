import React, { ComponentType, useState, memo } from "react";
import { v1 as uuid } from "uuid";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
// import uploadFiles from "./uploadFiles";
import { FileErrorToast } from "../components/Toasts";

const UploadZoneStyle = styled.div`
  width: 100%;
  height: 100%;
`;

const ActiveDrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
`;

const withUploadZone = <P extends {}>(Component: ComponentType<P>) =>
  memo(({ ...props }) => {
    // const { setFilesProgress, deleteFilesProgress } = useFileStore();
    const [firstFileType, setFirstFileType] = useState<string>("");

    const handleDrop = async (acceptedFiles: any) => {
      if (acceptedFiles && acceptedFiles.length) {
        try {
          console.log({
            startDrop: new Date().toLocaleTimeString(),
          });

          setFirstFileType(acceptedFiles[0].type.split("/")[0]);

          const files = acceptedFiles
            .filter((file: File) => {
              if (file.size > 50000000) {
                const message = `<p style="display: inline-block; margin: 0;">It seems you are on the free plan. You can only upload files <b>50MB</b> or less. <a>Click here to upgrade</a></p>`;

                const toastId = toast.error(
                  <FileErrorToast message={message} />,
                  {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    autoClose: 5000,
                  }
                );

                toast.done(toastId);

                setTimeout(() => {
                  toast.dismiss(toastId);
                }, 10000);

                // track("error", {
                //   message,
                //   timestamp: new Date().toISOString(),
                // });

                return false;
              }

              return true;
            })
            .map((file: File) => ({
              uid: uuid(),
              file,
            }));

          if (files.length) {
            // await uploadFiles({
            //   batch,
            //   deleteFilesProgress,
            //   deleteMap,
            //   files,
            //   onCreateMedia,
            //   onUpdateMedia,
            //   setFilesProgress,
            //   setMap,
            //   setObject,
            //   store,
            //   track,
            //   user,
            //   videoId,
            // });
          }
        } catch (e: any) {
          const errMsg = `Error withUploadZone createRecords ${e} ${JSON.stringify(
            e,
            Object.getOwnPropertyNames(e)
          )}`;

          console.log(errMsg);

          const toastId = toast.error(
            <FileErrorToast
              message={`Sorry there was a minor error uploading ${JSON.stringify(
                e
              )}. It's been reported and we are investigating.`}
            />,
            {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: false,
              autoClose: 5000,
            }
          );

          toast.done(toastId);

          // track("error", {
          //   message: errMsg,
          //   timestamp: new Date().toISOString(),
          // });
        }
      } else {
        const errMsg = `Error withUploadZone acceptedFiles issues ${JSON.stringify(
          acceptedFiles
        )}`;
        console.log(errMsg);

        const toastId = toast.error(
          <FileErrorToast
            message={`Sorry there was a minor error uploading ${JSON.stringify(
              acceptedFiles
            )}. It's been reported and we are investigating.`}
          />,
          {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            autoClose: 5000,
          }
        );

        toast.done(toastId);

        // track("error", {
        //   message: errMsg,
        //   timestamp: new Date().toISOString(),
        // });
      }
    };

    const { getRootProps, isDragActive } = useDropzone({
      onDrop: handleDrop,
      noKeyboard: true,
      noClick: true,
    });

    return (
      <>
        <UploadZoneStyle {...(getRootProps as any)()}>
          {isDragActive && (
            <ActiveDrop>
              <h1 className="font-weight-bold">Drop media to upload</h1>
            </ActiveDrop>
          )}
          <Component
            {...(props as P)}
            isUploadActive={{
              active: isDragActive,
              firstFileType,
            }}
            onUploadFiles={handleDrop}
          />
        </UploadZoneStyle>
      </>
    );
  });

export default withUploadZone;
