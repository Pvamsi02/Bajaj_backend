const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ is_success: false, error: "Invalid input data" });
  }

  const numbers = [];
  const alphabets = [];
  let alphabet = "";

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (isNaN(item) && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (/[a-z]/.test(item) && item > alphabet) {
        alphabet = item;
      }
    }
  });

  res.json({
    is_success: true,
    user_id: "chillara_v_l_n_s_pavana_vamsi_02122003",
    email: "cvlnspvamsi2003d@gmail.com",
    roll_number: "21BCE5095",
    numbers,
    alphabets,
    highest_lowercase_alphabet: alphabet ? [alphabet] : [],
  });
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
