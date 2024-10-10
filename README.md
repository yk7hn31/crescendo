# crescendo

Crescendo is a web app designed to streamline music discovery through a simple search interface. It integrates with external music APIs (such as iTunes Search API) to fetch and display tracks, albums, and artists, offering a seamless user experience.

## Features

- **Search Interface**: Users can search for music tracks, albums, and artists.
- **Custom Formatting**: Display results tailored based on the type of media (tracks, collections, artists).
- **Responsive Design**: Optimized for a fluid experience across devices.

## Technologies

- **Frontend**: React(w/shadcn-UI), TypeScript
- **Backend**: Go (API server)
- **API**: iTunes Search API integration

## Setup

### Prerequisites

1. **Go** (> v1.16)
2. **Node.js** (> v14.0.0) + **npm**

### Walkthrough

1. **Clone this repo:**

```sh
git clone https://github.com/yk7hn31/crescendo.git
cd crescendo
```

2. **Install client dependencies:**

```sh
cd client
npm i # at: crescendo/client
```

3. **Run Servers:**

```sh
npm run dev # at: crescendo/client
cd ../server
go run server.go # at: crescendo/server
```