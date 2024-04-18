const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    console.log('start')
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: 'products'}]
    })
    // console.log('end')
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrieve all '})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    console.log('start id')
    const categoryId = await Category.findfByPk( req.params.id, {
      include: [{ model: Product, as: 'products'}]
    })
    console.log('end id')
    if (!categoryId) {
      res.status(400).json({message: 'Id not found'});
      return;
    }
  } catch(err) {
    res.status(500).json({message: 'Id not retrieved'})
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    console.log('create start')
    const categoryCreate = await Category.create(req.body);
    res.status(200).json(categoryCreate)
    console.log('create end')
  } catch (err) {
    res.status(500).json({message: 'Unable to create new Category'})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id:req.params.id
      }
    });
    if(!categoryUpdate[0] === 0) {
      res.status(400).json({message: 'Unable to update due to no Id'});
      return;
    } 
    res.status(200).json(categoryUpdate);
  } catch (err){
    res.status(500).json({ message: 'Error updating'})
 }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{ 
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!categoryDelete) {
      res.status(400).json({message: 'Could not be found to delete'})
    }
  } catch (err) {
    res.status(500).json({ message: ' 500 error for deletion'})
  }
});

module.exports = router;
