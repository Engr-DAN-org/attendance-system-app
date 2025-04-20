import { coldStart } from "@/services/auth.service";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await coldStart(); // Await the result of coldStart()
        console.log("Cold start result:", result); // Log the result
      } catch (error) {
        console.error("Error during cold start:", error);
      }
    };
    fetchData(); // Call the async function immediately
    console.log("cookies:", document.cookie);
  }, []);
  return <div>Hello "/"!</div>;
}
