const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/user.model.js');
const Category = require('./models/category.model.js');
const Event = require('./models/event.model.js');
const Registration = require('./models/registration.model.js');
const Message = require('./models/message.model.js');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Message.deleteMany();
    await Registration.deleteMany();
    await Event.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const adminUser = await User.create({
      name: 'Admin Manager',
      email: 'admin@eventpulse.com',
      password: hashedPassword,
      role: 'admin'
    });

    await User.create({
      name: 'Regular Attendee',
      email: 'attendee@eventpulse.com',
      password: hashedPassword,
      role: 'attendee'
    });

    const categories = await Category.insertMany([
      { name: 'Technology', description: 'Tech talks, coding bootcamps, and AI.' },
      { name: 'Design', description: 'UI/UX, graphic design, and illustration.' },
      { name: 'Business', description: 'Startups, marketing, and leadership.' }
    ]);

    await Event.insertMany([
      {
        title: 'Future of Web Development',
        description: 'Exploring the latest trends in React, Vue, and backend architecture.',
        category: categories[0]._id,
        date: new Date('2026-10-15'),
        city: 'Cairo',
        venue: 'Tech Hub',
        capacity: 100,
        organizer: adminUser._id
      },
      {
        title: 'Mastering Figma Components',
        description: 'A deep dive into advanced UI design and design systems.',
        category: categories[1]._id,
        date: new Date('2026-11-05'),
        city: 'Alexandria',
        venue: 'Design Studio 5',
        capacity: 50,
        organizer: adminUser._id
      },
      {
        title: 'Startup Pitch Night',
        description: 'Watch 10 startups pitch their ideas to local investors.',
        category: categories[2]._id,
        date: new Date('2026-12-01'),
        city: 'Cairo',
        venue: 'AUC Campus',
        capacity: 200,
        organizer: adminUser._id
      },
      {
        title: 'Fullstack Bootcamp Kickoff',
        description: 'Welcome day for the new cohort of aspiring software engineers.',
        category: categories[0]._id,
        date: new Date('2027-01-10'),
        city: 'Cairo',
        venue: 'Digital Egypt Hub',
        capacity: 75,
        organizer: adminUser._id
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();