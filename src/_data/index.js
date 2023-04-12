const {
  formatRelativeTime,
} = require("../_11ty/utils/format-relative-time.cjs");

module.exports = async function ({ directus }) {
  const response = await directus.items("articles").readByQuery({
    fields: ["*", "user_created.avatar", "user_created.first_name", "user_created.last_name"],
    sort: "-date_published",
  });
  const formattedArticles = response.data.map((article) => {
    return {
      ...article,
      date_published: formatRelativeTime(new Date(article.date_published)),
    };
  });
  const [hero, ...articles] = formattedArticles;
  return { hero, articles };
};
