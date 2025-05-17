import QRScannerPage from "@/components/student/qr-scan";
import {
  revalidateCameraPermission,
  revalidateGeoLocationPermission,
} from "@/utils/permission-checker.util";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/student/qr-scan/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    async function validatePermissions() {
      await revalidateCameraPermission();
      await revalidateGeoLocationPermission();
    }
    validatePermissions();
  }, []);
  return (
    <div className="h-full flex items-center justify-center">
      <QRScannerPage />
    </div>
  );
}
