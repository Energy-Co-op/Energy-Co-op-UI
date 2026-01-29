[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![CC BY-NC-SA 4.0 License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Energy-Co-op/Energy-Co-op-UI">
    <img src="https://www.windcoop.co.uk/wp-content/uploads/go-x/u/14699fc7-4639-4665-9c87-1dbd1f1ef1af/image-160x160.png" alt="Logo" width="160" height="160">
  </a>

<h3 align="center">Energy Co-op UI</h3>

  <p align="center">
    Angular Energy Cooperative management user interface.
    <br />
    <a href="https://github.com/Energy-Co-op/Energy-Co-op-UI"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Energy-Co-op/Energy-Co-op-UI">View Demo</a>
    ·
    <a href="https://github.com/Energy-Co-op/Energy-Co-op-UI/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Energy-Co-op/Energy-Co-op-UI/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Energy Co-op UI Screen Shot](https://github.com/Energy-Co-op/Energy-Co-op-UI/blob/main/public/stats-page-demo.png)](https://github.com/Energy-Co-op/Energy-Co-op-UI)

Energy Co-op UI is intended to be an Angular web application to facilitate the management of users accessing Energy Co-op information. This application is designed to run in conjunction with the [Energy Co-op Server](https://github.com/Energy-Co-op/Energy-Co-op-Server).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Angular][angular]][angular-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node 22+

### Installation and development

1. [Install Node 22+](https://nodejs.org/en/download)
2. Install Angular CLI
```bash
npm install -g @angular/cli
```
3. Clone a fork of this repository
4. Copy the `src/environments/environment.ts` file to `src/environments/environment.development.ts` and update the values as needed.
5. Install dependencies and run the application
```bash
npm ci
```
```bash
npm run start:dev
```
6. Install Playwright
```bash
npx playwright install
```
7. Build and run all tests
```bash
npm run pre-push-check
```

## Development server

To start a local development server, run:

```bash
npm run start:dev
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with Jest, use the following command:

```bash
npm run test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
For more examples, please refer to the [Documentation](https://github.com/Energy-Co-op/Energy-Co-op-UI)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Feel free to check out the repository, use it and modify your own use so long as it's not for commercial purposes.

1. Fork the Project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to your own fork's branch (`git push origin feature/AmazingFeature`)
5. Pull requests against this repository won't be accepted

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Energy-Co-op/Energy-Co-op-UI.svg?style=for-the-badge
[contributors-url]: https://github.com/Energy-Co-op/Energy-Co-op-UI/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/Energy-Co-op/Energy-Co-op-UI.svg?style=for-the-badge
[stars-url]: https://github.com/Energy-Co-op/Energy-Co-op-UI/stargazers
[issues-shield]: https://img.shields.io/github/issues/Energy-Co-op/Energy-Co-op-UI.svg?style=for-the-badge
[issues-url]: https://github.com/Energy-Co-op/Energy-Co-op-UI/issues
[license-shield]: https://img.shields.io/badge/Creative%20Commons-000000?style=for-the-badge&logo=creativecommons&logoColor=white
[license-url]: https://github.com/Energy-Co-op/Energy-Co-op-UI/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
[angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=java&logoColor=white
[angular-url]: https://angular.dev/
