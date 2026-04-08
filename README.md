# WallCal Studio

Interactive planner calendar built with React + Vite + Tailwind CSS v4.

This project provides:
- Month-by-month wall-calendar style UI
- Date range selection
- Month/date-range notes
- Theme switching via CSS variables
- Holiday indicators and quick note recall

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- ESLint 9

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build production bundle

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Project Structure

```text
src/
	components/
		Appheader.jsx
		Calendar.jsx
		Calheader.jsx
		Calgrid.jsx
		Heroimage.jsx
		Notespanel.jsx
		Themeswitcher.jsx
		Wirerings.jsx
	context/
		CalContext.jsx
		Themecontext.jsx
	data/
		calendarData.js
	hooks/
		Useresponsive.js
	App.jsx
	main.jsx
	index.css
```

## How It Works

- `ThemeProvider` writes selected theme variables to `document.documentElement`.
- `CalProvider` stores all calendar state (month/year, selected range, notes, animation state).
- `Calendar` composes hero image, notes panel, and date grid differently for mobile vs desktop.
- `CalGrid` computes all 42 calendar cells (including leading/trailing days).
- `NotesPanel` stores note text using a key derived from month/date/date-range.

## Function-by-Function Explanation

### Entry and Root App

#### `src/main.jsx`
- `createRoot(...).render(...)`
	- Mounts the React app into the `#root` element.
	- Wraps app with `StrictMode` for development checks.

#### `src/App.jsx`
- `App()`
	- Root UI composition.
	- Wraps content with `ThemeProvider` and `CalProvider`.
	- Renders app background effects, header, main calendar section, and footer.

### Context and State Management

#### `src/context/Themecontext.jsx`
- `ThemeProvider({ children })`
	- Holds active theme in state.
	- Applies each theme CSS variable to `<html>` when theme changes.
	- Exposes `theme`, `setTheme`, and `themes` through context.
- `useTheme()`
	- Convenience hook that returns the theme context value.

#### `src/context/CalContext.jsx`
- `CalProvider({ children })`
	- Central calendar state container.
	- Stores: `year`, `month`, selected start/end dates, hover date, notes map, and flip animation state.
	- Exposes helper functions (`go`, `clickDate`, `inRange`, `noteKey`) and setters.
- `go(dir)`
	- Changes month (`next` or `prev`).
	- Handles year rollover (Dec -> Jan and Jan -> Dec).
	- Triggers flip animation and clears current selection after navigation.
- `clickDate(ds)`
	- Handles two-click range selection.
	- First click sets start.
	- Second click sets end, auto-swapping if clicked date is earlier than start.
- `inRange(ds)`
	- Returns `true` when a date is strictly between start and end (or start and hover during preview).
- `noteKey()`
	- Returns storage key for notes based on current selection:
		- range key: `start__end`
		- single day key: `start`
		- month key: `YYYY-MM`
- `useCal()`
	- Convenience hook that returns calendar context value.

### Hooks

#### `src/hooks/Useresponsive.js`
- `useResponsive(breakpoint = 720)`
	- Tracks whether current viewport width is below `breakpoint`.
	- Subscribes to window resize events and updates `isMobile`.
	- Used by layout components to switch mobile/desktop structure.

### Components

#### `src/components/Appheader.jsx`
- `App()`
	- Renders sticky top header branding and theme selector.
	- Includes `ThemeSwitcher` in the header right side.

#### `src/components/Calendar.jsx`
- `Calendar()`
	- Main planner card container.
	- Builds card visual style and month flip transform.
	- Mobile layout: hero -> calendar -> notes (vertical).
	- Desktop layout: top hero + bottom split (notes left, calendar right).

#### `src/components/Calheader.jsx`
- `CalHeader()`
	- Displays current month title and year.
	- Wires previous/next navigation to context `go`.
- `NavBtn({ dir, label })` (inner helper component)
	- Styled navigation button used for both left and right arrows.
	- Adds hover visual feedback and accessible `aria-label`.

#### `src/components/Calgrid.jsx`
- `pad(n)`
	- Returns a two-digit numeric string (`1 -> "01"`).
- `daysInMonth(y, m)`
	- Returns number of days in month `m` of year `y`.
- `firstDay(y, m)`
	- Returns Monday-based start index for month `m` (`0=Mon ... 6=Sun`).
- `CalGrid()`
	- Builds a fixed 6x7 grid (42 cells).
	- Adds trailing days from previous month and leading days from next month.
	- Applies visual states for selected start/end, range, today, weekends, and holidays.
	- Handles click and hover interactions for range selection.
	- Shows legend for selection state meanings.

#### `src/components/Heroimage.jsx`
- `HeroImage()`
	- Shows month image and month/year text overlay.
	- Resets loading state when month changes.
	- Displays shimmer skeleton until image finishes loading.
	- Uses month palette to draw diagonal overlays.

#### `src/components/Notespanel.jsx`
- `NotesPanel()`
	- Note editor panel with notepad styling.
	- Shows context label for month/day/range.
	- Lists holidays and saved notes for current month.
- `save()`
	- Persists current note text into context `notes` object under `noteKey()`.
	- Shows temporary saved confirmation state.
- `fmt()`
	- Returns human-readable label for selected month/day/range.
	- Used in panel header and textarea placeholder.

#### `src/components/Themeswitcher.jsx`
- `ThemeSwitcher()`
	- Renders current theme button and dropdown list.
	- Toggles dropdown open/close.
	- Selects and applies theme via context `setTheme`.
	- Closes dropdown on outside click.

#### `src/components/Wirerings.jsx`
- `WireRings()`
	- Decorative top wire-ring strip to mimic hanging wall calendar rings.

### Data Module

#### `src/data/calendarData.js`
- `MONTH_DATA`
	- Array with metadata for each month:
		- month index
		- display name
		- hero image and alt text
		- palette (`primary`, `accent`, `dark`, `light`)
		- mood caption
- `HOLIDAYS`
	- Static date-to-holiday mapping used by date grid and notes panel.
- `THEMES`
	- Theme definitions used by theme switcher and provider.
	- Each theme contains `id`, `name`, `icon`, and CSS variable map (`vars`).

## Styling Notes

- `src/index.css` contains global CSS variables, animations, decorative effects, scrollbar styles, and typography defaults.
- Most component-level styling is done inline to dynamically apply month palette and theme variables.

## Feature Summary

- Month navigation with animated flip effect
- Date range selection with hover preview
- Today and holiday highlighting
- Context-aware notes (month/day/range)
- Saved notes quick recall
- Multi-theme support with instant CSS variable updates
- Responsive layout for mobile and desktop

## Possible Improvements

- Persist notes and selected theme to localStorage
- Add keyboard navigation for date cells
- Add tests for context helpers (`go`, `inRange`, `noteKey`)
- Add TypeScript types for safer refactors
