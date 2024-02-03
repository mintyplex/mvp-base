import { cn } from "~/lib/utils/utils";
import { TypographyH4 } from "~/utils/typography";
import { Button } from "../ui/button";
import Link from "next/link";

export function SeeAllFor({
  Icon,
  name,
  route,
  tw,
  hideSeeAll,
}: {
  route: string;
  name: string;
  Icon: React.FC<{ className?: string }>;
  tw?: string;
  hideSeeAll?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between")}>
      <div className="flex items-center gap-3">
        <div className={cn("p-1 rounded-md", tw)}>
          <Icon className="w-6 h-6" />
        </div>
        <TypographyH4 className="whitespace-nowrap">{name}</TypographyH4>
      </div>
      {!hideSeeAll && (
        <Button asChild className="" size="sm" variant={"ghost"}>
          <Link href={route}>
            <p className="text-mintyplex-primary">See all</p>
          </Link>
        </Button>
      )}
    </div>
  );
}
