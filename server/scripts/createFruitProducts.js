const { sequelize, Product, Category } = require('../models');

const fruitProducts = {
  Citrus: [
    ['Apelsiner 1 kg', 'Söta och saftiga apelsiner som passar perfekt till juice och mellanmål.', 29],
    ['Citroner 1 kg', 'Friska citroner med mycket smak för matlagning, bakning och dryck.', 27],
    ['Lime 500 g', 'Syrliga limefrukter som passar bra till dressing, dryck och mat.', 22],
    ['Clementiner 1 kg', 'Lättskalade clementiner som är enkla att ta med.', 31],
  ],
  Applen: [
    ['Röda äpplen 1 kg', 'Krispiga röda äpplen med balanserad sötma.', 25],
    ['Gröna äpplen 1 kg', 'Friska gröna äpplen med tydlig syra.', 26],
    ['Päron 1 kg', 'Mjuka och saftiga päron med rund smak.', 32],
    ['Äppelmix 2 kg', 'Blandning av olika äppelsorter för hela familjen.', 45],
  ],
  Bar: [
    ['Jordgubbar 500 g', 'Färska jordgubbar med naturlig sötma.', 34],
    ['Blåbär 250 g', 'Små och smakrika blåbär till frukost och bakning.', 28],
    ['Hallon 250 g', 'Mjuka hallon som passar till dessert och smoothie.', 29],
    ['Bärmix 500 g', 'Praktisk mix av flera bärsorter.', 36],
  ],
  Tropiskt: [
    ['Mango', 'Mogen mango med söt och fyllig smak.', 24],
    ['Ananas', 'Färsk ananas som är redo att skäras upp och serveras.', 39],
    ['Papaya', 'Mild och söt tropisk frukt för frukost och sallad.', 35],
    ['Kiwi 6-pack', 'Syrlig och frisk kiwi rik på smak.', 30],
  ],
  Meloner: [
    ['Vattenmelon', 'Stor vattenmelon som passar perfekt under varma dagar.', 49],
    ['Honungsmelon', 'Söt honungsmelon med mjuk konsistens.', 34],
    ['Cantaloupe', 'Aromatisk melon med tydlig fruktsmak.', 36],
    ['Melonmix', 'Färdig blandning av flera melonsorter.', 42],
  ],
  Stenfrukt: [
    ['Persikor 1 kg', 'Saftiga persikor med mjuk sötma.', 33],
    ['Nektariner 1 kg', 'Släta nektariner med frisk smak.', 34],
    ['Plommon 1 kg', 'Mörka plommon med söt och fyllig smak.', 31],
    ['Aprikoser 500 g', 'Små aprikoser som passar bra som mellanmål.', 27],
  ],
  Sasong: [
    ['Fruktlåda Mini', 'En mindre låda med blandad säsongsfrukt för hem eller kontor.', 79],
    ['Fruktlåda Familj', 'Större fruktlåda med variation för hela familjen.', 129],
    ['Smoothiepaket', 'Utvalda frukter som passar extra bra till smoothies.', 89],
    ['Säsongsmix', 'Butikens utvalda frukter för veckan i en mixlåda.', 69],
  ]
};

const imageMap = {
  Citrus: ['citrus-1.png', 'citrus-2.png', 'citrus-3.png', 'citrus-4.png'],
  Applen: ['applen-1.png', 'applen-2.png', 'applen-3.png', 'applen-4.png'],
  Bar: ['bar-1.png', 'bar-2.png', 'bar-3.png', 'bar-4.png'],
  Tropiskt: ['tropiskt-1.png', 'tropiskt-2.png', 'tropiskt-3.png', 'tropiskt-4.png'],
  Meloner: ['meloner-1.png', 'meloner-2.png', 'meloner-3.png', 'meloner-4.png'],
  Stenfrukt: ['stenfrukt-1.png', 'stenfrukt-2.png', 'stenfrukt-3.png', 'stenfrukt-4.png'],
  Sasong: ['sasong-1.png', 'sasong-2.png', 'sasong-3.png', 'sasong-4.png'],
};

async function createFruitProducts() {
  await sequelize.sync();

  for (const [categoryName, products] of Object.entries(fruitProducts)) {
    const [category] = await Category.findOrCreate({ where: { name: categoryName } });

    for (let i = 0; i < products.length; i++) {
      const [title, description, price] = products[i];
      const imageUrl = `/uploads/productImages/${categoryName}/${imageMap[categoryName][i]}`;

      await Product.findOrCreate({
        where: { title },
        defaults: {
          title,
          description,
          price,
          imageUrl,
          categoryId: category.id,
        },
      });
    }
  }

  console.log('Fruktprodukter har skapats!');
}

createFruitProducts().catch(console.error);
