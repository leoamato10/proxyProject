import { createContext, useContext } from "react";
import { ApiRequestContextState, ContextStateUninitialized, MarvelData } from "../Types/Types";


interface IActions {
    paginate(): void;
}
  
const initialState = {
    isFetching: false,
  };

export const ApiRequestContext = createContext<[ApiRequestContextState<MarvelData>, IActions]>
    ([initialState as ContextStateUninitialized, { paginate: () => undefined }]);

export const useCachedRequests = (): [
    ApiRequestContextState<MarvelData>,
    IActions,
  ] => {
    return useContext(ApiRequestContext);
  };