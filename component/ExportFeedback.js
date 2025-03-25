import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { db } from "../firebaseConfig"; // Adjust path as necessary
import Swal from "sweetalert2";

const ExportFeedback = async () => {
  try {
    const registrationsRef = collection(db, "useregistration");
    const querySnapshot = await getDocs(registrationsRef);

    const feedbackData = querySnapshot.docs.map((docSnap) => {
      const userData = docSnap.data();

      return {
        firstName: userData.firstName || "N/A",
        lastName: userData.lastName || "N/A",
        phoneNumber: userData.phoneNumber || "N/A",
        email: userData.email || "N/A",
        feedbackOption: userData.feedbackOption || "No Feedback"
          ? new Date(userData.registrationTime.seconds * 1000).toLocaleString()
          : "N/A",
      };
    });

    if (feedbackData.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Data Found",
        text: "No registration data available for export.",
      });
      return;
    }

    // Convert JSON to Excel format
    const worksheet = XLSX.utils.json_to_sheet(feedbackData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registered Users");

    // Download the Excel file
    XLSX.writeFile(workbook, `Registered_Users_${new Date().toISOString().split('T')[0]}.xlsx`);

    Swal.fire({
      icon: "success",
      title: "Export Successful",
      text: "User registration details exported successfully!",
    });

  } catch (error) {
    console.error("Error exporting user data:", error);
    Swal.fire({
      icon: "error",
      title: "Export Failed",
      text: "Failed to export data. Please try again.",
    });
  }
};

const ExportButton = () => {
  return (
    <button className="export-btn" onClick={ExportFeedback}>
      Export Details
    </button>
  );
};

export default ExportButton;
