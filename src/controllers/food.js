import { client } from '../utils/prismaClient.js';
import {
  createfoodValidation,
  updatefoodValidation,
} from '../utils/validation.js';

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
    const { error } = createfoodValidation.validate(req.body, {
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

export const updateFood = async (req, res) => {
  try {
    const { ...food } = req.body;
    const { name, price, imageUrl, resturantId } = food;
    const { id } = req.params;
    const existingFood = await client.food.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (existingFood) {
      const { error } = updatefoodValidation.validate(food, {
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
      const payloadToUpdate = {
        name,
        price,
        imageUrl,
        resturantId,
      };
      if (!name && !imageUrl && !price && !resturantId) {
        return res.status(404).send({
          msg: 'need to atleast update one field of food',
        });
      }
      if (!name) payloadToUpdate.name = existingFood.name;
      if (!imageUrl) payloadToUpdate.imageUrl = existingFood.imageUrl;
      if (!price) payloadToUpdate.price = existingFood.price;
      if (!resturantId) payloadToUpdate.resturantId = existingFood.resturantId;
      const updatedFood = await client.food.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(id),
        },
      });
      return res.status(200).send(updatedFood);
    } else {
      return res.status(404).json({
        msg: `no food found with the id = ${id}`,
      });
    }
  } catch (error) {
    res.status(404).json({
      msg: error.message,
    });
  }
};
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const existingFood = await client.food.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (existingFood) {
      await client.food.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({
        status: 200,
        msg: `food wiht id ${id} sucessfully deleted`,
        deletedFood: existingFood,
      });
    } else {
      return res.status(404).json({
        msg: `no id with ${id} found`,
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: error.message,
    });
  }
};
