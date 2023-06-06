import { useStore } from "zustand";
import { createStore } from "./model";
import { List } from "./components";
import { createApi } from "./api";

const api = createApi();
const store = createStore(api);

export const App = () => {
  const phase = useStore(store, (state) => state.phase);
  const movies = useStore(store, (state) => state.list);

  if (phase === "LOADING") return <div>Loading...</div>;
  return <List movies={movies} />;
};
