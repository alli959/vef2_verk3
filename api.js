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

  if (typeof note.text != 'string'){
    return res.status(400).json({
      field: 'text',
      error: 'Text must be a string',
    });
  }
  if(note.datetime.length === 0){
    return res.status(400).json({
      field: 'datetime',
      error: 'Datetime must be a ISO 8601 date',
    });
  }


  const item = {title: title, text: text, datetime: datetime};
  
  if(item){
    return res.status(201).json(item);
  }
  res.status(404).json({error: 'Not found'}); 
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {title, text, datetime } = req.body;
  const note = await update({ title, text, datetime });

  if(note.title.length === 0){
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string',
    });
  }
  if (typeof note.text != 'string'){
    return res.status(400).json({
      field: 'text',
      error: 'Text must be a string',
    });
  }
  if(note.datetime.length === 0){
    return res.status(400).json({
      field: 'datetime',
      error: 'Datetime must be a ISO 8601 date',
    });
  }


  const item = {title: title, text: text, datetime: datetime};

  if(item) {
    return res.status(200).json(item);
  }

  res.status(404).json({error: 'Not found'});

});

router.delete('/:id', async (req, res) => {
  const { Pid } = req.params;
  const {id} = req.body;
  const note = await del({id});
  
  const item = {id: Pid};

  if(item){
    data.splice(data.indexOf(item), 1);
    return res.status(204).end();
  }
  res.status(404).json({error: 'Not found'});
});

module.exports = router;
