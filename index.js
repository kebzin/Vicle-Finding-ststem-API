const app = require("./src/server");
const PORT = 3009; // listing the port number
const errorHandlers = require("./src/middleware/errorHanduler");
app.use(errorHandlers);
app.listen(PORT, () => {
  console.log(`Rest API listening on port ${PORT}`); // telling the user the pp is running on the port
});
