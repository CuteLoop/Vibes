# Langton's Ant Web App

A simple, interactive, client-side Langton's Ant simulator built with HTML5, ES2022 JavaScript, and p5.js.

## Local Run Instructions

1.  Clone this repository.
2.  Navigate to the project directory in your terminal.
3.  Serve the files using a simple HTTP server. For example, if you have Node.js installed, you can use `npx serve .` or `npx http-server .`.
4.  Open your browser and go to the local address provided by the server (e.g., `http://localhost:3000` or `http://localhost:8080`).

Alternatively, you can often just open the `index.html` file directly in your browser from your local file system (though using a local server is recommended for full ES module support and to avoid potential browser security restrictions).

## GitHub Pages Deployment

This project includes a GitHub Actions workflow to automatically build and deploy the site to GitHub Pages.

**To enable GitHub Pages:**

1.  Push the code to your `main` branch (or the default branch of your repository).
2.  Go to your repository's **Settings** tab.
3.  In the left sidebar, navigate to **Pages**.
4.  Under **Build and deployment**, for the **Source** option, select **GitHub Actions**.

That's it! After the workflow is configured, any push to the `main` branch will trigger the `deploy.yml` workflow, which will build and deploy your site. The site will be available at `https://CuteLoop.github.io/Vibes/`.

**Deployment Badge:**

Add this to your `README.md` (replace `<USER>` and `<REPO>` with your GitHub username and repository name):

![Deploy to GitHub Pages](https://github.com/CuteLoop/Vibes/actions/workflows/deploy.yml/badge.svg)

Enjoy :)