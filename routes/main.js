const express = require("express");
const router = express.Router();

//Define Data
var shopData = { shopName: "The Hydration Hub", 
    productCategories: ["Alcohol", "Soft Drinks", "Hot Drinks"],
    shopLocations: [
        {
            manager: "James Bond",
            address: "Flat 1, 17 Berkeley Crescent, Mayfair, London"
        },
        {
            manager: "Alex Rider",
            address: "Unit 3, 42 Hackford Lane, Shoreditch, London"
        }, 
        {
            manager: "Eve MoneyPenny",
            address: "12 Queen Anne’s Gate, Westminster, London"
        }


    ]
};

// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", shopData);
});

router.get("/about", (req, res) => {
    res.render("about.ejs", shopData);
});

router.get("/search",(req, res) => {
    res.render("search.ejs", shopData);
});

router.get('/search_result', function (req, res){
  const { search_text, category } = req.query;
  res.render("search_results.ejs", {
    shopName: shopData.shopName,
    search_text,
    category
  });
});


router.get("/register", (req, res) => {
    res.render("register.ejs", shopData);
});

router.post("/registered", (req, res) => {
    const first = req.body.first.trim();
    const last = req.body.last.trim();
    const email = req.body.email.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        return res.send("This is an invalid email address. Please go back and enter a valid email.")
    }

    res.render("registered.ejs", {
    shopName: shopData.shopName,
    first,
    last,
    email
  });

});

//Survey Routes 
router.get("/survey", (req, res) => {
  res.render("survey.ejs", shopData);
});

router.post("/survey_result", (req, res) => {
  const { first, last, email, age, category, student } = req.body;
   let categories = req.body.category;

  // Ensure categories is always an array
  if (!Array.isArray(categories)) {
    categories = categories ? [categories] : [];
  }
  const isStudent = student === "yes" ? "Yes" : "No";

  res.render("survey_result.ejs", {
    shopName: shopData.shopName,
    first,
    last,
    email,
    age,
    categories,
    isStudent
  });
});
// TODO

module.exports = router;