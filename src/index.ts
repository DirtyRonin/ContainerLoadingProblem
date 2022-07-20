import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.get("/alive/", (req, res) => {
    res.send("<h2>Hello There :-)</h2></br><h1>Generall Kenobi!!! How Nice of YOU!!</h1>")
    console.log("see me ran")
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// TODO: Test DB Next
