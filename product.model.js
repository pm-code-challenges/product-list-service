'use strict';
var dbConn = require('./db.config');
//Product object create
var Product = function (product) {
	this.id = product.id;
	this.city = product.city;
	this.start_date = product.start_date;
	this.end_date = product.end_date;
	this.price = product.price;
	this.status = product.status;
	this.color = product.color;
};

Product.getAll = function (filters, result) {
	const sqlQuery = getSqlQuery(filters);

	dbConn.query(sqlQuery, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		}
		else {
			// console.log('products : ', res);
			result(null, res);
		}
	});
};

function getSqlQuery(filters) {
	let queryString = 'Select * from product_list';
	const sortDirection = filters.sortDirAsc === 'true' ? 'asc' : 'desc';
	const sortField = filters.sortBy || 'id';
	const fromDateCmp = filters.fromDate ? ('start_date >= \'' + filters.fromDate + '\'') : '';
	const toDateCmp = filters.toDate ? ('end_date <= \'' + filters.toDate + '\'') : '';
	let whereClause = '';
	if (fromDateCmp && toDateCmp) {
		whereClause = 'where ' + fromDateCmp + ' and ' + toDateCmp;
	} else if (fromDateCmp || toDateCmp) {
		whereClause = 'where ' + fromDateCmp + toDateCmp;
	}
	queryString = queryString + ' ' + whereClause + ' ' + ' order by ' + sortField + ' ' + sortDirection;
	// console.log(queryString);
	return queryString;
}

Product.create = function (newProduct, result) {
	dbConn.query("INSERT INTO product_list set ?", newProduct, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		}
		else {
			console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};
Product.findById = function (id, result) {
	dbConn.query("Select * from product_list where id = ? ", id, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		}
		else {
			result(null, res);
		}
	});
};

Product.update = function (id, product, result) {
	dbConn.query("UPDATE product_list SET city=?,start_date=?,end_date=?,price=?,status=?,color=? WHERE id = ?",
		[product.city, product.start_date, product.end_date, product.price, product.status, product.color, id], function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(null, err);
			} else {
				result(null, res);
			}
		});
};
Product.delete = function (id, result) {
	dbConn.query("DELETE FROM product_list WHERE id = ?", [id], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		}
		else {
			result(null, res);
		}
	});
};

module.exports = Product;