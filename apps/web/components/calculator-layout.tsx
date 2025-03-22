import { Stepper } from "@/components/step";

interface CalculatorLayoutProps {
  children: React.ReactNode;
  step: 1 | 2;
  title: string;
}

export default function CalculatorLayout({
  children,
  step,
  title,
}: CalculatorLayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center my-6">
        <Stepper activeStep={step} steps={["1", "2"]} />
      </div>
      <div className="flex text-4xl justify-center mb-6 font-semibold">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
