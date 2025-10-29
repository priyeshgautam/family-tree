# Interactive Family Tree

## Overview

This project is a responsive web application designed to visualize and manage family trees. Users can explore family relationships in a hierarchical format, view detailed information for each person, and keep track of upcoming family events.

The application is built using modern web technologies including:
- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling the application with a utility-first approach.
- **react-d3-tree**: For rendering the interactive and customizable tree diagram.

## Features

- **Interactive Tree Visualization**: Pan and zoom the family tree to explore different branches.
- **Multiple Orientations**: Toggle between vertical and horizontal tree layouts.
- **Member Details**: Click on a family member to view their detailed information in a modal, including relationships (parents, spouse, children, siblings), age, and more.
- **Search Functionality**: Quickly find any family member by typing their name in the search bar.
- **Upcoming Events**: A dedicated section that displays upcoming birthdays, marriage anniversaries, and death anniversaries within the next 30 days.
- **Responsive Design**: A clean and accessible interface that works seamlessly on both desktop and mobile devices.

## Project Structure

```
/
├── components/         # React components
│   ├── CustomNode.tsx
│   ├── FamilyTree.tsx
│   ├── MemberDetailsModal.tsx
│   └── UpcomingEvents.tsx
├── data/               # Static data
│   ├── images.ts
│   └── initialData.ts
├── utils/              # Helper functions
│   └── helpers.ts
├── App.tsx             # Main application component
├── index.html          # Entry HTML file
├── index.tsx           # React entry point
├── types.ts            # TypeScript type definitions
└── readme.md           # Project documentation
```

## Installation and Setup

This project is configured to run in an environment that supports ES modules directly in the browser, without a traditional build step or package manager like npm or yarn.

All required libraries (React, `react-d3-tree`) are loaded from a CDN via an `importmap` defined in the `index.html` file.

Therefore, no `npm install` or `yarn install` command is necessary.

## Running the Application

To run this application on your local machine, you need to serve the files using a local web server.

1.  **Clone or Download Files**: Make sure you have all the project files in a single directory on your computer.

2.  **Start a Local Server**: Open your terminal, navigate to the project's root directory, and start a simple local server. Here are a few common ways to do this:

    - **Using Python**:
      If you have Python 3 installed, run:
      ```bash
      python3 -m http.server
      ```
      If you have Python 2, run:
      ```bash
      python -m SimpleHTTPServer
      ```

    - **Using Node.js (with `http-server`)**:
      If you have Node.js and `npm` installed, you can use the `http-server` package:
      ```bash
      npx http-server
      ```

    - **Using VS Code Live Server**:
      If you are using Visual Studio Code, you can install the "Live Server" extension, right-click on the `index.html` file, and select "Open with Live Server".

3.  **Open in Browser**: Once the server is running, open your web browser and navigate to the address provided by the server (usually `http://localhost:8000` or `http://localhost:8080`).

You should now see the Interactive Family Tree application running in your browser.
