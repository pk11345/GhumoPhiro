const app = require('./app');
const cors = require("cors")

// app.use(cors())
// app.use(
//   cors({
//     origin: "https://ghumophiro-1.onrender.com",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // only if you use cookies/auth headers
//   })
// );

app.listen(8000, () => {
    console.log('Server started on port 8000'); 
});
  