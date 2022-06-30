import { gql } from "@apollo/client";

export const ALL_POST = gql`
  query GetPosts {
    getPosts {
      id
      title
      post_content
      user_id
      created_at
      hashtags {
        id
        hashtag
      }
      likes {
        post_id
        user_id
        id
      }
      images {
        id
        image_path
        post_id
      }
      writer {
        id
        nickname
      }
      comments {
        post_id
        user_id
        id
        comment
        writer {
          id
          nickname
          email
          password
          account
          balance
          private_key
          created_at
          updated_at
          posts {
            id
            title
            post_content
            user_id
            created_at
            hashtags {
              id
              hashtag
            }
            writer {
              nickname
            }
            likes {
              post_id
              user_id
              id
            }
            images {
              id
              image_path
              post_id
            }
          }
        }
      }
    }
  }
`;

export const ALL_POST_BY_HASHTAG = gql`
  query GetPostsByHashtag($hashtagId: Int) {
    getPostsByHashtag(hashtag_id: $hashtagId) {
      id
      title
      post_content
      user_id
      created_at
      hashtags {
        id
        hashtag
      }
      likes {
        id
        user_id
        post_id
      }
      comments {
        post_id
        user_id
        comment
        id
        writer {
          nickname
          created_at
          updated_at
        }
      }
      images {
        id
        image_path
        post_id
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($post_id: Int!) {
    getPost(post_id: $post_id) {
      id
      title
      post_content
      user_id
      created_at
      hashtags {
        hashtag
      }
      comments {
        post_id
        user_id
        comment
      }
      writer {
        nickname
      }
      likes {
        post_id
        user_id
      }
      images {
        image_path
      }
    }
  }
`;

export const USER_INFO = gql`
  query GetUserInfo($userId: Int, $accessToken: String) {
    getUserInfo(user_id: $userId, access_token: $accessToken) {
      id
      nickname
      email
      password
      account
      balance
      posts {
        title
        id
        post_content
        user_id
        created_at
        hashtags {
          id
          hashtag
        }
        comments {
          post_id
          user_id
          comment
          id
          writer {
            nickname
            id
          }
        }
        likes {
          id
          post_id
          user_id
        }
        writer {
          nickname
        }
        images {
          image_path
        }
      }
    }
  }
`;
