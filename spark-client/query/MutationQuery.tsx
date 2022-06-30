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
    $post_content: String!
    $user_id: Int
    $hashtags: [String]
    $images: [String]
    $access_token: String
  ) {
    createPost(
      title: $title
      post_content: $post_content
      user_id: $user_id
      hashtags: $hashtags
      images: $images
      access_token: $access_token
    )
  }
`;

