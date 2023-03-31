import Header from "./components/Header";
import {
  RouterProvider,
  Outlet,
  createBrowserRouter,
  ScrollRestoration,
} from "react-router-dom";
import Subreddit from "./pages/Subreddit";
import PostPage from "./pages/PostPage";

const Layout = () => {
  return (
    <>
      <Header />
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Subreddit />,
        },
        {
          path: "/comments/:id",
          element: <PostPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
