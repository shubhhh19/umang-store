import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: false so Next.js ISR controls caching via revalidateTag
  useCdn: false,
})
