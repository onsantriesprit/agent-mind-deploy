type Status = "success" | "warning" | "danger" | "muted" | "primary";
const map: Record<Status, string> = {
  success: "bg-success text-success",
  warning: "bg-warning text-warning",
  danger: "bg-danger text-danger",
  muted: "bg-muted-foreground text-muted-foreground",
  primary: "bg-primary text-primary",
};
export function StatusDot({ status = "success", pulse = true, className = "" }: { status?: Status; pulse?: boolean; className?: string }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${map[status].split(" ")[0]} ${pulse ? "pulse-dot" : ""} ${className}`} />;
}
