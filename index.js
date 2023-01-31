const app = require('./src/server')
const PORT = 3009; // listing the port number
app.listen(PORT, () => {
    console.log(`Rest API listening on port ${PORT}`); // telling the user the pp is running on the port
})