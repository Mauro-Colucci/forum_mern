import Header from "./components/Header";
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import Subreddit from "./pages/Subreddit";
import PostPage from "./pages/PostPage";

const Layout = () => {
  return (
    <>
      <Header />
      {/* <ScrollRestoration /> */}
      <Outlet />
    </>
  );
};

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  /*  const router = createBrowserRouter([
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
  return <RouterProvider router={router} />; */
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Subreddit />} />
          <Route path="/comments/:id" element={<PostPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/comments/:id" element={<PostPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
