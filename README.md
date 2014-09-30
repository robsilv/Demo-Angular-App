An Angular Boilerplate project, using AngularJS and Bootstrap.

Install & Run:

1. CD to your local copy of the git repo
2. Open a Command Prompt in that folder 
3. npm install
4. npm start
5. http://localhost:8000/


Github has its public RESTful api https://developer.github.com/v3/.
Can you please create a web app which 
1. allow user to input a github user name, and list all of their repositories.
2. If click on the one of the repositories, show the repository details 
1) display the clickable link of the github page
2) Show language used in the repository in a pie chart.
The UI contains at least 3 things:
1. Input box for the username
2. A list of the public repositories of the user
3. The repository detailed view
It can be master-detail view. But no requirement to its design.
Github REST service support JSONP (https://developer.github.com/v3/#json-p-callbacks). So you should be able to get it's data from your web app.