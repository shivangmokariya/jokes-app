import { Injectable } from '@nestjs/common';
const axios = require('axios');

@Injectable()
export class jokeService {
  constructor(
  ) {}

  getRandomJoke = async () => {
    const apiUrl = process.env.NORRIS_API_URL;
    try {
      const response = await axios.get(apiUrl);
      const joke = response.data.value;
      return {message:'Your random joke fetched successfully', joke };
    } catch (error) {
      console.error('Error fetching Data:', error.message);
      throw error;
    }
  };
}
