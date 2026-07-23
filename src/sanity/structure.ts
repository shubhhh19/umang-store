import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Store')
    .items([S.documentTypeListItem('product').title('Products')])
