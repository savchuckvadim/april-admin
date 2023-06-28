// import { createSelector } from "reselect"
// import { AppStateType } from "../store"

// export const getUsers = (state: AppStateType) => {
//     return state.users.users
// }
// export const getUsersSelector = createSelector(getUsers, (users) => {
//     return users
// })

export const getPageSize = (state:any) => {
    return state.users.pageSize
}

// export const getAuthAppUser = (state: AppStateType) => {
//     return state.auth.authUser
// }

// export const getTotalUsersCount = (state) => {
//     return state.users.totalUsersCount
// }
// export const getPage = (state) => {
//     return state.users.currentPage
// }
// export const getCount = (state) => {
//     return state.users.count
// }

// export const getIsFetching = (state: AppStateType) => {
//     return state.users.isFetching
// }

// export const getIsFollowing = (state: AppStateType):Array<number> => {
//     return state.users.followingInProgress
// }