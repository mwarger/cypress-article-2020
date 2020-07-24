describe('User profile', () => {
  it('should show success message after profile deletion', () => {
    cy.visit('/profile');

    cy.log('Attempting to delete profile');
    cy.findByRole('button', { name: /delete profile/i }).click();

    cy.log('Confirming deletion');
    cy.findByTestId('delete-profile-modal').within(() => {
      cy.findByRole('button', { name: /delete profile/i }).click();
    });

    cy.log('We are on the success page');
    cy.findByRole('heading', { name: /your profile was deleted/i }).should(
      'be.visible'
    );
  });
});
