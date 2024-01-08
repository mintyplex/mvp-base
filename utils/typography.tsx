import { cn } from "~/lib/utils/utils";

type TypographyProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

// I know I can specify both as TypographyProps, but I want to be explicit here.
type TypographyPropsParagraph = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

export function TypographyH1({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <h2
      {...props}
      className={cn(
        "pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <h3
      {...props}
      className={cn(
        "text-2xl font-semibold tracking-tight scroll-m-20",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <h4
      {...props}
      className={cn(
        "text-xl font-semibold tracking-tight scroll-m-20",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  className,
  ...props
}: TypographyPropsParagraph) {
  return (
    <p
      {...props}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
}
