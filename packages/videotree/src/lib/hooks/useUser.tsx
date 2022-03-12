import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import Cookies from "js-cookie";
import { User } from "../../types/User";
import { GRAPHQL_ENDPOINT } from "src/constants";

const GET_USER = `
  query {
    user {
      id
      picture
    }
  }
`;

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>(
    GRAPHQL_ENDPOINT,
    (url) => {
      const token = typeof window !== "undefined" && Cookies.get("token");

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: GET_USER,
        }),
      })
        .then((r) => r.json())
        .then(({ data }) => data.user);
    }
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.id) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.id)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return {
    user,
    mutateUser,
  };
}
