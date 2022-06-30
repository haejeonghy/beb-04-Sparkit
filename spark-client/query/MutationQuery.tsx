import { gql } from "@apollo/client";


  export const LIKEIT = gql`
    mutation CreateLikes($post_id: Int, $user_id: Int, $access_token: String) {
      createLikes(
        post_id: $post_id
        user_id: $user_id
        access_token: $access_token
      )
    }
  `;

  export const LOGIN = gql`
    mutation Mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        access_token
      }
    }
  `;

  export const SIGN_UP = gql`
    mutation CreateUser($email: String!, $password: String!, $nickname: String!) {
      createUser(email: $email, password: $password, nickname: $nickname)
    }
  `;

  export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $postContent: String!
    $userId: Int
    $hashtags: [String]
    $images: [String]
    $accessToken: String
  ) {
    createPost(
      title: $title
      post_content: $postContent
      user_id: $userId
      hashtags: $hashtags
      images: $images
      access_token: $accessToken
    )
  }
`;


  



