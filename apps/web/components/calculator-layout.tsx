import { Stepper } from "@/components/step";

interface CalculatorLayoutProps {
  children: React.ReactNode;
  step?: 1 | 2;
  title: string;
}

export default function CalculatorLayout({
  children,
  step = undefined,
  title,
}: CalculatorLayoutProps) {
  return (
    <div className="flex flex-col">
      {step && (
        <div className="flex justify-center mt-6">
          <Stepper activeStep={step} steps={["1", "2"]} />
        </div>
      )}
      <div className="flex text-4xl justify-center my-6 font-semibold">
        {title}
      </div>
      <div className="mb-40">{children}</div>
    </div>
  );
}
