const app = require('./app');
const { PORT } = require('./config/env');

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));