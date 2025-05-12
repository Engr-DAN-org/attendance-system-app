import { ClassSession } from "@/interfaces/types/classSession";
import QRCode from "qrcode";

export async function openQrCodeTab(classSession: ClassSession) {
  const { id, classScheduleId } = classSession;
  const qrString = `ts://class-session?scheduleId=${classScheduleId}&sessionId=${id}`;
  const qrDataUrl = await QRCode.toDataURL(qrString);

  const newWindow = window.open("", "_blank", "width=800,height=800");

  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>Class Session QR Code</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              background: #f9f9f9; 
              overflow: hidden; /* Hide overflow */
            }
            img { 
              width: 100vw; 
              height: 100vh; 
              object-fit: contain; /* Ensures aspect ratio is maintained */
            }
          </style>
        </head>
        <body>
          <div>
            <h2 style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 24px;">Scan to Join Class</h2>
            <img src="${qrDataUrl}" alt="Class QR Code" />
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  }
}
