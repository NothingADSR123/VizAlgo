// src/components/LinearSearchDescription.js
import React from "react";

const LinearSearchDescription = () => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-[#0D7C66] mb-4">
        Linear Search Description
      </h3>

      <div className="text-lg text-gray-700">
        <p>
          Linear Search is the simplest search algorithm. It works by iterating through each element in a list or array, one by one, and checking if the current element matches the target value. If a match is found, the search is successful and the index of the element is returned. If the target element is not found, the algorithm returns a failure result (usually -1).
        </p>
        <br />
        <p>
          Linear search is easy to implement but inefficient for large datasets as it has a time complexity of O(n), where n is the number of elements in the list.
        </p>

        <h4 className="font-semibold mt-4">Pseudocode:</h4>
        <pre className="bg-[#f3f4f6] p-4 rounded-md text-sm">
          {`LinearSearch(arr, target):
  for i = 0 to length(arr) - 1:
    if arr[i] == target:
      return i
  return -1`}
        </pre>

        <div className="flex items-center mt-4">
          <a
            href="https://youtu.be/246V51AWwZM?si=NdWYKO1e0q2Aghku"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <span className="font-semibold text-black-500 mr-6 hover:underline">
              Video Explanation
            </span>
            <img
              src="https://img.youtube.com/vi/246V51AWwZM/0.jpg"
              alt="Video Thumbnail"
              className="w-48 h-28 rounded-lg cursor-pointer hover:opacity-80"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinearSearchDescription;
