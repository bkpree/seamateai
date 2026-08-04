import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AICard() {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-6">
      <Card className="border-blue-100 bg-blue-50">
        <CardContent className="flex flex-col items-center gap-5 py-10 text-center">
          <Bot size={42} className="text-blue-600" />

          <div>
            <h2 className="text-2xl font-bold">
              Need more help?
            </h2>

            <p className="mt-2 text-gray-600">
              Ask our multilingual AI assistant about flights,
              airport services or transportation in your preferred language.
            </p>
          </div>

          <Button size="lg">
            Launch AI Assistant
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}