import { ReactNode } from "react";

/** Homepage chrome lives in _app (header / main / footer) for taste checker edges. */
type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
