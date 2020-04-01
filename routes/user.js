const router = require("express").Router();
const User = require("../models/user");

router.post("/", (req, res) => {
  const { username } = req.body;
  const result = User.getUser({ username });

  if (result) {
    res.send("user already exists");
  } else {
    const user = new User({ username });
    const saved = user.save();

    res.send(saved);
  }
});

router.get("/:username", (req, res) => {
  const { username } = req.params;

  const result = User.getUser({ username });
  if (result) {
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:username", (req, res) => {
  const { username } = req.params;

  const result = User.getUser({ username });

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && key !== "username") {
      result[key] = req.body[key];
    }
  }

  result.save();

  if (result) {
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:username", (req, res) => {
  const { username } = req.params;

  const result = User.remove({ username });

  if (result) {
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
