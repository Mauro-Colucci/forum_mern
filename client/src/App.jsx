import PostForm from "./components/PostForm";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Post from "./components/Post";
import {
  RouterProvider,
  Outlet,
  createBrowserRouter,
  ScrollRestoration,
} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      {/*  <ScrollRestoration />
      <Outlet /> */}
      {/**will create routes for this and remove from layout. */}
      <SubHeader />
      <PostForm />
      <Post />
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
