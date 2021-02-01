const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
    // find all tags
  // be sure to include its associated Product data
  try {
      let tagInfo = await Tag.findAll({ include: [{ model: Product }] })
      console.log(tagInfo);
      if (!tagInfo) {
          res.status(400).json({ message: "Tag is not found" });
      } else {
          res.status(200).json(tagInfo);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {

    // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
      let tagInfo = await Tag.findAll(
          {
              include: [{ model: Product }],
              where: { id: req.params.id }
              
          });
      console.log(tagInfo);
      if (!tagInfo) {
          res.status(400).json({ message: `Cannot find tag with id:${req.params.id} N` });
      } else {
          res.status(200).json(tagInfo);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.post("/", (req, res) => {
    // create a new tag
  console.log(req.body);
  Tag.create(req.body)
      .then((tag) => {
          res.status(200).json(tag);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});



router.put("/:id", (req, res) => {
    // update a tag's name by its `id` value
  console.log(req.body);
  Tag.update(req.body,
      {
          where: { id: req.params.id }
      })
      .then((tag) => {
          res.status(200).json(tag);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});


router.delete("/:id", (req, res) => {
    // delete on tag by its `id` value
  Tag.destroy(
      {
          where: { id: req.params.id }
      })
      .then((tag) => {
          res.status(200).json(tag);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;