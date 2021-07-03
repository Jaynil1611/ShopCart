import { useEffect } from "react";
import { Filter, Listing, Navbar } from "./components";
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
      <Filter />
      <Listing />
    </>
  );
}

export default App;
