const lib = require('../node_addon');

window.addEventListener('DOMContentLoaded', () => {
    replaceText('hello-message', lib.HelloMessage('Node.js'));
    document.getElementById('showArticlesButton').addEventListener('click', showArticles);
});

function replaceText (selector, text) {
  const element = document.getElementById(selector)
  if (element) element.innerText = text
}

function showArticles() {
  lib.OpenDatabaseConnection("my-electron.db");
  lib.SetupTestData();
  const users = lib.GetAllUsers().users;
  let articles = lib.GetAllArticles().articles;
  lib.CloseDatabaseConnection();
  for (let article of articles) {
      for (let user of users) {
          if (article.authorId == user.id) article["userName"] = user.name;
      }
  }
  replaceText('articles', 'articles: \n' + JSON.stringify(articles, null, 2));
}