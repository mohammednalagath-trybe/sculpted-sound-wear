import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Apex — Platform" }] }),
  component: AppShell,
});