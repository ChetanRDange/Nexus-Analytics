const formatDateTime = (isoString) => {
  if (!isoString || isoString === "N/A") return "N/A";

  const d = new Date(isoString);

  if (isNaN(d.getTime())) return "N/A";

  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const formattedTime = `${hours}.${minutes} ${ampm}`;

  return `${day}-${month}-${year}, ${formattedTime}`;
};

export default formatDateTime;
