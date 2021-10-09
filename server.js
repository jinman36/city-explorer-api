'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { request } = require('express');
const app = express();
app.use(cores());
const PORT = process.env.PORT || 3001;








app.listen(PORT, () => console.log('lisening on Port:' PORT));