import { ResultInfo } from "@/components/calculator/result-info";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Calculator/Result Info",
  component: ResultInfo,
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-4xl",
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
} satisfies Meta<typeof ResultInfo>;

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
