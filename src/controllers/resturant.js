import { client } from '../utils/prismaClient.js';
export const getResturants = async (req, res) => {
  try {
    const resturants = await client.resturant.findMany({
      include: {
        menu:{}
      },
    });
    res.status(200).send(resturants);
  } catch (error) {
    throw Error(error.message);
  }
};
