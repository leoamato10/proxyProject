    type MarvelHeroesListResponse = {
    //TODO: tipar las respuestas de API para listado de héroes
  };
  
  type MarvelHeroComicsListResponse = {
    //TODO: tipar las respuestas de API para listado de cómics de un héroe
  };
  
  type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;
  
  type MarvelHeroData = Array<{}>; //TODO tipar los datos de héroes
  type MarvelComicData = Array<{}>; //TODO: tipar los datos de cómics
  type MarvelData = MarvelHeroData | MarvelComicData;
  
  type ContextStateUninitialized = {
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
  
  type ContextStateFetched<T> = {
    url: string;
    isFetching: false;
    data: T;
    apisauceInstance: ApisauceInstance;
  };
  
  type ApiRequestContextState<T> =
    | ContextStateUninitialized
    | ContextStateInitialized
    | ContextStateFetching<T>
    | ContextStateFetched<T>;
  
  