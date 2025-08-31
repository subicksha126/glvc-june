const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'client_mgmt',
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/api/clients', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM clients WHERE status <> "Archived"');
  res.json(rows);
});

app.get('/api/clients/:id', async (req,res) => {
  const [rows] = await pool.query('SELECT * FROM clients WHERE id=?', [req.params.id]);
  res.json(rows[0] || {});
});

app.post('/api/clients', async (req,res) => {
  const {name,email,phone,company,status='Active'} = req.body;
  const [r] = await pool.query('INSERT INTO clients (name,email,phone,company,status) VALUES (?,?,?,?,?)', [name,email,phone,company,status]);
  const [rows] = await pool.query('SELECT * FROM clients WHERE id=?', [r.insertId]);
  res.status(201).json(rows[0]);
});

app.put('/api/clients/:id', async (req,res) => {
  await pool.query('UPDATE clients SET ? WHERE id=?', [req.body, req.params.id]);
  const [rows] = await pool.query('SELECT * FROM clients WHERE id=?', [req.params.id]);
  res.json(rows[0]);
});

app.patch('/api/clients/:id', async (req,res) => {
  const { status } = req.body;
  await pool.query('UPDATE clients SET status=? WHERE id=?', [status, req.params.id]);
  const [rows] = await pool.query('SELECT * FROM clients WHERE id=?', [req.params.id]);
  res.json(rows[0]);
});

app.get('/api/meetings', async (req,res) => {
  const { clientId, from, to } = req.query;
  let sql = 'SELECT * FROM meetings WHERE 1=1'; const args = [];
  if(clientId){ sql += ' AND client_id=?'; args.push(clientId); }
  if(from){ sql += ' AND `when`>=?'; args.push(from); }
  if(to){ sql += ' AND `when`<=?'; args.push(to); }
  sql += ' ORDER BY `when` ASC';
  const [rows] = await pool.query(sql, args);
  res.json(rows);
});

app.post('/api/meetings', async (req,res) => {
  const { clientId, title, when, mode, notes } = req.body;
  const [r] = await pool.query('INSERT INTO meetings (client_id,title,`when`,mode,notes) VALUES (?,?,?,?,?)', [clientId,title,when,mode,notes]);
  const [rows] = await pool.query('SELECT * FROM meetings WHERE id=?', [r.insertId]);
  res.status(201).json(rows[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
