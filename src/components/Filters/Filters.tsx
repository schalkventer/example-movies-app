import { useStore } from "zustand";
import { Presentation } from "./Filters.Presentation";
import { store } from "../../model";

export const Filters = () => {
  const filter = useStore(store, (state) => state.filter);
  const updateSearch = useStore(store, (state) => state.updateSearch);

  const toggleConfiguration = useStore(
    store,
    (state) => state.toggleConfiguration
  );

  return (
    <Presentation
      onSubmit={({ search }) => {
        updateSearch(search || "");
      }}
      filter={filter}
      onToggleConfigure={toggleConfiguration}
    />
  );
};
