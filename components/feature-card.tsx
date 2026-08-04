import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function FeatureCard({
  href,
  icon,
  title,
  description,
  onClick,
}: Props) {
  return (
    <Link href={href}>
      <Card
      onClick={onClick}
      className="cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
    >
      <CardContent className="space-y-5 p-6">
        <div className="text-blue-600">{icon}</div>

        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-gray-600">{description}</p>

        <div className="flex items-center gap-2 text-blue-600 font-medium">
          Explore
          <ArrowRight size={16} />
        </div>
      </CardContent>
    </Card>
    </Link>
    
  );
}