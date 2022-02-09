import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";
import { toast } from "react-toastify";
import { IS_DEV } from "../../constants";

const UPLOADS_BUCKET_NAME = IS_DEV
  ? "videotree.uploads.v1.dev"
  : "videotree.uploads.v1";

const IdentityPoolId = "us-west-2:99a53749-174a-49ef-a868-eaf251aef431";

AWS.config.update({
  region: "us-west-2",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

const s3 = new S3({
  apiVersion: "2006-03-01",
  region: "us-west-2",
});

interface IS3 {
  file: File;
  record: any;
  toastId: string;
}

const s3Upload = async ({ file, record, toastId }: IS3) => {
  try {
    if (!file) {
      throw new Error(
        "File seems to be broken inside s3 uploader... Reporting to the team."
      );
    }

    const s3Data: any = await new Promise((resolve, reject) => {
      try {
        s3.upload(
          {
            Bucket: UPLOADS_BUCKET_NAME,
            Key: record.createMedia.id,
            ContentType: file?.type,
            Body: file,
          },
          async (error: Error, data: any) => {
            if (error) {
              console.log({ error });
              return reject({ error });
            }

            if (!data) {
              return reject({
                error: "S3 did not come back with data",
              });
            }

            return resolve({
              record,
              url: data.Location,
            });
          }
        ).on("httpUploadProgress", (progress) => {
          const progressPercentage = Math.round(
            (progress.loaded / progress.total) * 100
          );

          toast.update(toastId, {
            progress: progressPercentage / 100,
          });
        });
      } catch (e) {
        console.log("Error inside s3Data http", { e });
        return reject({
          e,
        });
      }
    });

    toast.done(toastId);

    setTimeout(() => {
      toast.dismiss(toastId);
    }, 1500);

    return {
      url: s3Data.url,
      record: s3Data.record,
    };
  } catch (e) {
    throw new Error(`Error uploading media ${e} ${JSON.stringify(e)}`);
  }
};

export default s3Upload;
