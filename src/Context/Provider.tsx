import * as React from 'react';
import { useCallback, useEffect, useState } from "react";
import { marvelProxy } from './ProxyProvider';
import { ApiRequestContextState, ContextStateFetched, ContextStateUninitialized, MarvelData } from '../Types/Types';
import { ApiRequestContext } from './CacheRequest';


type Props = {
    url: string;
    maxResultsPerPage: number;
    children: JSX.Element;
};
  


function getAuthQueryStringParams(): {
    apikey: string;
    ts: string;
    hash: string;
  } {
  // throw new Error('TODO: devolver los parametros de autenticación');
  return {
    apikey: "da3dce8fa885f5501a0fa544558226e4",
    ts: "1000",
    hash: "da0915aa6b5f67e4354430ea8ca61c72",
  }
  }
  
  function getPaginationQueryStringParams(    maxResults: number,    page: number,
  ): {
    limit: string;
    offset: string;
  } {
    // throw new Error(
    //   `TODO: devolver los parametros de paginación para el listado de héroes con ${maxResults} resultados por página y página ${page}`,
    // );
    return {
      limit: maxResults.toString(),
      offset: page.toString(),
    }
  }


export function CachedRequestsProvider({
    children,
    url,
    maxResultsPerPage,
  }: Props) {
    const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
      isFetching: false,
      url,
    } );
  
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