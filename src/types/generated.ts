import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Incident = {
  __typename?: 'Incident';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  severity: Severity;
  status: Status;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addIncident: Incident;
  deleteIncident: Scalars['Boolean']['output'];
  updateIncident: Incident;
};


export type MutationAddIncidentArgs = {
  description: Scalars['String']['input'];
  severity: Severity;
  status: Status;
  title: Scalars['String']['input'];
};


export type MutationDeleteIncidentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateIncidentArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  severity?: InputMaybe<Severity>;
  status?: InputMaybe<Status>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getIncidents: Array<Incident>;
};

export enum Severity {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum Status {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type GetIncidentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIncidentsQuery = { __typename?: 'Query', getIncidents: Array<{ __typename?: 'Incident', id: string, title: string, description: string, severity: Severity, status: Status }> };

export type AddIncidentMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  severity: Severity;
  status: Status;
}>;


export type AddIncidentMutation = { __typename?: 'Mutation', addIncident: { __typename?: 'Incident', id: string, title: string, description: string, severity: Severity, status: Status } };

export type UpdateIncidentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  severity?: InputMaybe<Severity>;
  status?: InputMaybe<Status>;
}>;


export type UpdateIncidentMutation = { __typename?: 'Mutation', updateIncident: { __typename?: 'Incident', id: string, title: string, description: string, severity: Severity, status: Status } };

export type DeleteIncidentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteIncidentMutation = { __typename?: 'Mutation', deleteIncident: boolean };


export const GetIncidentsDocument = gql`
    query GetIncidents {
  getIncidents {
    id
    title
    description
    severity
    status
  }
}
    `;

/**
 * __useGetIncidentsQuery__
 *
 * To run a query within a React component, call `useGetIncidentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIncidentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIncidentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIncidentsQuery(baseOptions?: Apollo.QueryHookOptions<GetIncidentsQuery, GetIncidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIncidentsQuery, GetIncidentsQueryVariables>(GetIncidentsDocument, options);
      }
export function useGetIncidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIncidentsQuery, GetIncidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIncidentsQuery, GetIncidentsQueryVariables>(GetIncidentsDocument, options);
        }
export function useGetIncidentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIncidentsQuery, GetIncidentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIncidentsQuery, GetIncidentsQueryVariables>(GetIncidentsDocument, options);
        }
export type GetIncidentsQueryHookResult = ReturnType<typeof useGetIncidentsQuery>;
export type GetIncidentsLazyQueryHookResult = ReturnType<typeof useGetIncidentsLazyQuery>;
export type GetIncidentsSuspenseQueryHookResult = ReturnType<typeof useGetIncidentsSuspenseQuery>;
export type GetIncidentsQueryResult = Apollo.QueryResult<GetIncidentsQuery, GetIncidentsQueryVariables>;
export const AddIncidentDocument = gql`
    mutation AddIncident($title: String!, $description: String!, $severity: Severity!, $status: Status!) {
  addIncident(
    title: $title
    description: $description
    severity: $severity
    status: $status
  ) {
    id
    title
    description
    severity
    status
  }
}
    `;
export type AddIncidentMutationFn = Apollo.MutationFunction<AddIncidentMutation, AddIncidentMutationVariables>;

/**
 * __useAddIncidentMutation__
 *
 * To run a mutation, you first call `useAddIncidentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddIncidentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addIncidentMutation, { data, loading, error }] = useAddIncidentMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      severity: // value for 'severity'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAddIncidentMutation(baseOptions?: Apollo.MutationHookOptions<AddIncidentMutation, AddIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddIncidentMutation, AddIncidentMutationVariables>(AddIncidentDocument, options);
      }
export type AddIncidentMutationHookResult = ReturnType<typeof useAddIncidentMutation>;
export type AddIncidentMutationResult = Apollo.MutationResult<AddIncidentMutation>;
export type AddIncidentMutationOptions = Apollo.BaseMutationOptions<AddIncidentMutation, AddIncidentMutationVariables>;
export const UpdateIncidentDocument = gql`
    mutation UpdateIncident($id: ID!, $title: String, $description: String, $severity: Severity, $status: Status) {
  updateIncident(
    id: $id
    title: $title
    description: $description
    severity: $severity
    status: $status
  ) {
    id
    title
    description
    severity
    status
  }
}
    `;
export type UpdateIncidentMutationFn = Apollo.MutationFunction<UpdateIncidentMutation, UpdateIncidentMutationVariables>;

/**
 * __useUpdateIncidentMutation__
 *
 * To run a mutation, you first call `useUpdateIncidentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIncidentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIncidentMutation, { data, loading, error }] = useUpdateIncidentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      severity: // value for 'severity'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateIncidentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentMutation, UpdateIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentMutation, UpdateIncidentMutationVariables>(UpdateIncidentDocument, options);
      }
export type UpdateIncidentMutationHookResult = ReturnType<typeof useUpdateIncidentMutation>;
export type UpdateIncidentMutationResult = Apollo.MutationResult<UpdateIncidentMutation>;
export type UpdateIncidentMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentMutation, UpdateIncidentMutationVariables>;
export const DeleteIncidentDocument = gql`
    mutation DeleteIncident($id: ID!) {
  deleteIncident(id: $id)
}
    `;
export type DeleteIncidentMutationFn = Apollo.MutationFunction<DeleteIncidentMutation, DeleteIncidentMutationVariables>;

/**
 * __useDeleteIncidentMutation__
 *
 * To run a mutation, you first call `useDeleteIncidentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIncidentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIncidentMutation, { data, loading, error }] = useDeleteIncidentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteIncidentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIncidentMutation, DeleteIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIncidentMutation, DeleteIncidentMutationVariables>(DeleteIncidentDocument, options);
      }
export type DeleteIncidentMutationHookResult = ReturnType<typeof useDeleteIncidentMutation>;
export type DeleteIncidentMutationResult = Apollo.MutationResult<DeleteIncidentMutation>;
export type DeleteIncidentMutationOptions = Apollo.BaseMutationOptions<DeleteIncidentMutation, DeleteIncidentMutationVariables>;