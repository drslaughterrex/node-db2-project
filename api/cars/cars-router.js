const express = require('express');
const Car = require("./cars-model.js");
const mw = require("./cars-middleware.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
try {
	const cars = await Car.getAll()
	res.json(cars)
} catch (err){
	next(err)
}
});

router.get("/:id", mw.checkCarId, async (req, res, next) => {
	try {
		const cars = await Car.getById(req.params.id)
		res.json(cars)
	} catch (err){
		next(err)
	}
});

router.post(
	"/",
	mw.checkCarPayload,
	mw.checkVinNumberUnique,
	mw.checkVinNumberValid,
	(req, res, next) => {
		cars
			.create(req.body)
			.then((car) => {
				res.status(201).json(car);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ message: err.message });
			});
	}
);

router.put(
	"/:id",
	mw.checkCarId,
	mw.checkCarPayload,
	mw.checkVinNumberUnique,
	mw.checkVinNumberValid,
	(req, res, next) => {
		cars
			.updateById(req.params.id, req.body)
			.then(async () => {
				const car = await cars.getById(req.params.id);
				res.status(200).json(car);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ message: err.message });
			});
	}
);

router.delete("/:id", mw.checkCarId, (req, res, next) => {
	cars
		.deleteById(req.params.id)
		.then((car) => {
			res.status(200).json(car);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: err.message });
		});
});
module.exports = router;
