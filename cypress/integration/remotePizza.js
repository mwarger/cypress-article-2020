describe('Remote pizza', () => {
  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

  it('load ingredients asynchronously', () => {
    cy.visit('/remote-pizza');

    cy.log('Load ingredients');

    cy.log('All ingredients appear on the screen');
    for (const ingredient of ingredients) {
      cy.findByText(ingredient).should('be.visible');
    }
  });

  it('handles no ingredients', () => {
    cy.visit('/remote-pizza');

    cy.window().then((window) => {
      // Reference global instances set in src/browser.js
      const { worker, rest } = window.msw;
      worker.use(
        rest.get('https://httpbin.org/anything', (req, res, ctx) => {
          return res.once(ctx.json([]));
        })
      );
    });


    cy.log('Load ingredients');

    cy.log('All ingredients appear on the screen');
    for (const ingredient of ingredients) {
      cy.findByText(ingredient).should('not.be.visible');
    }
  });

  it('shows an error message', () => {
    cy.visit('/remote-pizza');

    cy.window().then((window) => {
      // Reference global instances set in src/browser.js
      const { worker, rest } = window.msw;
      worker.use(
        rest.get('https://httpbin.org/anything', (req, res, ctx) => {
          return res.once(ctx.status(500));
        })
      );
    });

    cy.log('Load ingredients');

    cy.log('Ingredients error message appears');
    cy.findByText(/something went wrong/i).should('be.visible');
  });
});
