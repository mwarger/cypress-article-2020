import React, { Suspense } from 'react';
const RenderPizza = React.lazy(() => import('./RemotePizzaREnder'));

export function RemotePizza() {
  return (
    <Suspense fallback="loading">
      <RenderPizza />
    </Suspense>
  );
}
