import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { GraphQLClient } from "graphql-request";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import { GRAPHQL_ENDPOINT } from "src/constants";

const GOOGLE_AUTH = `
  mutation($googleToken: String) {
    authenticateGoogleUser(googleToken: $googleToken) {
      id
    }
  }
`;

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT);

const Signup = () => {
  const handleGoogle = async (response: GoogleLoginResponse | any) => {
    const auth = await graphQLClient.request(GOOGLE_AUTH, {
      googleToken: response.tokenObj.id_token,
    });

    console.log("Google", {
      auth,
      response,
    });
  };

  return (
    <div className="min-h-full flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <a href="/" className="font-bold font-honey text-xl">
              Videotree
            </a>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign Up
            </h2>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <div className="mt-1 grid grid-cols-3 gap-3">
                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign up with Facebook</span>
                      <MdFacebook size={20} />
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign up with Twitter</span>
                      <AiOutlineTwitter size={20} />
                    </a>
                  </div>

                  <div>
                    {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        render={(renderProps) => (
                          <button
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            disabled={renderProps.disabled}
                            onClick={renderProps.onClick}
                          >
                            <span className="sr-only">Sign up with Google</span>
                            <AiOutlineGoogle size={20} />
                          </button>
                        )}
                        onSuccess={handleGoogle}
                        onFailure={handleGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="text-sm">
                    Have an account?{" "}
                    <a
                      href="/login"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Log In
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        {" "}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Signup;
