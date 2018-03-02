const express = require('express');

const {
  nextId,
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

router.get('/', async (req, res) => {
  const { id, title, text, datetime } = req.body;
  const read = await readAll();
  res.json(read);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const item = await readOne(id);

  if(item) {
    return res.json(item);
  }
  res.status(404).json({error: 'Not found'});
});




router.post('/', async (req, res) => {
  const { title, text, datetime } = req.body;
  const note = await create({ title, text, datetime });
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


  const item = {title: title, text: text, datetime: datetime};
  
  return res.status(201).json(item);
});


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
