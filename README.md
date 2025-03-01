Nimbus - Modern Weather Application
Nimbus is a user-friendly weather application developed using modern web technologies. The name comes from "nimbus" clouds - dark rain-bearing clouds - chosen to align with the weather theme and convey a lightweight, cloud-based application feel.


## Features:
Current weather information for any city
5-day weather forecast
Toggle between Celsius and Fahrenheit temperature units
Search history
Popular cities list
Responsive design
Server-side rendering and static page generation
Client-side data refreshing

## Technology Stack
Frontend: Next.js 14 (App Router), React 18, TypeScript
State Management: Redux Toolkit
Data Fetching: TanStack Query (React Query)
Styling: Tailwind CSS
API: [WeatherAPI.com](https://openweathermap.org/)
Deployment: Vercel

## Installation
Clone the repository:
git clone https://github.com/yourusername/nimbus.git
cd nimbus

Install dependencies:
npm install

Create a .env.local file:
NEXT_PUBLIC_OPENWEATHER_API_KEY=yourapikey
Sign up at WeatherAPI.com to get an API key.

Navigate to http://localhost:3000 in your browser.

## Architectural Decisions

* SSR, SSG, and CSR Balance
Nimbus intelligently utilizes different rendering strategies offered by Next.js:
* Static Site Generation (SSG):
The home page and weather pages for popular cities are generated at build time.
The generateStaticParams function creates static pages for popular cities.
This improves initial load time and SEO.
* Server-Side Rendering (SSR):
For non-popular cities, pages are rendered on the server at request time.
This allows us to serve dynamic content without having to generate static pages for every possible city.
* Client-Side Rendering (CSR):
User interactions (search, unit toggle) are handled client-side.
When clicking on a city from search history, data is refreshed client-side.(Intended)
* Incremental Static Regeneration (ISR):
Static pages are regenerated every hour with the revalidate: 3600 setting.
This ensures data stays fresh while reducing server load.

## Data Management Strategy
Redux:
Redux Toolkit is used for global application state.
Search history, temperature unit, and refresh state are stored in Redux.
Integrated with localStorage to persist user preferences.
React Query:
Used for API requests with caching, retrying, and data refreshing capabilities.
Works seamlessly with SSR for initial data loading.
Optimized to prevent unnecessary refetches.

## Refresh Strategy
Implemented a clean solution for refreshing data when a user clicks on a city in their search history:
When a user clicks a city in search history, set a refreshCity state in Redux.
When navigating to the city page, the useWeatherData hook checks if the current city matches the refreshCity.
If it matches, it forces a data refresh regardless of cache status.
After refreshing, the refreshCity state is cleared.
This approach avoids URL parameter pollution while ensuring users always get fresh data when explicitly requesting it.

## Performance Optimizations
Caching Strategy: React Query caches API responses to minimize network requests.
Memoization: Key components use React.memo and useCallback to prevent unnecessary re-renders.
Code Splitting: Next.js automatically splits code by route for optimal loading.
Static Generation: Popular city pages are pre-rendered for faster initial load.
Incremental Static Regeneration: Pages are regenerated periodically to keep data fresh.


## License
MIT
---
This project was created as a demonstration of modern web development practices using Next.js, React, and TypeScript.