import { cn } from "@repo/ui/lib/utils";

interface StepProps {
  label: string;
  active: boolean;
}

interface StepperProps {
  activeStep: number;
  steps: string[];
}

export function Step({ label, active }: StepProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center bg-card border rounded-full size-7 text-xs",
        active &&
          "bg-green-50 border-green-600 dark:bg-green-950 dark:border-green-900"
      )}
    >
      {label}
    </div>
  );
}

export function Stepper({ activeStep, steps }: StepperProps) {
  return (
    <div className="flex gap-4">
      {steps.map((step, index) => (
        <Step label={step} active={index + 1 === activeStep} key={step} />
      ))}
    </div>
  );
}
