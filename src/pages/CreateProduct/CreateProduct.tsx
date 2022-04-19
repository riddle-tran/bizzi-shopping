import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { TThumbnail } from 'entities/product';

import './CreateProduct.css';
import { TCreateProductFormData } from './types';
import { CreateProductProps } from './interfaces';
import useCreateProductMutation from 'hooks/mutations/useCreateProductMutation';

export const THUMBNAIL: TThumbnail[] = [
  'C',
  'Go',
  'Vue',
  'Java',
  'Node',
  'React',
  'Slack',
  'Github',
  'Angular',
  'Typescript',
  'Javascript',
];

const CreateProduct: React.FC<CreateProductProps> = () => {
  // Hooks
  const { register, handleSubmit } = useForm<TCreateProductFormData>({
    mode: 'all',
    defaultValues: { thumbnail: 'Javascript' },
  });
  const [onCreateProduct, { loading, error }] = useCreateProductMutation();

  // Action handlers
  const onSubmit = useCallback(
    (data: TCreateProductFormData) => {
      onCreateProduct({
        variables: { ...data, price: +data.price },
      });
    },
    [onCreateProduct],
  );

  // Renders

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! ${error.message}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>Name(Required)</div>
        <input {...register('name')} />
      </div>
      <br />
      <div>
        <div>Price(Required)</div>
        <input {...register('price')} type='number' />
      </div>
      <br />
      <div>
        <div>Description</div>
        <textarea {...register('description')} />
      </div>
      <br />
      <div>
        <div>Select thumbnail</div>
        {THUMBNAIL.map((thumbnail) => {
          return (
            <div key={thumbnail}>
              <input
                {...register('thumbnail')}
                type='radio'
                id={thumbnail}
                value={thumbnail}
              />
              <label htmlFor={thumbnail}>{thumbnail}</label>
            </div>
          );
        })}
      </div>
      <br />
      <br />

      <input type='submit' />
    </form>
  );
};

export default CreateProduct;
