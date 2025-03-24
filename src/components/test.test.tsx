import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TestComponent from '@/components/TestComponent';

describe('Test Component Test Start', () => {
  it('GUI Test - Test 컴포넌트 name props', () => {
    render(<TestComponent />);
    const welcomeElement = screen.getByText('TestComponent');
    expect(welcomeElement).toBeInTheDocument();
  });
});
