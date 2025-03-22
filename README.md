# Mini Incident Dashboard

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/drnhng/mini-incident-dashboard.git
cd mini-incident-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Mock GraphQL Server
```bash
node server.js
```

### 4. Run the React App
```bash
npm start
```

The app should now be running at `http://localhost:3000` and connected to the GraphQL backend at `http:localhost:4000/graphql`.

---

## Structure

```
/src
  /components       # UI components
  /context          # Context for shared state management
  /graphql          # GraphQL queries and setup
  /hooks            # Custom React hooks for GraphQL logic
  /styles           # CSS stylesheets for components
  /types            # TypeScript types (autogenerated from GraphQL Code Generator)
  App.tsx           # Root component
```

---

## Features
- View a list of incidents with title, description, severity, and status
- Severity level displayed with a color coded badge
- Create new incidents via modal form
- View the modal detail view of an incident by clicking on an incident
- Edit existing incidents in the modal detail view
- Delete 1 or more selected incidents with confirmation
- Filter incidents by severity or status
- Pagination for browsing through incidents (5 per page)

---

## 🛠 Approach

First, I set up the GraphQL backend using Express and Apollo Server, and created mock data based on the sample provided so I could test the frontend. With GraphQL Code Generator, I was able to generate types which i put in the /types folder.

Then, I created an MVP version of the frontend with just the incident feed and a button to add a new incident. I created my own custom React hooks in the /hooks folder for the GraphQL queries and mutations, and connected them to the frontend components. This allows the query/mutation logic to be abstracted and made reusable.

Once I verified the hooks were working correctly, I implemented the remaining functionality: filtering, deleting, and editing incidents. I decided to allow the user to select multiple incidents for the purpose of batch deleting incidents.

I used a ContextProvider to manage UI-related state, such as which modals are open, which incident is selected, and what filters are applied.

Finally, I added a reusable pagination component to allow for browsing incidents in pages of 5.
