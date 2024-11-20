import mongoose from 'mongoose'

class dbClient {
  constructor() {
    this.connect()
  }

  async connect() {
    try {
      const queryString = process.env.DB_URL || ''
      await mongoose.connect(queryString)
      console.log('Connected to MongoDB');

    } catch (error) {
      console.log('Error connecting to MongoDB', error);

    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect()
      console.log('Disconnected from MongoDB')
    } catch (error) {
      console.log('Error disconnecting from MongoDB', error);

    }
  }
}

export default new dbClient()