// import React, { useEffect, useRef } from "react";
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import Calender from "../assets/svgs/calendarr.svg";

// const DatePicker = ({ selectedDate, setSelectedDate, placeholder }) => {
//   const datePickerRef = useRef(null);

//   useEffect(() => {
//     const datepicker = flatpickr(datePickerRef.current, {
//       defaultDate: selectedDate,
//       dateFormat: "Y-m-d", // Ensures the date format is YYYY-MM-DD
//       onChange: (selectedDates) => {
//         const formattedDate = flatpickr.formatDate(selectedDates[0], "Y-m-d");
//         setSelectedDate(formattedDate);
//       },
//     });

//     return () => {
//       datepicker?.destroy();
//     };
//   }, [selectedDate, setSelectedDate]);

//   return (
//     <div className="relative w-full ">
//       <input
//         ref={datePickerRef}
//         id="date-picker"
//         className="peer py-2.5 w-full rounded-xl border border-primary px-3 font-medium text-primary bg-main outline outline-0 transition-all placeholder:text-placeholder focus:border focus:outline-0 placeholder:font-medium items-center"
//         placeholder={placeholder}
//       />
//       <div className="absolute end-3 top-3">
//         <img src={Calender} alt="Calendar" />
//       </div>
//     </div>
//   );
// };

// export default DatePicker;

import Calender from "../assets/svgs/calendarr.svg";

const DatePicker = ({ selectedDate, setSelectedDate, placeholder }) => {
  return (
    <div className="relative w-full">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="peer py-2.5 w-full rounded-xl border border-primary px-3 font-medium text-primary bg-main outline-none transition-all placeholder:text-placeholder focus:border focus:outline-0 placeholder:font-medium"
        placeholder={placeholder}
      />
    </div>
  );
};

export default DatePicker;
