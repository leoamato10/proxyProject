export function ExampleProvidedComponent({url}: {url: string}) {
    return (
      <CachedRequestsProvider maxResultsPerPage={10} url={url}>
        <HeroesList />
      </CachedRequestsProvider>
    );
  }
  