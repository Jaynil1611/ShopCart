import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Cart, Filter, Listing, Navbar } from "./components";
import { useProduct } from "./contexts";
import data from "./data/data.json";
import { actions } from "./reducers";

function App() {
  const { dispatch } = useProduct();
  useEffect(() => {
    dispatch({
      type: actions.INITIALIZE_LIST,
      payload: { name: "productList", data },
    });
  }, [dispatch]);
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
              <Listing />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
