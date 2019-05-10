/*
   Copyright 2018 Makoto Consulting Group, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
'use strict';

/**
 * This is the DAO interface for the application.
 * You will need to provide an implementation for each
 * function in the interface. The implementation has been
 * provided for you in the appropriately named *sqlite3.js
 * file located in this directory.
 */

// UUID creation
const uuidv4 = require('uuid/v4');

// Local utils
const utils = require('../utils/utils');

// Local logger
const logger = require('../utils/logger');
//logger.setLogLevel(logger.Level.DEBUG);

const itemsDao = require('./items-dao');

// Cloudant DB reference
let db;

// Initialize the DB when this module is loaded
(function getDbConnection() {
    logger.info('Initializing Cloudant connection...', 'lists-dao-cloudant.getDbConnection()');
    utils.dbCloudantConnect().then((database) => {
        logger.info('Cloudant connection initialized.', 'lists-dao-cloudant.getDbConnection()');
        db = database;
    }).catch((err) => {
        logger.error('Error while initializing DB: ' + err.message, 'lists-dao-cloudant.getDbConnection()');
        throw err;
    });
})();

/**
 * Fetch all shopping lists
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function fetchAll() {
    return new Promise((resolve, reject) => {
        db.find({ 
            'selector': { 
                'type': {
                    '$eq': 'shoppingList' 
                }
            } 
        }, (err, results) => {
            if (err) {
                logger.error('Error occurred: ' + err.message, 'fetchAll()');
                reject(err);
            } else {
                let documents = results.docs;
                if (logger.isDebug()) logger.debug('Raw data: ' + JSON.stringify(documents), 'fetchAll()');
                resolve({ data: JSON.stringify(documents), statusCode: (documents.length > 0) ? 200 : 404 });
            }
        });
    });
}


/**
 * Find the item with the specified id
 * 
 * @param {number} id - the id of item
 * to be fetched.
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function findById(id) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                if (err.message == 'missing') {
                    logger.warn(`Document id ${id} does not exist.`, 'findById()');
                    resolve({ data: {}, statusCode: 404 });
                } else {
                    logger.error('Error occurred: ' + err.message, 'findById()');
                    reject(err);
                }
            } else {
                resolve({ data: JSON.stringify(document), statusCode: 200 });
            }
        });
    });
}


module.exports.fetchAll = fetchAll;
module.exports.findById = findById;
