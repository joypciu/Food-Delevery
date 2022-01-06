import Joi from 'joi';

export const foodValidation = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().required(),
  imageUrl: Joi.string(),
  resturantId: Joi.number(),
  //   price Decimal
  //   imageUrl String?
  //   resturant Resturant? @relation(fields: [resturantId],references: [id])
  //   resturantId Int @unique
});
