import { mocks } from "../components/Preview";
import { List } from "../components/List";

const list: List["movies"] = new Array(40)
  .fill(undefined)
  .map(mocks.basic)
  .map((item, index) => ({
    ...item,
    id: index + 1,
  }));

export type Api = {
  getMoviesList: () => Promise<List["movies"]>;
};

export const createApi = (): Api => {
  return {
    getMoviesList: () =>
      new Promise((resolve) => {
        console.log("asdasd");
        setTimeout(() => resolve(list), 3000);
      }),
  };
};
