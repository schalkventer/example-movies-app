import { createStore as createZustandStore, StoreApi } from "zustand";
import { Api } from "../api";

type Preview = {
  id: number;
  title: string;
  actors: number;
  release: Date;
  image: string;
};

type Store = {
  phase: "LISTING" | "LOADING";
  list: Preview[];
};

const createTypedStore = createZustandStore<Store>();

export const createStore = (api: Api): StoreApi<Store> => {
  const store = createTypedStore(() => ({
    phase: "LOADING",
    list: [],
  }));

  api.getMoviesList().then((data) => {
    store.setState({
      phase: "LISTING",
      list: data,
    });
  });

  return store;
};
