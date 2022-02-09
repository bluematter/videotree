import { toast } from "react-toastify";
import { User } from "../../types/User";
import { ProgressToast, FileErrorToast } from "../../components/Toasts";
import uploadS3 from "./s3";
import createRecord from "./createRecord";
import updateRecord from "./updateRecord";

interface IUploadFiles {
  user: User;
  files: IFile[];
}

interface IFile {
  file: File;
}

export default async ({ user, files }: IUploadFiles) => {
  try {
    // TODO: Maybe create one toast with a list?
    const toasts: any = files.map((file: { file: File }) =>
      toast(
        <ProgressToast
          fileName={file?.file?.name}
          fileType={file?.file?.type}
        />,
        {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          closeOnClick: false,
          progress: 0,
        }
      )
    );

    // Update DB and S3
    const uploadedMedia = await Promise.all(
      files.map(async ({ file }: IFile, index: number) => {
        try {
          // Create Database records
          const newRecord = await createRecord({
            user,
            file,
          });

          const newMedia = await uploadS3({
            file,
            record: newRecord,
            toastId: toasts[index],
          });

          const updatedRecord = await updateRecord({
            media: newMedia,
          });

          return {
            newRecord,
            newMedia,
            updatedRecord,
          };
        } catch (e: any) {
          const errMsg = `Updating the record failed, we should let the user know ${e} ${JSON.stringify(
            e
          )}`;
          console.log(errMsg);

          throw new Error(errMsg);
        }
      })
    );

    // Update UI
    console.log({
      uploadedMedia,
    });
    // uploadedMedia.map(({ updatedRecord }: any) => {
    //   // update ...
    // });
  } catch (e: any) {
    const toastId = toast.error(<FileErrorToast />, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: false,
      autoClose: 5000,
    });

    toast.done(toastId);

    const errMsg = `Error uploadS3 ${e} ${JSON.stringify(
      e,
      Object.getOwnPropertyNames(e)
    )}`;

    console.log(errMsg);

    // track upload errors
  }
};
