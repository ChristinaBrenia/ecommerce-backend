const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

//Get all products
router.get("/", async (req, res) => {
    try {
        let productInfo = await Product.findAll({ include: [{ model: Category }, { model: Tag }] });
        console.log(productInfo);

        if (!productInfo) {
            res.status(400).json({ message: "No Products Found" });
        } 
        else {
            res.status(200).json(productInfo);
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get Id
router.get("/:id", async (req, res) => {
    try {
        let productInfo = await Product.findAll(
            {
                include: [{ model: Category }, { model: Tag }],
                where: { id: req.params.id }
            });
        console.log(productInfo);
        if (!pproductInfo) {
            res.status(400).json({ message: `Product with id:${req.params.id} Not Found` });
        } 
        else {
            res.status(200).json(productInfo);
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Create Product
router.post("/", (req, res) => {
    Product.create(req.body)
        .then((product) => {
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

//Update ID
router.put("/:id", (req, res) => {
    console.log(req.body);
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id
                    };
                });
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            res.status(400).json(err);
        });
});

//Delete
router.delete("/:id", (req, res) => {
    Product.destroy(
        {
            where: { id: req.params.id }
        })
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;