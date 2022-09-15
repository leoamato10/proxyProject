import { CachedRequestsProvider } from "../Context/Provider";
import HeroesList from "./HeroesList";



export function ExampleProvidedComponent({url}: {url: string}) {
    return (
      <CachedRequestsProvider maxResultsPerPage={10} url={url}>
        <HeroesList />
      </CachedRequestsProvider>
    );
  }
  