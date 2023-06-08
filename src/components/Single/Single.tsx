import { useStore } from "zustand";
import { store } from "../../model";
import { useNavigate, useParams } from "react-router-dom";
import { Presentation } from "./Single.Presentation";

export const Single = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) throw new Error("ID expected");
  const idAsNumber = parseInt(id);

  if (Number.isNaN(idAsNumber))
    throw new Error("ID is supposed to be a number");

  const movies = useStore(store, (state) => state.list);
  const active = movies.find(({ id: currentId }) => currentId === idAsNumber);
  if (!active) throw new Error("No matching movie");
  return <Presentation title={active.title} onClose={() => navigate("/")} />;
};
