const express = require ("express");
const app = express();
const PORT = 5000;

// para e load ang mockdat anga naa sa profiles.json
// nya e sud sa variable nga profile
const profile = require ("./profiles.json");

//middleware para ma convert ang JSON nga gi-send sa request
//ngadto sa JavaScript object para magamit nato sa req.body
app.use(express.json());


// GET - READ
app.get("/api/get-profiles", (req,res) => {
    res.json(profile);
});


// POST - CREATE
app.post("/api/post-profile", (req,res) => {
    const { name , email} = req.body;
    const newUser = { name , email};
    profile.push(newUser);

    res.json({
        message : "Your profile is stored successfully",
        data : newUser,
    })
})


//PUT - UPDATE/EDIT (by index)
app.put("/api/put-profile/:index", (req,res) => {
    const index = parseInt (req.params.index);
    const { name, email } = req.body;

  if (index >= 0 && index < profile.length) {
    profile[index] = { name, email };
    res.json({
      message: "Profile updated successfully",
      data: profile[index],
    });
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
    
});

// DELETE - Delete (by index)
app.delete("/api/profile/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (index >= 0 && index < profile.length) {
    const deleted = profile.splice(index, 1);
    res.json({
      message: "Profile deleted successfully",
      deleted: deleted[0],
    });
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


