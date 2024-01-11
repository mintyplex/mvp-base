import { cn } from "~/lib/utils/utils";
import { TypographyH4 } from "~/utils/typography";
import { Button } from "../ui/button";

export function SeeAllFor({
  Icon,
  name,
  route,
  tw,
}: {
  route: string;
  name: string;
  Icon: React.FC<{ className?: string }>;
  tw?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between")}>
      <div className="flex items-center gap-3">
        <div className={cn("p-1 rounded-md", tw)}>
          <Icon className="w-6 h-6" />
        </div>
        <TypographyH4 className="whitespace-nowrap">{name}</TypographyH4>
      </div>
      <Button className="" size="sm" variant={"ghost"}>
        <p className="text-mintyplex-primary">See all</p>
      </Button>
    </div>
  );
}
