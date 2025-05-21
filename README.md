# Flight Area Checker

The **Flight Area Checker** is a React-based web application that allows users to investigate airspace restrictions for drones and view population density statistics for selected locations.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router
- **Chart**: Recharts
- **API Integration**: Fetch data from external APIs
- **Testing**: Cypress for end-to-end testing
- **Build Tool**: Vite

## Project Structure

```
.env
.env.example
.gitignore
cypress/
public/
src/
  assets/
  components/
  providers/
  services/
  App.tsx
  main.tsx
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd -flight-area-check
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure the required environment variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

Open the app in your browser at http://localhost:5173.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run cypress:open`: Open the Cypress test runner.
- `npm run cypress:run`: Run Cypress tests in headless mode.

## Environment Variables

The app requires the following environment variables to be set in a `.env` file:

- `VITE_GEOADMIN_BASE=<GeoAdmin API Base URL>`
- `VITE_DRONE_LAYER=<Drone Layer ID>`
- `VITE_POP_LAYER=<Population Layer ID>`
- `VITE_LANG=<Language Code>`
- `VITE_TOLERANCE=<Tolerance Value>`
- `VITE_RETURN_GEOMETRY=<Return Geometry Flag>`
- `VITE_SRID=<Spatial Reference ID>`
- `VITE_LOCATIONS_API_URL=<Locations API URL>`

## API Endpoints

- **Locations**: Fetch locations data to have a location which is used either for drone restriction or population density fetching.
- **Drone Restrictions**: Fetch drone restriction data for a given location.
- **Population Density**: Fetch population density data for a given location.

## Testing

Run Cypress tests to ensure the app works as expected:

- Open the Cypress test runner:

  ```bash
  npm run cypress:open
  ```

- Run tests in headless mode:
  ```bash
  npm run cypress:run
  ```

## Deployment

The app is configured for deployment on Vercel. The `vercel.json` file includes a rewrite rule to handle routing.
