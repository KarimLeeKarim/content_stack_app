import { gql } from '@apollo/client';

export const BOOKS = gql`
query MyQuery($offset: Int, $locale: String) {
  all_list_of_books(skip: $offset, limit: 5, locale: $locale)  {
    total
    items {
      url
      title
      system {
        uid
        content_type_uid
      }
      smaller_cover_image_of_bookConnection {
        edges {
          node {
            filename
            file_size
            dimension {
              width
              height
            }
            url
          }
        }
      }
      reference_of_landing_pageConnection {
        edges {
          node {
            ... on LandingPageOfBook {
              title
              url
              author
              number_of_pages
              description {
                json
              }
              system {
                uid
              }
            }
          }
        }
      }
    }
  }
}
`;