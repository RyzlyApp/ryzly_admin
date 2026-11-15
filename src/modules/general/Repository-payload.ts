export interface RepositoryPayload<B, P> {
  body: B | undefined | null;
  params: P | undefined | null;
}
