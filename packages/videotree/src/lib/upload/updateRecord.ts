import { GraphQLClient } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "src/constants";

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT);

const UPDATE_MEDIA = `
  mutation($id: ID!, $mediaurl: String!, $loading: Boolean) {
    updateMedia(id: $id, mediaurl: $mediaurl, loading: $loading) {
      id
      mediaurl
    }
  }
`;

interface IUpdateRecord {
  media: any;
}

// Updates DB record
const updateRecord = async ({ media }: IUpdateRecord) => {
  try {
    const { updateMedia } = await graphQLClient.request(UPDATE_MEDIA, {
      id: media.record.createMedia.id,
      mediaurl: media.url,
      loading: false,
    });

    return updateMedia;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default updateRecord;
