import express from 'express';
import logUtil from 'keys-translations-manager-core/lib/logUtil';
import getTranslationModel from '../models/TranslationModel';
const mongoose = require('mongoose');
const router = express.Router();

const getReleases = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.listCollections().toArray(function (error, data) {
      if (error) {
        reject(error);
      } else {
        const release = data
          .map((el) => el.name)
          .filter((el) => !['latest', 'histories'].includes(el));

        resolve(release);
      }
    });
  });
};

const release = ({ base, version }) => {
  const Translations = getTranslationModel(base || 'latest');
  return new Promise((resolve, reject) => {
    Translations.aggregate(
      [{ $match: {} }, { $project: { _id: 0 } }, { $out: version }],
      (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      }
    );
  });
};

router
  .route('/')
  .get(async (req, res) => {
    try {
      const data = await getReleases();
      res.json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    const { base, version } = req.body;

    try {
      const releaseList = await getReleases();
      const exist = releaseList.includes(version);

      if (exist) {
        res.status(409).send('Version Exist');
      } else {
        const result = await release({base, version});
        res.json(result);
      }
    } catch (err) {
      logUtil.log('error', err);
      res.status(500).send(err);
    }
  });

export default router;
