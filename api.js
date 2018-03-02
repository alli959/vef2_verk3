const express = require('express');

const {
  create,
  readAll,
  readOne,
  update,
  del,
} = require('./notes');

const router = express.Router();


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const data = [];

router.get('/', (req, res) => {
  res.json(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const item = readOne(id);

  if(item) {
    return res.json(item);
  }
  res.status(404).json({error: 'Not found'});
});

router.post('/', (req, res) => {
  const item = { id: '1', title: 'hello', datetime: 'this'};
  data.push(item);
  return res.status(201).json(item);
});


/*router.post('/', (req, res) => {
  const note =  create(req.body);
  console.log(note);

  
  if(note.title.length === 0){
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string',
    });
  }
  if(note.text.length === 0){
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string',
    });
  }
  if(note.datetime.length === 0){
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string',
    });
  }

  const nextId = data.map(i => i.id).reduce((a, b) => a > b ? a : b + 1, 1);

  const item = { id: nextid, title: title, datetime: datetime};
  data.push(item);

  return res.status(201).json(item);
});*/

router.put('/:id', (req, res) => {
  const { id } = req.params;
  create( { title: '', text: '', datetime: ''}) = req.body;

  if(title.length === 0){
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string',
    });
  }
  const item = data.find(i => i.id === parseInt(id, 10));

  if(item) {
    item.title = title;
    return res.status(200).json(item);
  }

  res.status(404).json({error: 'Not found'});

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const item = data.find(i => i.id === parseInt(id, 10));

  if(item){
    data.splice(data.indexOf(item), 1);
    return res.status(204).end();
  }
  res.status(404).json({error: 'Not found'});
});

module.exports = router;
