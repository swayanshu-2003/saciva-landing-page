"use client";
import { useEffect, useState } from "react";

const DynamicCounter = ({ userCount }: { userCount: number }) => {
  // State to store the dynamic count
  const [count, setCount] = useState(0); // Start below the prop value

  useEffect(() => {
    // Increment the count gradually until it reaches the userCount
    const interval = setInterval(() => {
      if (userCount > 0) {
        setCount((prevCount) => {
          if (prevCount < userCount) {
            return prevCount + 1; // Increment by 1
          } else {
            clearInterval(interval); // Stop incrementing when the limit is reached
            return prevCount;
          }
        });
      }
    }, 50); // Adjust the interval duration for smoother or faster updates

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [userCount]);

  // Format the number for display (e.g., add commas)
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 pb-4 lg:px-20">
      <div className="flex flex-wrap justify-center space-x-1 mt-5">
        {formattedCount.split("").map((char, index) => (
          <div
            key={index}
            className={`${
              char === ","
                ? "bg-transparent mt-5 text-black text-3xl"
                : "bg-gray-200 text-2xl md:text-3xl lg:text-4xl font-bold text-black p-4 md:p-6 rounded"
            }`}
          >
            {char}
          </div>
        ))}
        <div
          className={`
                bg-gray-200 text-2xl md:text-3xl lg:text-4xl font-bold text-black p-4 md:p-6 rounded"
            `}
        >
          {` + `}
        </div>
      </div>
      <p className="text-gray-600 mt-3 text-sm md:text-base lg:text-lg">
        STUDENTS HAVE ALREADY SIGNED UP!
      </p>
    </div>
  );
};

export default DynamicCounter;
