import React from 'react';
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('App component tests', () => {
  it('runs App function tests', () => {
    render(<App />);

    const colorDisplay = document.querySelector('#color-box');
    const colorSelector = screen.getByRole('color', { name: 'color-selector' });
    const undoBtn = screen.getByRole('button', { name: 'undo' });
    const redoBtn = screen.getByRole('button', { name: 'redo' });

    // Verify initial color displays.
    expect(colorDisplay).toHaveStyle('background-color: #FF0000');
    
    //Change to new color, and see if display automatically updates.
    fireEvent.input(colorSelector, { target: { value: '#001aff' } });
    expect(colorDisplay).toHaveStyle('background-color: #001aff');

    //Change colors again.
    fireEvent.input(colorSelector, { target: { value: '#e1ff00' } });
    expect(colorDisplay).toHaveStyle('background-color: #e1ff00');
    
    //Go backwards in the colors.
    userEvent.click(undoBtn);
    expect(colorDisplay).toHaveStyle('background-color: #001aff');
    userEvent.click(undoBtn);
    expect(colorDisplay).toHaveStyle('background-color: #FF0000');

    //Go forwards in the colors.
    userEvent.click(redoBtn);
    expect(colorDisplay).toHaveStyle('background-color: #001aff');
    userEvent.click(redoBtn);
    expect(colorDisplay).toHaveStyle('background-color: #e1ff00');

  });
});
