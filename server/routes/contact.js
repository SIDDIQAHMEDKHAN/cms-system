const { ValidateContact, Contact } = require("../models/Contact");

const router = require("express").Router();

router.post("/contact", async (req, res) => {
  const { error } = ValidateContact(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
  } catch (err) {
    console.log(err);
  }
});

//Updating contact
router.put("/contact", async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "no id specified" });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });
  try {
    const contact = await Contact.findOne({ _id: id });

    if (req.user._id.toString() !== contact.postedBy._id.toString()) {
      return res
        .status(401)
        .json({ error: "you can't edit other people contacts" });
    }

    const updatedData = { ...req.body, id: undefined };
    const result = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
