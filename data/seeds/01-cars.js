// STRETCH
const cars = [
	{
		vin: "111111111111111",
		make: "toyota",
		model: "prius",
		mileage: 25000,
		title: "clean",
		transmission: "manual",
	},
	{
		vin: "222222222222222",
		make: "toyota",
		model: "camry",
		mileage: 215000,
		transmission: "auto",
	},
	{
		vin: "33333333333333",
		make: "ford",
		model: "focus",
		mileage: 152000,
		title: "clean",
	},
];

exports.seed =
	async function (knex) {
        await knex("cars").truncate()
        await knex("cars").insert(cars);
	};
