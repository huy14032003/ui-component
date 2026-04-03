import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

describe('Accordion', () => {
  it('renders trigger text', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Body 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('hides content by default', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Body 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.queryByText('Body 1')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Body 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Body 1')).toBeVisible();
  });
});
