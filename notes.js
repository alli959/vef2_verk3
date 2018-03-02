/* todo sækja pakka sem vantar  */

require('dotenv').config();

const bcrypt = require('bcrypt');
const { Client } = require('pg');
const connectionString = 'postgres://notandi:@localhost/v3';

const data = [];


async function query(q, values = []) {
  const client = new Client({ connectionString });
  await client.connect();
  console.log('done');

  let result;

  if(values == null){
  try {
    result = await client.query(q);
  }catch (err){
    throw err;
  } finally{
    await client.end();
  }
}
  else{
    try {
      result = await client.query(q, values);
      }catch (err){
        throw err;
      } finally{
        await client.end();
      }
    }

  try{
  return result;
  }catch (err){
    throw err;
  }
}




/**
 * Create a note asynchronously.
 *
 * @param {Object} note - Note to create
 * @param {string} note.title - Title of note
 * @param {string} note.text - Text of note
 * @param {string} note.datetime - Datetime of note
 *
 * @returns {Promise} Promise representing the object result of creating the note
 */
async function create({ title, text, datetime } = {}) {
  
  const q = 'INSERT INTO notes (title, text, datetime) VALUES ($1, $2, $3) RETURNING *'
  const result = await query(q, [title, text, datetime]);
  return result.rows[0];
}

/**
 * Read all notes.
 *
 * @returns {Promise} Promise representing an array of all note objects
 */
async function readAll() {
  const q = 'SELECT * FROM notes';
  const result = await query(q, null); 
  return result.rows;

}

/**
 * Read a single note.
 *
 * @param {number} id - Id of note
 *
 * @returns {Promise} Promise representing the note object or null if not found
 */
async function readOne(id) {

  const q = 'SELECT * FROM notes WHERE id = $1';
  const result = await query(q, [id]);
  return result.rows[0];
}

/**
 * Update a note asynchronously.
 *
 * @param {number} id - Id of note to update
 * @param {Object} note - Note to create
 * @param {string} note.title - Title of note
 * @param {string} note.text - Text of note
 * @param {string} note.datetime - Datetime of note
 *
 * @returns {Promise} Promise representing the object result of creating the note
 */
async function update(id, { title, text, datetime } = {}) {
  /* todo útfæra */
}

/**
 * Delete a note asynchronously.
 *
 * @param {number} id - Id of note to delete
 *
 * @returns {Promise} Promise representing the boolean result of creating the note
 */
async function del(id) {
  /* todo útfæra */
}

module.exports = {
  create,
  readAll,
  readOne,
  update,
  del,
};
