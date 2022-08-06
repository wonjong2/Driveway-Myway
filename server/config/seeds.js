const db = require('./connection');
const { User, Driveway, Zipcode } = require('../models');
const usZips = require('./uszips.json');

db.once('open', async () => {
  await Zipcode.deleteMany();

  const zipcodes = await Zipcode.insertMany(
    usZips
  );

  console.log('zipcodes seeded');

  await Driveway.deleteMany();
 
  const driveways = await Driveway.insertMany([
    {
      address: '5 Boyd Trail',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      rules: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_1_k6oukw.jpg',
      price: 2.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM',
      zipcode: zipcodes[32993]._id,
      isReserved: null
    },
    {
      address: '92419 Kings Pass',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      rules: 'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812684/driveway_2_zypdsy.jpg',
      price: 1.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM',
      zipcode: zipcodes[32993]._id
    },
    {
      address: '6449 Aberg Pass',
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      rules:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812684/driveway_3_mckozx.jpg',
      price: 7.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM',
      zipcode: zipcodes[32993]._id
    },
    {
      address: '531 Canary Trail',
      zipcode: zipcodes[32994]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_4_cldyoh.jpg',
      price: 3.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '3557 Lien Alley',
      zipcode: zipcodes[32995]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_5_bfmhi4.jpg',
      price: 14.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '40784 Tennessee Plaza',
      zipcode: zipcodes[32994]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_6_b9quxh.jpg',
      price: 399.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '5 Vernon Junction',
      zipcode: zipcodes[32994]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_7_tfduxk.webp',
      price: 199.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '8 Schurz Avenue',
      zipcode: zipcodes[32996]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_8_kvghpr.jpg',
      price: 9.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '7772 Vermont Trail',
      zipcode: zipcodes[32997]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_9_wf5g7t.jpg',
      price: 1.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '850 Alpine Parkway',
      zipcode: zipcodes[32996]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_10_chukf3.jpg',
      price: 2.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '7185 Huxley Trail',
      zipcode: zipcodes[32997]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659812683/driveway_11_oqnxxu.jpg',
      price: 7.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    },
    {
      address: '21 American Hill',
      zipcode: zipcodes[32998]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'https://res.cloudinary.com/dgmjt3z0f/image/upload/v1659814841/driveway_12_wtladi.jpg',
      price: 9.99,
      startTime: '12:00 PM',
      endTime: '5:00 PM'
    }
  ]);

  console.log('driveways seeded');
  console.log(zipcodes[32993].zip)
  console.log(zipcodes[32994].zip)
  console.log(zipcodes[32995].zip)
  console.log(zipcodes[32996].zip)
  console.log(zipcodes[32997].zip)
  console.log(zipcodes[32998].zip)
  await User.deleteMany();

  // await User.create({
  //   firstName: 'Pamela',
  //   lastName: 'Washington',
  //   email: 'pamela@testmail.com',
  //   password: 'password12345',
  //   orders: [
  //     {
  //       products: [products[0]._id, products[0]._id, products[1]._id]
  //     }
  //   ]
  // });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
