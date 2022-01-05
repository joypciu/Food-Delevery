import { client } from '../utils/prismaClient.js';

export const getFoods = async (req, res) => {
  try {
    const foods = await await client.food.findMany({});
    res.status(200).json(foods);
  } catch (error) {
    throw Error(error.message);
  }
};
