import { useState } from "react";

export function CachedRequestsProvider({
    children,
    url,
    maxResultsPerPage,
  }: Props) {
    const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
      isFetching: false,
      url,
    } as ContextStateInitialized);
  
    const [page, setPage] = useState(0);
  
    const getNavigatableUrl = useCallback((): string => {
      const newUrl = new URL(url);
      Object.entries({
        ...getAuthQueryStringParams(),
        ...getPaginationQueryStringParams(maxResultsPerPage, page),
      }).forEach((param) => {
        newUrl.searchParams.append(param[0], param[1]);
      });
      return newUrl.toString();
    }, [page, state]);
  
    useEffect(() => {
      if (state.isFetching || !state.url) {
        return;
      }
  
      setState(
        state.url !== url
          ? {
              isFetching: true,
              url,
            }
          : {
              ...state,
              isFetching: true,
            },
      );
  
      marvelProxy[getNavigatableUrl()].then((value) => {
        setState({
          ...state,
          isFetching: false,
          data: {
            ...(state.data ?? {}),
            [url]: value,
          },
        } as ContextStateFetched<MarvelData>);
      });
    }, [page, url]);
  
    return (
      <ApiRequestContext.Provider
        value={[
          state,
          {
           paginate() {
               
           },
          },
        ]}>
        {children}
      </ApiRequestContext.Provider>
    );
  }