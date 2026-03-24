const { sequelize, Category } = require('../models');

async function createCategories() {
  await sequelize.sync();

  const categories = [
    { name: 'Citrus' },
    { name: 'Applen' },
    { name: 'Bar' },
    { name: 'Tropiskt' },
    { name: 'Meloner' },
    { name: 'Stenfrukt' },
    { name: 'Sasong' },
  ];

  for (const categoryData of categories) {
    await Category.findOrCreate({ where: { name: categoryData.name }, defaults: categoryData });
  }

  console.log('Fruktkategorier har skapats!');
}

createCategories().catch(console.error);
