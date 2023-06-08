import { useStore } from "zustand";
import { useNavigate } from "react-router-dom";
import { store } from "../../model";
import { Presentation } from "./List.Presentation";

export const List = (props: { configuration: JSX.Element }) => {
  const { configuration } = props;
  const phase = useStore(store, (state) => state.phase);
  const movies = useStore(store, (state) => state.list);
  const filter = useStore(store, (state) => state.filter);
  const navigate = useNavigate();

  const toggleConfiguration = useStore(
    store,
    (state) => state.toggleConfiguration
  );

  return (
    <Presentation
      onSelect={(value) => navigate(`/movie/${value}`)}
      movies={movies}
      phase={phase}
      filter={filter}
      onToggleConfigure={toggleConfiguration}
      configuration={configuration}
    />
  );
};
