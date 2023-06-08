import { createStore as createZustandStore, StoreApi } from "zustand";
import { Api, createApi } from "../api";

type Preview = {
  id: number;
  title: string;
  actors: number;
  release: Date;
  image: string;
};

type Store = {
  phase: "LISTING" | "LOADING" | "ERROR" | "CONFIGURING";
  list: Preview[];
  filter: string;

  toggleConfiguration: () => void;
  updateSearch: (value: string) => void;
};

const createTypedStore = createZustandStore<Store>();

export const createStore = (api: Api): StoreApi<Store> => {
  const store = createTypedStore((set, get) => ({
    phase: "LOADING",
    list: [],
    filter: "",

    toggleConfiguration: () => {
      const { phase } = get();

      return set({
        phase: phase === "CONFIGURING" ? "LISTING" : "CONFIGURING",
      });
    },

    updateSearch: (value?: string) => {
      set({ phase: "LISTING", filter: value || "" });
    },
  }));

  api.getMoviesList().then((data) => {
    if (data instanceof Error) {
      return store.setState({
        phase: "ERROR",
      });
    }

    store.setState({
      phase: "LISTING",
      list: data,
    });
  });

  return store;
};

const api = createApi();
export const store = createStore(api);
