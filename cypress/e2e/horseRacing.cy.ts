describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the header with title and control buttons', () => {
    cy.contains('Horse Racing').should('be.visible')
    cy.get('[data-testid="generate-btn"]').should('be.visible')
    cy.get('[data-testid="start-pause-btn"]').should('be.visible')
  })

  it('START button is disabled before generating a schedule', () => {
    cy.get('[data-testid="start-pause-btn"]').should('be.disabled')
  })

  describe('Generate Program', () => {
    it('populates the horse list after clicking Generate', () => {
      cy.get('[data-testid="generate-btn"]').click()
      cy.contains('Henüz program oluşturulmadı').should('not.exist')
    })

    it('creates 6 rounds in the Program panel', () => {
      cy.get('[data-testid="generate-btn"]').click()
      cy.contains('Round 1').should('be.visible')
      cy.contains('Round 6').should('be.visible')
    })

    it('enables the START button after generating', () => {
      cy.get('[data-testid="generate-btn"]').click()
      cy.get('[data-testid="start-pause-btn"]').should('not.be.disabled')
    })

    it('disables the Generate button after generating', () => {
      cy.get('[data-testid="generate-btn"]').click()
      cy.get('[data-testid="generate-btn"]').should('be.disabled')
    })
  })

  describe('Race flow', () => {
    beforeEach(() => {
      cy.get('[data-testid="generate-btn"]').click()
    })

    it('shows Round 1 on the race track after clicking START', () => {
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.contains('Round 1').should('be.visible')
    })

    it('START button label changes to PAUSE after starting', () => {
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.get('[data-testid="start-pause-btn"]').should('contain', 'PAUSE')
    })

    it('PAUSE button pauses the race and changes label to RESUME', () => {
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.get('[data-testid="start-pause-btn"]').should('contain', 'RESUME')
    })

    it('RESUME button resumes the race', () => {
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.get('[data-testid="start-pause-btn"]').should('contain', 'RESUME')
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.get('[data-testid="start-pause-btn"]').should('contain', 'PAUSE')
    })

    it('shows results for round 1 after it finishes', () => {
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.contains('Round 1 —', { timeout: 15000 }).should('be.visible')
    })

    it('re-enables Generate after all rounds finish', () => {
      cy.get('[data-testid="start-pause-btn"]').click()
      cy.get('[data-testid="generate-btn"]', { timeout: 60000 }).should('not.be.disabled')
    })
  })
})
