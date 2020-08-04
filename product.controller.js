'use strict';
const Product = require('./product.model');
exports.getAll = function (req, res) {
	const sortBy = req.query.sortBy;
	const sortDir = req.query.sortDir;
	const filters = {
		sortBy: req.query.sortBy,
		sortDirAsc: req.query.sortDirAsc,
		fromDate: req.query.fromDate,
		toDate: req.query.toDate
	};
	Product.getAll(filters, function (err, productList) {
		// console.log('controller')
		if (err)
			res.send(err);
		console.log('res', productList.length);
		res.send(productList);
	});
};

exports.create = function (req, res) {
	const newProduct = new Product(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required field' });
	} else {
		Product.create(newProduct, function (err, product) {
			if (err)
				res.send(err);
			res.json({ error: false, message: "product added successfully!", data: product });
		});
	}
};
exports.findById = function (req, res) {
	Product.findById(req.params.id, function (err, product) {
		if (err)
			res.send(err);
		res.json(product);
	});
};
exports.update = function (req, res) {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required field' });
	} else {
		Product.update(req.params.id, new Product(req.body), function (err, product) {
			if (err)
				res.send(err);
			res.json({ error: false, message: 'Product updated successfully.' });
		});
	}
};
exports.delete = function (req, res) {
	Product.delete(req.params.id, function (err, product) {
		if (err)
			res.send(err);
		res.json({ error: false, message: 'Product deleted successfully.' });
	});
};