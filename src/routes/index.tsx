import { LoadingComponent } from "@/components/general-loader";
import { coldStart } from "@/services/auth.service";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [message, setMessage] = useState<string>(
    "System Loading. Please wait..."
  );
  const { navigate } = useRouter();

  navigate({ to: "/sign-in" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await coldStart(); // Await the result of coldStart()
        console.log("Cold start result:", result); // Log the result
        if (result) {
          // Perform any necessary actions with the result
          setMessage("Initialization complete. Redirecting...");

          setTimeout(() => {
            navigate({ to: "/sign-in" });
          }, 2000); // Redirect after 2 seconds
        } else {
          console.error("Cold start failed: No result returned");
        }
      } catch (error) {
        console.error("Error during cold start:", error);
      }
    };
    fetchData(); // Call the async function immediately
    console.log("cookies:", document.cookie);
  }, []);

  return (
    <div>
      <LoadingComponent fullScreen message={message} />
    </div>
  );
}
