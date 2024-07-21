# 0x02-i18n

This directory contains projects and exercises related to internationalization (i18n) in web applications. Internationalization is the process of designing a software application so that it can be adapted to various languages and regions without engineering changes.

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Description

The projects in this directory focus on implementing internationalization in web applications. This includes translating user interfaces, handling locale settings, and managing multilingual content. The goal is to create applications that can easily switch between different languages and regional settings, providing a better user experience for a global audience.

## Technologies

The projects in this directory use the following technologies:

- **Python**: A versatile programming language used for server-side logic.
- **Flask**: A lightweight web framework for Python, used for building web applications.
- **Flask-Babel**: An extension for Flask that adds i18n and l10n support to Flask applications.
- **JavaScript**: Used for client-side scripting and enhancing user interactions.
- **Jinja2**: A templating engine for Python, used with Flask to generate dynamic HTML content.

## Setup

To get started with the projects in this directory, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/majidied/alx-backend.git
   cd alx-backend/0x02-i18n
   ```

2. Set up a virtual environment and install dependencies:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

## Usage

To run the Flask application with internationalization support:

1. Set the `FLASK_APP` environment variable:

   ```bash
   export FLASK_APP=app.py
   ```

2. Run the Flask application:

   ```bash
   flask run
   ```

3. Open your web browser and navigate to `http://127.0.0.1:5000` to see the application in action.

## Project Structure

- `app.py`: The main Flask application file.
- `templates/`: Directory containing Jinja2 templates for rendering HTML.
- `translations/`: Directory containing translation files for different languages.
- `static/`: Directory containing static files (e.g., CSS, JavaScript).
- `babel.cfg`: Configuration file for Flask-Babel.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

Please ensure your code follows the repository's coding standards and passes any tests.

## License

This directory is part of the `alx-backend` repository and is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more information.
