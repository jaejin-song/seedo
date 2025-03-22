import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { FormControl, FormField, FormItem } from "@repo/ui/components/form";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import { Label } from "@repo/ui/components/label";
import { useCalculatorStore } from "@/store/useCalculatorStore";

const methods = [
  {
    id: "1",
    name: "거치식",
    description: "예금처럼 한번에 목돈을 투자하고 싶어요.",
  },
  {
    id: "2",
    name: "적립식",
    description: "적금처럼 매달 일정 금액을 투자하고 싶어요.",
  },
] as const;

export function MethodCard() {
  const form = useCalculatorStore((state) => state.form);

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>투자 유형</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form?.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="max-w-sm"
                >
                  {methods.map((method) => (
                    <Label
                      className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border border-neutral-700 p-4 has-[[data-state=checked]]:border-green-600 has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:border-green-900 dark:has-[[data-state=checked]]:bg-green-950"
                      key={method.id}
                    >
                      <RadioGroupItem
                        value={method.id}
                        id={method.name}
                        className="shadow-none data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white"
                      />
                      <div className="grid gap-1 font-normal">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-muted-foreground leading-snug">
                          {method.description}
                        </div>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
      </CardContent>
    </Card>
  );
}
