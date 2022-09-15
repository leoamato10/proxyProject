import { ApisauceInstance } from "apisauce";

    type MarvelHeroesListResponse = {
    //TODO: tipar las respuestas de API para listado de héroes
  };
  
  type MarvelHeroComicsListResponse = {
    //TODO: tipar las respuestas de API para listado de cómics de un héroe
  };
  
  export type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;
  
  type MarvelHeroData = Array<{}>; //TODO tipar los datos de héroes
  type MarvelComicData = Array<{}>; //TODO: tipar los datos de cómics
  export type MarvelData = MarvelHeroData | MarvelComicData;
  
  export type ContextStateUninitialized = {
    url?: undefined;
    isFetching: false;
    data?: undefined;
  };
  
  type ContextStateInitialized = {
    url: string;
    isFetching: false;
    data?: undefined;
  };
  
  type ContextStateFetching<T> = {
    url: string;
    isFetching: true;
    data?: T;
  };
  
  export type ContextStateFetched<T> = {
    url: string;
    isFetching: false;
    data: T;
    apisauceInstance: ApisauceInstance;
  };
  
  export type ApiRequestContextState<T> =
    | ContextStateUninitialized
    | ContextStateInitialized
    | ContextStateFetching<T>
    | ContextStateFetched<T>;
  
  