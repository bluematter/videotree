import fetch from "isomorphic-fetch";
import jwt from "jsonwebtoken";
import { SECRET } from "./mutation/auth";

interface GoogleUser {
  id: string;
  email: string | null;
}

export const getUser = (headers: any) => {
  const authorization = headers.authorization;

  if (!authorization) return null;
  else {
    const token = authorization.replace("Bearer ", "");

    if (token !== "undefined") {
      try {
        const user: any = jwt.verify(token, SECRET);

        return user.userId;
      } catch (error) {
        return null;
      }
    }

    return null;
  }
};

export async function getGoogleUser(googleToken: string): Promise<GoogleUser> {
  try {
    const endpoint = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`;
    const data = await fetch(endpoint).then((response: any) => response.json());

    if (data.error_description) {
      throw new Error(data.error_description);
    }

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}
