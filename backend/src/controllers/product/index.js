import Product from "../../models/product";
import Boom from "boom";
import ProductSchema from "./validations";
import mongoose from "mongoose";
const Create = async (req, res, next) => {
	const input = req.body;
	const { error } = ProductSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		input.photos = JSON.parse(input.photos);

		const product = new Product(input);
		const savedData = await product.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};



const Get = async (req, res, next) => {
  const { product_id } = req.params;

  console.log("Requested ID:", product_id);

  try {
    console.log("DB:", mongoose.connection.name);
    console.log("Collection:", Product.collection.name);

    const byId = await Product.findById(product_id);
    console.log("findById:", byId);

    const byOne = await Product.findOne({
      _id: new mongoose.Types.ObjectId(product_id),
    });
    console.log("findOne:", byOne);

    const native = await Product.collection.findOne({
      _id: new mongoose.Types.ObjectId(product_id),
    });
    console.log("native:", native);

    res.json(byId);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
const Update = async (req, res, next) => {
	const { product_id } = req.params;

	try {
		const updated = await Product.findByIdAndUpdate(product_id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { product_id } = req.params;

	try {
		const deleted = await Product.findByIdAndDelete(product_id);

		if (!deleted) {
			throw Boom.badRequest("Product not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

const limit = 12;
const GetList = async (req, res, next) => {
	let { page } = req.query;

	if (page < 1) {
		page = 1;
	}

	const skip = (parseInt(page) - 1) * limit;

	try {
		const products = await Product.find({})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.json(products);
	} catch (e) {
		next(e);
	}
};

export default {
	Create,
	Get,
	Update,
	Delete,
	GetList,
};
