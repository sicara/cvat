// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

/// <reference types="cypress" />

import { taskName } from '../../support/const';

context('Check if the image is rotated', () => {
    const caseId = '19';

    function imageRotate(direction = 'anticlockwise') {
        cy.get('.cvat-rotate-canvas-control').trigger('mouseover');
        if (direction === 'clockwise') {
            cy.get('.cvat-rotate-canvas-controls-right').click();
        } else {
            cy.get('.cvat-rotate-canvas-controls-left').click();
        }
    }

    before(() => {
        cy.openTaskJob(taskName);
    });

    describe(`Testing case "${caseId}"`, () => {
        it('Rotate an image (once clockwise, twice anticlockwise)', () => {
            imageRotate('clockwise');
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(90deg);');
            imageRotate('anticlockwise');
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(0deg);');
            imageRotate('anticlockwise');
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(270deg);');
        });

        it("Go to the next frame. It wasn't rotated.", () => {
            cy.get('.cvat-player-next-button').click();
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(0deg);');
        });

        it('Go to settings, set "Rotate all images" to true.', () => {
            cy.openSettings();
            cy.get('.cvat-player-settings-rotate-all-checkbox').click();
            cy.closeSettings();
        });

        it('Rotate current frame 180 deg.', () => {
            imageRotate('clockwise');
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(90deg);');
            imageRotate('clockwise');
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(180deg);');
        });

        it('Go to the previous and to the next frame. They are also rotated 180 deg.', () => {
            cy.get('.cvat-player-previous-button').click();
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(180deg);');
            cy.get('.cvat-player-next-button').click();
            cy.get('#cvat_canvas_background').should('have.attr', 'style').and('contain', 'rotate(180deg);');
        });
    });
});
