import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from './Pagination';

describe('Pagination', () => {
  it('renders nav with aria-label "pagination"', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'pagination');
  });

  it('marks active link with aria-current="page"', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page');
  });

  it('renders previous and next buttons with accessible labels', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious /></PaginationItem>
          <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext /></PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('renders ellipsis as aria-hidden', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationEllipsis data-testid="dots" /></PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByTestId('dots')).toHaveAttribute('aria-hidden', 'true');
  });
});
