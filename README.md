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

That's it! After the workflow is configured, any push to the `main` branch will trigger the `deploy.yml` workflow, which will build and deploy your site. The site will be available at `https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`.

**Deployment Badge:**

Add this to your `README.md` (replace `<USER>` and `<REPO>` with your GitHub username and repository name):

```markdown
![Deploy to GitHub Pages](https://github.com/<USER>/<REPO>/actions/workflows/deploy.yml/badge.svg)
```

## Design Decision Summary

The application uses p5.js for canvas management and rendering, simplifying drawing operations and providing a structured environment for the animation loop. The grid is implemented sparsely using a JavaScript `Set` to store only the coordinates of black cells, optimizing for potentially large, mostly empty grids. UI interactions are handled through vanilla JavaScript event listeners on standard HTML elements, keeping the interface lightweight. State management is modularized into `ant.js` for the ant's logic and `grid.js` for the grid's state, promoting separation of concerns. Pan and zoom are implemented with direct mouse input manipulation on the p5.js canvas, providing a basic but effective way to navigate the simulation space.

## Preview

(A `preview.gif` will be added to the `/assets/` directory)

---
*MIT License header will be added to each source file.* 