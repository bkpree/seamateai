import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  href,
  icon,
  title,
  description,
}: Props) {
  return (
    <Link href={href} className="block">
      <Card className="h-full cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="p-7">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            {icon}
          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-600">
            Check your flight
            <ArrowRight size={16} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}