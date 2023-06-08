import { StoryObj, Meta } from "@storybook/react";
import { Preview } from "./Preview";
import { mocks } from "./Preview.mocks";

const meta: Meta<Preview> = {
  title: "components/Preview",
  component: Preview,

  argTypes: {
    release: {
      control: "date",
    },
  },
};

export default meta;

export const Basic: StoryObj<Preview> = {
  args: mocks.basic(),
};
