const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    console.log('start of tag all data')
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'products'}]
    });
    res.status(200).json(tagData);
    console.log('end of tag all data')
  } catch (err) {
    res.status(500).json({message: 'Error for tag data all'})
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    console.log('STart of tagId')
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'products'}]
    });
    if(!tagId) {
      res.status(400).json({message: 'No tag id found'});
      return;
    }
    res.status(200).json(tagId);
    console.log('end of tagId')
  } catch (err) {
    res.status(500).json({message: 'Error in tagId'})

  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    console.log('start of tag create')
    const tagCreate = await Tag.create(req.body);
    res.status(200).json(tagCreate);
    console.log('end of tag create')
  } catch (err) {
    res.status(500).json({message: 'Error in tagcreate'})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }  
    });
    if(!tagUpdate[0] === 0) {
      res.status(400).json({message: 'No tag id found for update'});
      return;
    } 
    res.status(200).json(tagUpdate);
  } catch(err) {
    res.status(500).json({message: 'Error in tagUpdate'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagUpdate) {
      res.status(400).json({message: 'No tag data found for deletion'});
    };
    res.status(200).json({ message: 'Deleted Tag Data'});
  } catch (err) {
    res.status(500).json({message: 'Error in tagDelete'})
  }
});

module.exports = router;
