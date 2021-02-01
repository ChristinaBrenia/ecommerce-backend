const router = require("express").Router();
const { Category, Product } = require("../../models");
// find all categories
  // be sure to include its associated Products
//Return All
router.get("/", async (req, res) => {
    try {
        let categoryInfo = await Category.findAll({ include: [{ model: Product }] })
        console.log(`category Info: ${categoryInfo}`);
        if (!categoryInfo) {
            res.status(400).json({ message: "No Categories Found" });
        } else {
            res.status(200).json(categoryInfo);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// find one category by its `id` value
  // be sure to include its associated Products
//Get
router.get("/:id", async (req, res) => {
    try {
        let categoryInfo = await Category.findAll(
            {
                where: { id: req.params.id },            
                include: [{ model: Product }]
            });
        console.log(`category Info: ${categoryInfo}`);
        if (!categoryInfo) {
            res.status(400).json({ message: `Category with id:${req.params.id} Not Found` });
        } else {
            res.status(200).json(categoryInfo);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// create a new category
router.post("/", (req, res) => {
    console.log(req.body);
    Category.create(req.body)
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
    console.log(req.body);
    Category.update(req.body,
        {
            where: { id: req.params.id }
        })
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE 
router.delete("/:id", (req, res) => {
    Category.destroy(
        {
            where: { id: req.params.id }
        })
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;