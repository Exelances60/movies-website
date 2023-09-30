import { fireEvent, screen } from "@testing-library/react";
import ProfileWatched from "../ProfileWatched";
import { renderWithProviders } from "../../../../utils/tests/test.utils";
import * as reactRedux from "react-redux";

const mockData = [
  {
    adult: false,
    backdrop_path: "/srYya1ZlI97Au4jUYAktDe3avyA.jpg",
    genre_ids: [14, 28, 12],
    id: 464052,
    original_language: "en",
    original_title: "Movie Title",
    overview: "Movie Overview",
    popularity: 333.965,
    poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    release_date: "2020-12-16",
    title: "Movie Title",
    video: false,
    vote_average: 7.3,
    vote_count: 3181,
  },
];

describe("ProfileWatched component", () => {
  test("should render ProfileWatched component", () => {
    renderWithProviders(<ProfileWatched fireBaseUserData={mockData} />, {
      preloadedState: {
        user: {
          operationType: "signIn",
          providerId: null,
          user: {
            displayName: "test",
            email: "test@gmail.com",
          },
        },
      },
    });
    const MovieTitleElement = screen.getByText(/Movie Title/i);
    expect(MovieTitleElement).toBeInTheDocument();
  });
  test("Click the image", async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    renderWithProviders(<ProfileWatched fireBaseUserData={mockData} />, {
      preloadedState: {
        user: {
          operationType: "signIn",
          providerId: null,
          user: {
            displayName: "test",
            email: "test@gmail.com",
          },
        },
      },
    });
  });
});
