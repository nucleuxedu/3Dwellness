export type PortalView = "home" | "book" | "bookings" | "clients" | "plan" | "desk";

export type PortalShared = {
  version: number;
  bump: () => void;
  notify: (message: string) => void;
  go: (view: PortalView) => void;
};
