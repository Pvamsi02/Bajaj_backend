// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jsonForm");
  const jsonInput = document.getElementById("jsonInput");
  const responseContainer = document.getElementById("responseContainer");
  const responseOutput = document.getElementById("responseOutput");
  const filterNumbers = document.getElementById("filterNumbers");
  const filterAlphabets = document.getElementById("filterAlphabets");
  const filterHighest = document.getElementById("filterHighest");

  let apiResponse = null;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      // Parse the JSON input safely
      const inputData = JSON.parse(jsonInput.value.trim());

      // Check if inputData has 'data' property and it's an array
      if (!inputData.data || !Array.isArray(inputData.data)) {
        throw new Error('JSON must contain an array under the key "data".');
      }

      // Call the backend API
      const response = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: inputData.data }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch data from server: ${errorMessage}`);
      }

      apiResponse = await response.json();
      responseContainer.style.display = "block";
      renderResponse();
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Error:", error);
      responseContainer.style.display = "none";
    }
  });

  function renderResponse() {
    if (!apiResponse) return;

    let filteredResponse = {};
    if (filterNumbers.checked) {
      filteredResponse.numbers = apiResponse.numbers;
    }
    if (filterAlphabets.checked) {
      filteredResponse.alphabets = apiResponse.alphabets;
    }
    if (filterHighest.checked) {
      filteredResponse.highest_lowercase_alphabet =
        apiResponse.highest_lowercase_alphabet;
    }

    responseOutput.innerHTML = `<pre>${JSON.stringify(
      filteredResponse,
      null,
      2
    )}</pre>`;
  }

  filterNumbers.addEventListener("change", renderResponse);
  filterAlphabets.addEventListener("change", renderResponse);
  filterHighest.addEventListener("change", renderResponse);
});
