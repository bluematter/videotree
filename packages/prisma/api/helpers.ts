import fetch from "isomorphic-fetch";

interface GoogleUser {
  id: string;
  email: string | null;
}

export async function getGoogleUser(googleToken: string): Promise<GoogleUser> {
  const endpoint = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`;
  const data = await fetch(endpoint).then((response: any) => response.json());

  if (data.error_description) {
    throw new Error(data.error_description);
  }

  return data;
}
