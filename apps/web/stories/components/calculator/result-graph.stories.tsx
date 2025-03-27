import { ResultGraph } from "@/components/calculator/result-graph";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ResultGraph> = {
  title: "Components/Calculator/Result Graph",
  component: ResultGraph,
  parameters: {
    layout: "centered",
  },
  args: {
    result: {
      totalInvestment: 100000000,
      currentValue: 101116013,
      profit: 1116013,
      profitPercent: 1.12,
      startDate: new Date(2025, 0, 1),
      endDate: new Date(2025, 2, 1),
      duration: 3,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Plus: Story = {};

export const Minus: Story = {
  args: {
    result: {
      totalInvestment: 100000000,
      currentValue: 9927190,
      profit: -72810,
      profitPercent: -0.73,
      startDate: new Date(2025, 0, 1),
      endDate: new Date(2025, 2, 1),
      duration: 3,
    },
  },
};
