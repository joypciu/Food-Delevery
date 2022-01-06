import Joi from 'joi';

export const createfoodValidation = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().required(),
  imageUrl: Joi.string().optional(),
  resturantId: Joi.number(),
  //   price Decimal
  //   imageUrl String?
  //   resturant Resturant? @relation(fields: [resturantId],references: [id])
  //   resturantId Int @unique
});
export const updatefoodValidation = Joi.object({
  name: Joi.string().min(3).optional(),
  price: Joi.number().optional(),
  imageUrl: Joi.string().optional(),
  resturantId: Joi.number().optional(),
  //   price Decimal
  //   imageUrl String?
  //   resturant Resturant? @relation(fields: [resturantId],references: [id])
  //   resturantId Int @unique
});
