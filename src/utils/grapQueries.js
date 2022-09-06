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
  all_books_banner(locale: $locale)  {
    items {
      title
      content_block {
        ... on BooksBannerContentBlockMedia {
          __typename
          media {
            for_the_media
            information {
              json
            }
          }
        }
        ... on BooksBannerContentBlockBooksBanner {
          __typename
          books_banner {
            main_title
            group {
              title_of_book
              description_of_book {
                json
              }
              learn_more {
                title
              }
              picture_of_bookConnection {
                edges {
                  node {
                    filename
                    url
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;