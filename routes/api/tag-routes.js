const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // Find all tags and include their associated Product data
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    // Send the tags as a response
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find a single tag by its `id` and include its associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    // If the tag is found, send it as a response
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);

    // Send the new tag as a response
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const updatedTag = await Tag.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );

    // If the tag is found and updated, send a success response
    if (updatedTag[0]) {
      res.status(200).json({ message: "Tag updated successfully" });
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const deletedTag = await Tag.destroy({ where: { id: req.params.id } });

    // If the tag is found and deleted, send a success response
    if (deletedTag) {
      res.status(200).json({ message: "Tag deleted successfully" });
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
