import {ApisauceInstance, create} from 'apisauce';
import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';


interface IActions {
  paginate(): void;
}

const initialState = {
  isFetching: false,
};

type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any;
  set?(
    target: {results: {[key in P]?: T}},
    p: P,
    value: any,
    receiver: any,
  ): boolean;
};

declare const Proxy: {
  new <T extends object>(
    target: {results: {[key in string]?: T}; apiInstance: ApisauceInstance},
    handler: ProxyHandler<T, string>,
  ): {[key: string]: Promise<T>};
};

const marvelProxy = new Proxy<MarvelResponse>(
  {apiInstance: create({baseURL: 'https://developer.marvel.com'}), results: {}},
  {
    get: function <T extends MarvelResponse>(
      target: {
        results: {
          [key in string]?: T;
        };
      },
      url: string,
    ) {
      const values = target;

      return new Promise<T>(async (resolve, reject) => {
        if (values.results.hasOwnProperty(url)) {
          resolve(values.results[url] as T);
          return;
        }

        try {
          const response = await (target as {
            results: {
              [key in string]?: T;
            };
            apiInstance: ApisauceInstance;
          }).apiInstance.get<T>(url);
          const {data} = response;
          if (response.originalError?.response?.status !== 200 || !data) {
            throw new Error('Error fetching data');
          }

          (target as {
            results: {
              [key in string]?: T;
            };
          }).results[url] = data;

          return data;
        } catch (e) {
          reject(e);
        }
      });
    },
    set: (target, url: string, value) => {
      target.results[url] = value;
      return true;
    },
  },
);

const ApiRequestContext = createContext<[ApiRequestContextState<MarvelData>, IActions]>([initialState as ContextStateUninitialized, {paginate: () => undefined}]);

function getAuthQueryStringParams(): {
  apikey: string;
  ts: string;
  hash: string;
} {
  throw new Error('TODO: devolver los parametros de autenticación');
}

function getPaginationQueryStringParams(
  maxResults: number,
  page: number,
): {
  limit: string;
  offset: string;
} {
  throw new Error(
    `TODO: devolver los parametros de paginación para el listado de héroes con ${maxResults} resultados por página y página ${page}`,
  );
}



export const useCachedRequests = (): [
  ApiRequestContextState<MarvelData>,
  IActions,
] => {
  return useContext(ApiRequestContext);
};



