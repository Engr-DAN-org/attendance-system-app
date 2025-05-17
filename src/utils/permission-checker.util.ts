const requestGeoLocationPermission = async (): Promise<boolean> => {
  if (!("geolocation" in navigator)) {
    console.warn("Geolocation API not supported.");
    alert("Geolocation is not supported.");
    return false;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => resolve(true), // success
      (error) => {
        console.error("Geolocation error:", error);
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location permission denied. Please enable it manually.");
        }
        resolve(false); // denied or failed
      }
    );
  });
};

const isGeoLocationPermissionGranted = async (): Promise<boolean> => {
  if (!("permissions" in navigator)) {
    console.warn("Permissions API not supported.");
    return false;
  }

  try {
    const status = await navigator.permissions.query({ name: "geolocation" });
    return status.state === "granted";
  } catch (error) {
    console.error("Error checking geolocation permission:", error);
    return false;
  }
};

const requestCameraPermission = async (): Promise<boolean> => {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Camera is not supported.");
    return false;
  }

  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    return true;
  } catch (error) {
    console.error("Error requesting camera permission:", error);

    // Handle browser-denied permission
    if (error instanceof DOMException)
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        alert("Camera access was denied. Please allow camera access manually.");
      } else if (error.name === "NotFoundError") {
        alert("No camera device found.");
      } else {
        alert(
          "Unable to access the camera. Please check your device and browser settings."
        );
      }

    return false;
  }
};

const isCameraPermissionGranted = async (): Promise<boolean> => {
  if (!("permissions" in navigator)) {
    console.warn("Permissions API not supported.");
    return false;
  }

  try {
    const status = await navigator.permissions.query({
      name: "camera" as PermissionName,
    });
    return status.state === "granted";
  } catch {
    // Fallback: Try getting user media to test access
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      return true;
    } catch {
      return false;
    }
  }
};

export const revalidateGeoLocationPermission = async (): Promise<boolean> => {
  if (!(await isGeoLocationPermissionGranted())) {
    console.log("GeoLocation permission not granted. Requesting...");
    const granted = await requestGeoLocationPermission();
    if (granted) {
      console.log("GeoLocation permission granted.");
      return true;
    } else {
      console.log("GeoLocation permission denied.");
      return false;
    }
  } else {
    console.log("GeoLocation permission already granted.");
    return true;
  }
};

export const revalidateCameraPermission = async (): Promise<boolean> => {
  if (!(await isCameraPermissionGranted())) {
    console.log("Camera permission not granted. Requesting...");
    const granted = await requestCameraPermission();
    if (granted) {
      console.log("Camera permission granted.");
      return true;
    } else {
      console.log("Camera permission denied.");
      return false;
    }
  } else {
    console.log("Camera permission already granted.");
    return true;
  }
};
