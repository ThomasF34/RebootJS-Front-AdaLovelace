import { IAppState } from "../../appReducer"

export function makeFetchUsers() {
  return (dispatch: any, getState: () => IAppState) => {
    // fetch à l'API
    // si besoin du store : const store = getState();

    // dispatch action redux
    dispatch(updateUsersList())
    //dispatch(retrieveNewUsers)
  }
}