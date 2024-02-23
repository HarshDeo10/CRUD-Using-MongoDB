const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDatabase')

  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define schema for academic records
const academicSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  grades: { type: Map, of: String }, // Assuming grades for different subjects are stored as key-value pairs
  subjects: [String],
  otherAcademicInfo: String,
});

// Define schema for co-curricular activities
const coCurricularSchema = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  activityType: String,
  duration: String,
  achievements: [String],
});

// Create models for academic records and co-curricular activities
const AcademicRecord = mongoose.model('AcademicRecord', academicSchema);
const CoCurricularActivity = mongoose.model('CoCurricularActivity', coCurricularSchema);

// Sample data for academic records
const academicData = [
  {
    studentID: '1001',
    name: 'Virat Kohli',
    grades: { Math: 'A', Science: 'B', English: 'A' },
    subjects: ['Math', 'Science', 'English'],
    otherAcademicInfo: 'Topper in Math class',
  },
  {
    studentID: '1002',
    name: 'Rohit Sharma',
    grades: { Math: 'B', Science: 'A', English: 'A' },
    subjects: ['Math', 'Science', 'English'],
    otherAcademicInfo: 'Active participant in science club',
  },
  {
    studentID: '1003',
    name: 'Raj Sharma',
    grades: { Math: 'C', Science: 'A', English: 'B' },
    subjects: ['Math', 'Science', 'English'],
    otherAcademicInfo: 'Active participant in Leadership club',
  },
];

// Sample data for co-curricular activities
const coCurricularData = [
  {
    studentID: '1001',
    name: 'Virat Kohli',
    activityType: 'Sports',
    duration: '2 years',
    achievements: ['Cricket Champion 2015', 'Best Athlete of the Year'],
  },
  {
    studentID: '1002',
    name: 'Rohit Sharma',
    activityType: 'Singing',
    duration: '3 years',
    achievements: ['First place in Solo Singing Competition'],
  },
  {
    studentID: '1002',
    name: 'Raj Sharma',
    activityType: 'Dancing',
    duration: '3 years',
    achievements: ['First place in Dancing Competition'],
  },
];

// Function to populate the database with sample data
const populateDatabase = async () => {
  try {
    await AcademicRecord.insertMany(academicData);
    await CoCurricularActivity.insertMany(coCurricularData);
    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

// Function to read data from both collections
const readData = async () => {
  try {
    const academicRecords = await AcademicRecord.find();
    const coCurricularActivities = await CoCurricularActivity.find();

    console.log('Academic Records:', academicRecords);
    console.log('Co-curricular Activities:', coCurricularActivities);
  } catch (error) {
    console.log('Error reading data:', error);
  }
};

// Function to update data in both collections
const updateData = async () => {
  try {
    // Update academic record for Virat Kohli
    const updatedAcademicRecord = await AcademicRecord.findOneAndUpdate(
      { studentID: '1001' },
      { $set: { otherAcademicInfo: 'Topper in Math and Science' } },
      { new: true }
    );

    // Update co-curricular activity for Virat Kohli
    const updatedCoCurricularActivity = await CoCurricularActivity.findOneAndUpdate(
      { studentID: '1001' },
      { $push: { achievements: 'Basketball Champion 2021' } },
      { new: true }
    );

    console.log('Updated Academic Record:', updatedAcademicRecord);
    console.log('Updated Co-curricular Activity:', updatedCoCurricularActivity);
  } catch (error) {
    console.log('Error updating data:', error);
  }
};

// Function to delete data in both collections
const deleteData = async () => {
  try {
    // Delete academic record for Rohit Sharma
    const deletedAcademicRecord = await AcademicRecord.findOneAndDelete({ studentID: '1002' });

    // Delete co-curricular activity for Rohit Sharma
    const deletedCoCurricularActivity = await CoCurricularActivity.findOneAndDelete({ studentID: '1002' });

    console.log('Deleted Academic Record:', deletedAcademicRecord);
    console.log('Deleted Co-curricular Activity:', deletedCoCurricularActivity);
  } catch (error) {
    console.log('Error deleting data:', error);
  }
};


populateDatabase();
 readData();
updateData();
deleteData();
