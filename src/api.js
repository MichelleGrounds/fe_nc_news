import axios from "axios";

const baseUrl = "https://nc-news-api-michelle.herokuapp.com/api";

export const deleteCommentById = comment_id => {
  return axios.delete(`${baseUrl}/comments/${comment_id}`);
};

export const requestSingleUsers = username => {
  return axios.get(`${baseUrl}/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const requestUsers = () => {
  return axios.get(`${baseUrl}/users`).then(({ data }) => {
    return data.users;
  });
};

export const patchCommentVotes = (comment_id, voteChange) => {
  return axios
    .patch(`${baseUrl}/comments/${comment_id}`, {
      inc_votes: voteChange
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const addComment = (article_id, author, commentBody) => {
  return axios
    .post(`${baseUrl}/articles/${article_id}/comments/`, {
      username: author,
      body: commentBody
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const getArticles = (topic, author, sort_by, order, limit, p) => {
  return axios
    .get(`${baseUrl}/articles`, {
      params: {
        topic,
        author,
        sort_by,
        order,
        limit,
        p
      }
    })
    .then(({ data }) => {
      return data;
    });
};

export const getCommentsByArticleId = (article_id, p) => {
  return axios
    .get(`${baseUrl}/articles/${article_id}/comments`, {
      params: { p }
    })
    .then(({ data }) => {
      return data;
    });
};

export const patchArticleVotes = (article_id, vote) => {
  return axios
    .patch(`${baseUrl}/articles/${article_id}`, {
      inc_votes: vote
    })
    .then(({ data }) => {
      return data.article;
    });
};

export const getSingleArticle = article_id => {
  return axios.get(`${baseUrl}/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getTopics = () => {
  return axios.get(`${baseUrl}/topics`).then(({ data }) => {
    return data.topics;
  });
};
