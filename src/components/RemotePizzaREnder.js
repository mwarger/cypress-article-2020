import React from 'react';

import { fetchIngredients as defaultFetchIngredients } from '../services';
RemotePizzaREnder.defaultProps = {
  fetchIngredients: defaultFetchIngredients,
};

export default function RemotePizzaREnder({ fetchIngredients }) {
  const [status, setStatus] = React.useState('idle');
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    const handleCook = () => {
      setStatus('loading');
      fetchIngredients()
        .then((response) => {
          setStatus('ready');
          setIngredients(response.args.ingredients);
        })
        .catch(() => {
          setStatus('failed');
        });
    };
    handleCook();
  }, [fetchIngredients]);
  return (
    <>
      <h3>Pizza</h3>
      {status === 'failed' && <p>Something went wrong.</p>}
      {ingredients.length > 0 && (
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      )}
    </>
  );
}
