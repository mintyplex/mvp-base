// import { AbstraxionProvider } from "@burnt-labs/abstraxion";

type BurntWrapperProps = {
  disable?: boolean;
};

export default function BurntWrapper({
  children,
  disable,
}: React.PropsWithChildren<BurntWrapperProps>) {
  if (disable) return children;
  return <>{children}</>;
}
