import { client } from '../utils/prismaClient.js';
import { foodValidation } from '../utils/validation.js';
//getFoodById,
// createFood,
// updateFood,
// deleteFood,
export const getFoods = async (req, res) => {
  try {
    const foods = await client.food.findMany({});
    res.status(200).json(foods);
  } catch (error) {
    res.status(404).json({
      message: error.message,
      myMsg: 'could not find any foods',
    });
  }
};
export const getFoodById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const food = await client.food.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (food) {
      return res.status(200).send(food);
    } else {
      return res.status(404).send({
        msg: `no food found with id ${id}`,
      });
    }
  } catch (error) {
    res.status(404).json({
      msg: error.message,
    });
  }
};

export const createFood = async (req, res) => {
  try {
    const { name, price, imageUrl, resturantId } = req.body;
    console.log({ name, price, imageUrl, resturantId });
    const { error } = foodValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        msg: 'Input errors',
        errors: error.details,
        originals: error._original,
      });
    }
    const existingFood = await client.food.findFirst({
      where: {
        name: name,
      },
    });

    if (existingFood) {
      return res.status(400).json({
        status: 400,
        msg: 'Food Already Exist.Insert New Food',
      });
    }
    if (!error && !existingFood) {
      const newFood = await client.food.create({
        data: {
          name,
          price,
          imageUrl,
          resturantId,
        },
      });
      return res.status(200).send(newFood);
    }
  } catch (error) {
    res.status(404).json({
      msg: error.message,
    });
  }
};
