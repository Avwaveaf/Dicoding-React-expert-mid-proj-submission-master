import React from 'react';
import { render, screen } from '@testing-library/react';
import LeaderboardsList from './LeaderboardsList.component';
import '@testing-library/jest-dom/extend-expect';

/**
 * CommentsItem
1. component should render correctly with mock data
 */

describe('LeaderboardsList', () => {
  it('renders the list of leaderboards', () => {
    const leaderboards = [
      {
        user: {
          id: 1,
          name: 'John Doe',
          avatar: 'https://example.com/avatar.jpg',
        },
        score: 100,
      },
      {
        user: {
          id: 2,
          name: 'Jane Smith',
          avatar: 'https://example.com/avatar.jpg',
        },
        score: 90,
      },
    ];

    render(<LeaderboardsList leaderboards={leaderboards} />);

    const leaderboardList = screen.getByTestId('leaderboards-list');
    expect(leaderboardList).toBeInTheDocument();

    const leaderboardItems = screen.getAllByRole('listitem');
    expect(leaderboardItems).toHaveLength(2);

    const firstLeaderboardItem = leaderboardItems[0];
    expect(firstLeaderboardItem).toHaveTextContent('John Doe');
    expect(firstLeaderboardItem).toHaveTextContent('100');

    const secondLeaderboardItem = leaderboardItems[1];
    expect(secondLeaderboardItem).toHaveTextContent('Jane Smith');
    expect(secondLeaderboardItem).toHaveTextContent('90');
  });
});
