import { Route, Routes } from "react-router";
import { Cart, Filter, Listing, Navbar } from "./components";
import { useAxios } from "./server";

function App() {
  const { loadingStatus } = useAxios("data.json", "productList");

  return (
    <>
      <Navbar />

      <Routes>
        <Route path={"/cart"} element={<Cart />} />
        <Route
          path={"/"}
          element={
            <>
              <Filter />
              <Listing loading={loadingStatus} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
