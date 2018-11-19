/* @flow */
import { type Context } from '../../Context';

export default async function(input: any, ctx: Context) {
  const property = { ...input };

  const data = await ctx.validate(property)(p =>
    p
      .field('id')
      .fromGlobalId('Property')
      .field('livingSurface', { as: 'living_surface' })
      .isFloat({ min: 20, max: 5000 })
      .field('landSurface', { as: 'land_surface' })
      .isFloat({ min: 20, max: 5000 })
      .field('numberOfRooms', { as: 'number_of_rooms' })
      .isFloat({ min: 1, max: 100 })
      .field('numberOfParkings', { as: 'number_of_parkings' })
      .isInt({ min: 1, max: 100 }),
  );

  return data;
}
