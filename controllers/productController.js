const { url } = require("inspector");
const db = require("../models/index");
const Products = db.products;
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { Op } = require("sequelize");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//create users
exports.createProduct = async (req, res) => {
  try {

    //const {gender,category,subCategory,price,quantity} = req.body.;

    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log(result);
      const newProducts = new Products({
        gender: req.body.gender,
        category: req.body.category,
        subCategory: req.body.subCategory,
        price: req.body.price,
        quantity: req.body.quantity,
        image:result.url,
      });

      const getProduct = await newProducts.save();
      return res
        .status(201)
        .send({ message: "Product created successfully", data: getProduct });
      console.log(result);
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//GET All product or by query
exports.getAllProduct = async (req, res) => {
  try {
    if (req.query.category) {
      const queryProduct = await Products.findAll({
        where: { category: req.query.category },
      });

      return res
        .status(200)
        .send({ message: "product get successfully", data: queryProduct });
    }

    const allProduct = await Products.findAll();
    return res
      .status(200)
      .send({ message: "all product get successfully", data: allProduct });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//GET product BY id
exports.getOneProduct = async (req, res) => {
  try {
    const oneProduct = await Products.findOne({ where: { id: req.params.id } });
    return res
      .status(200)
      .send({ message: "product get successfully", data: oneProduct });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const productId = await Products.findOne({ where: { id: req.params.id } });
    if (productId) {
      const data = Object.keys(req.body);

      data.forEach((update) => {
        productId[update] = req.body[update];
      });

      await productId.save();

      return res
        .status(201)
        .send(
          { message: "product update successfully", data: productId },
          { new: true }
        );
    } else {
      return res.status(400).send({ message: "product not found" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//delete product BY id
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await User.destroy({ where: { id: req.params.id } });
    if (!deletedProduct) {
      return res
        .status(400)
        .send({ message: "product not found or already deleted" });
    }
    return res.status(200).send({ message: "product deleted successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
