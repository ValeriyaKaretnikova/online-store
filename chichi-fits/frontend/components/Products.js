import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { perPage } from '../config';

import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `1fr 1fr 1fr`,
          gridGap: `50px`,
        }}
      >
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
