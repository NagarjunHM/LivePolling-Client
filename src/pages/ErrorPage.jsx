import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl text-center">
        <h1 className="mt-8 text-4xl font-semibold">Oops!</h1>
        <p className="mt-8">Sorry, an unexpected error has occurred.</p>
        <p className="mt-8 font-light">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
