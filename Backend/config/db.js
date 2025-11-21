const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
	
	mongoose.connect(process.env.MONGO_URI)
		// If the connection is successful, log a success message
		.then(() => console.log("✅ DB CONNECTION SUCCESS"))
		 
		.catch((err) => {
			console.log(`DB CONNECTION ISSUES`, err);
			console.error(err.message);
			process.exit(1);
		});
};

module.exports = dbConnect;
