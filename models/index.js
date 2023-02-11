// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// {========== To create a One-To-Many relationship, the "hasMany" and "belongsTo" associations are used together ==========}
// One(Category) - To - Many(Product)

// Products belongsTo Category
/**
The A.belongsTo(B) association means that a One-To-One relationship
exists between A and B, with the foreign key being defined in the source model (A).
**/
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
/**
The A.hasMany(B) association means that a One-To-Many relationship
exists between A and B, with the foreign key being defined in the target model (B).
**/
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL'
});

// {========== To create a Many-To-Many relationship, two belongsToMany calls are used together ==========}
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'product_tags'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'tag_products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
