import { StateCreator } from 'zustand'
import { UserRead } from '../api/client'
import { api } from '../api'
import {
  OrganizationSchema,
  RepositorySchema,
  CancelablePromise,
} from '../api/client'

export interface UserState {
  authenticated: boolean
  currentUser: UserRead | undefined
  login: (
    callback?: (authenticated: boolean) => void,
  ) => CancelablePromise<UserRead>
  logout: (
    callback?: (authenticated: boolean) => void,
  ) => CancelablePromise<any>
}

export interface ContextState {
  currentOrg: OrganizationSchema | undefined
  currentRepo: RepositorySchema | undefined
  setCurrentOrg: (org: OrganizationSchema) => void
  setCurrentRepo: (repo: RepositorySchema) => void
  setCurrentOrgRepo: (org: OrganizationSchema, repo: RepositorySchema) => void
}

export interface UserContextState extends UserState, ContextState {}

export const createUserContextSlice: StateCreator<UserContextState> = (
  set,
  get,
) => ({
  authenticated: false,
  currentUser: undefined,
  currentOrg: undefined,
  currentRepo: undefined,
  login: (
    callback?: (authenticated: boolean) => void,
  ): CancelablePromise<UserRead> => {
    const request = api.users.getAuthenticated()
    request
      .then((user) => {
        set({ authenticated: true, currentUser: user })
      })
      .catch((err) => {
        set({ authenticated: false, currentUser: undefined })
      })
      .finally(() => {
        if (callback) {
          callback(get().authenticated)
        }
      })
    return request
  },
  logout: (): CancelablePromise<any> => {
    const request = api.users.logout()
    request.finally(() => {
      set({ authenticated: false, currentUser: undefined })
    })
    return request
  },
  setCurrentOrg: (org: OrganizationSchema) => {
    set({ currentOrg: org })
  },
  setCurrentRepo: (repo: RepositorySchema) => {
    set({ currentRepo: repo })
  },
  setCurrentOrgRepo: (org: OrganizationSchema, repo: RepositorySchema) => {
    set({ currentOrg: org, currentRepo: repo })
  },
})
