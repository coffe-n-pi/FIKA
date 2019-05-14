const cloudant = require('@cloudant/cloudant');
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv({ vcapFile: 'server/api/vcap-local.json' });
const express = require('express');
const router = express.Router();

/* Retrieve Cloud Foundry environment variables. */
const credentials = appEnv.getServiceCreds('DNDM');
const db = cloudant({ url: credentials.url });

async function getDates() {
  const databases = await db.db.list();
  databases.pop(); /* Cache? */
  databases.pop(); /* Configuration */
  databases.pop(); /* Tomorrow */
  for (let i = 0; i < databases.length; i++) {
    databases[i] = databases[i].substring(20, 30);
  }
  return {
    dates: databases,
  };
}

async function getDate(date) {
  const prefix = 'iotp_gk3s5z_barista_';
  const element = prefix.concat(date);

  const subdb = await db.db.use(element);
  const result = await subdb.view('daft', 'FramesWithData');
  return result;
}

router.get('/GetDates', (req, res) => {
  getDates().then(data => {
    res.status(200).send(data);
  });
});

router.get('/GetDate/:year/:month/:day', (req, res) => {
  const p = req.params;
  getDate(`${p.year}-${p.month}-${p.day}`).then(data => {
    res.status(200).send(data);
  });
});
module.exports = router;
