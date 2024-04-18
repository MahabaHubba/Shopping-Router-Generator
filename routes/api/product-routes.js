const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    console.log('start product all')
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag, through: ProductTag, as: 'tags'}]
    });
    console.log('end product all')
    res.status(200).json(productData);
  } catch(err) {
    res.status(500).json({message: 'Unable to retrieve products all'})
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    console.log('product id start')
    const productId = await Product.findByPk(req.params.id, {
    include: [{model: Category}, {model: Tag, through: ProductTag, as: 'tags'}]
    });
    if(!productId){
      res.status(400).json({message: 'No id found for product'});
    }
    res.status(200).json(productId);
    console.log('product id end')
  } catch (err) {
    res.status(500).json({message: 'Unable to retrieve products id'})
  }
});

// create new product
router.post('/', async (req, res) => {
 try {
  //console.log('start propduct create')
  const productCreate = await Product.create(req.body);
  // console.log(productCreate)
  if(req.body.tagIds && req.body.tagIds.length) {
    const productIdarray = req.body.tagIds.map((tag_id) => {
      return {
        product_id: productCreate.id,
        tag_id,
      }
    });
    await ProductTag.bulkCreate(productIdarray);
  }
  res.status(200).json(productCreate);
  console.log('end of product create')
 } catch (err) {
  console.log(err);
  res.status(500).json({message: 'Error with creation of product'})
 }

  // Product.create(req.body)
  //   .then((product) => {
  //     // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //     if (req.body.tagIds.length) {
  //       const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //         return {
  //           product_id: product.id,
  //           tag_id,
  //         };
  //       });
  //       return ProductTag.bulkCreate(productTagIdArr);
  //     }
  //     // if no product tags, just respond
  //     res.status(200).json(product);
  //   })
  //   .then((productTagIds) => res.status(200).json(productTagIds))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err);
  //   });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id',async (req, res) => {
  // delete one product by its `id` value
  try{
    console.log('start of deletion')
    const deleteData = await Product.destroy({
      where: {
        id:req.params.id
      }
    });
    if(!deleteData){
      res.status(400).json({message: 'Data not found'})
    }
    res.status(200).json(deleteData);
    console.log('end of deletion')
  } catch(err) {
    res.status(500).json({ message: 'error with deletion'})
  }
});

module.exports = router;
