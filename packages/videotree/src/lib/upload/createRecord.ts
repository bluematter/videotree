import { GraphQLClient } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "src/constants";
import { User } from "../../types/User";

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT);

const CREATE_MEDIA = `
  mutation($ownerId: ID!, $type: String, $loading: Boolean) {
    createMedia(ownerId: $ownerId, type: $type, loading: $loading) {
      id
    }
  }
`;

interface ICreateUpload {
  user: User;
  file: File;
}

// Creates DB record
const createUploadRecord = async ({ user, file }: ICreateUpload) => {
  try {
    if (!file) {
      throw new Error(
        "It seems the file doesn't exist or is broken... Reporting to the team."
      );
    }

    const { createMedia } = await graphQLClient.request(CREATE_MEDIA, {
      type: file.type,
      ownerId: user.id,
      loading: true,
    });

    return {
      file,
      createMedia,
    };
  } catch (e: any) {
    console.log("Error inside createRecord", {
      e,
    });
    throw new Error(e);
  }
};

export default createUploadRecord;
