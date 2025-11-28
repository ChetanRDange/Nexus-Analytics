// import React, { useEffect, useRef } from "react";
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import Calender from "../assets/svgs/calendarr.svg";

// const EndDatePicker = ({
//   selectedEndDate,
//   setSelectedEndDate,
//   selectedStartDate,
// }) => {
//   const datePickerRef = useRef(null);

//   useEffect(() => {
//     const datepicker = flatpickr(datePickerRef.current, {
//       defaultDate: selectedEndDate,
//       minDate: selectedStartDate,
//       dateFormat: "Y-m-d", // Ensures the date format is YYYY-MM-DD
//       onChange: (selectedDates) => {
//         const formattedDate = flatpickr.formatDate(selectedDates[0], "Y-m-d");
//         setSelectedEndDate(formattedDate);
//       },
//     });

//     return () => {
//       datepicker?.destroy();
//     };
//   }, [selectedEndDate, setSelectedEndDate, selectedStartDate]);

//   return (
//     <div className="relative w-full">
//       <input
//         ref={datePickerRef}
//         id="end-date-picker"
//         className="peer py-2.5 w-full rounded-xl bg-main border border-primary px-3 font-medium text-primary outline outline-0 transition-all placeholder:text-placeholder focus:border focus:outline-0 placeholder:font-medium items-center"
//         placeholder="End Date"
//       />
//       <div className="absolute end-3 top-3">
//         <img src={Calender} alt="Calendar" />
//       </div>
//     </div>
//   );
// };

// export default EndDatePicker;

import React from "react";
import Calender from "../assets/svgs/calendarr.svg";

const EndDatePicker = ({
  selectedEndDate,
  setSelectedEndDate,
  selectedStartDate,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="date"
        id="end-date-picker"
        value={selectedEndDate}
        min={selectedStartDate}
        onChange={(e) => setSelectedEndDate(e.target.value)}
        className="peer py-2.5 w-full rounded-xl bg-main border border-primary px-3 font-medium text-primary outline-none transition-all placeholder:text-placeholder focus:border focus:outline-0 placeholder:font-medium"
        placeholder="End Date"
      />
    </div>
  );
};

export default EndDatePicker;
