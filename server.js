const { ApolloServer } = require('@apollo/server');
const { gql } = require('graphql-tag');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const typeDefs = gql`
  type Incident {
    id: ID!
    title: String!
    description: String!
    severity: Severity!
    status: Status!
  }

  enum Severity {
    LOW
    MEDIUM
    HIGH
  }

  enum Status {
    OPEN
    CLOSED
  }

  type Query {
    getIncidents: [Incident!]!
  }

  type Mutation {
    addIncident(title: String!, description: String!, severity: Severity!, status: Status!): Incident!
    updateIncident(id: ID!, title: String, description: String, severity: Severity, status: Status): Incident!
    deleteIncident(id: ID!): Boolean!
  }
`;

let incidents = [
  {
    id: "1",
    title: "Suspicious DNS Activity",
    description: "Unusual DNS queries from internal host",
    severity: "HIGH",
    status: "OPEN",
  },
  {
    id: "2",
    title: "Unauthorized Login Attempt",
    description: "Login attempt from unrecognized IP",
    severity: "MEDIUM",
    status: "CLOSED",
  }
];

const resolvers = {
  Query: {
    getIncidents: () => incidents,
  },
  Mutation: {
    addIncident: (_, { title, description, severity, status }) => {
      const newIncident = {
        id: String(incidents.length + 1),
        title,
        description,
        severity,
        status,
      };
      incidents.push(newIncident);
      return newIncident;
    },
    updateIncident: (_, { id, title, description, severity, status }) => {
      const incidentIndex = incidents.findIndex((incident) => incident.id === id);
      if (incidentIndex === -1) throw new Error(`updateIncident: Incident with id:${id} not found`);

      incidents[incidentIndex] = {
        ...incidents[incidentIndex],
        title: title || incidents[incidentIndex].title,
        description: description || incidents[incidentIndex].description,
        severity: severity || incidents[incidentIndex].severity,
        status: status || incidents[incidentIndex].status,
      };
      return incidents[incidentIndex];
    },
    deleteIncident: (_, { id }) => {
      incidents = incidents.filter((incident) => incident.id !== id);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
  await server.start();
  app.use('/graphql', expressMiddleware(server));
  app.listen(4000, () => console.log("Server running at http://localhost:4000/graphql"));
}

startServer();
