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
import useAuth from "./hooks/useAuth";

const Layout = () => {
  const user = useAuth();

  return (
    <>
      <Header />
      {/*  <ScrollRestoration />
      <Outlet /> */}
      {/**will create routes for this and remove from layout. */}
      <SubHeader />
      <div className="flex flex-col gap-4 py-4">
        {!!user && <PostForm />}
        <Post />
      </div>
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
