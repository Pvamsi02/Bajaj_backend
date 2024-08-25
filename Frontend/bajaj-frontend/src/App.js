// src/App.js
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://bajaj-backend-8b2y.onrender.com/bfhl",
        JSON.parse(jsonInput)
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes("Numbers") && (
          <div>Numbers: {JSON.stringify(numbers)}</div>
        )}
        {selectedOptions.includes("Alphabets") && (
          <div>Alphabets: {JSON.stringify(alphabets)}</div>
        )}
        {selectedOptions.includes("Highest Lowercase Alphabet") && (
          <div>
            Highest Lowercase Alphabet:{" "}
            {JSON.stringify(highest_lowercase_alphabet)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>BFHL Challenge</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest Lowercase Alphabet"
            onChange={handleOptionChange}
          />
          Highest Lowercase Alphabet[^1^][1]
        </label>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
