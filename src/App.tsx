import { List } from "./components/List";
import { Filters } from "./components/Filters";
import { Single } from "./components/Single";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie/:id" element={<Single />} />
        <Route path="/" element={<List configuration={<Filters />} />} />
      </Routes>
    </BrowserRouter>
  );
};
