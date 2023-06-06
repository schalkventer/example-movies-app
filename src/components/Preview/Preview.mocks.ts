import { Preview } from "./Preview";
import { faker } from "@faker-js/faker";

export const mocks = {
  basic: (): Preview => ({
    actors: faker.number.int({ min: 1, max: 12 }),
    image: faker.image.urlPicsumPhotos(),
    release: faker.date.past(),
    title: faker.datatype.boolean()
      ? faker.lorem.words(2)
      : faker.lorem.words(7),
  }),
};
