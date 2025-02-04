# Gainz - A Workout Tracking Application

![](https://img.shields.io/badge/version-1.0-blue?style=for-the-badge)
![](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![](https://img.shields.io/github/issues-pr-closed/ry4nwong/WorkoutTracker?style=for-the-badge)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://www.linkedin.com/in/ryanwong20)

<!-- ## Table of Contents

- [Gainz - A Workout Tracking Application](#gainz---a-workout-tracking-application)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation](#installation) -->


## Overview

The Workout Tracker is a comprehensive fitness management tool designed to help users plan, track, and optimize their workout routines.

## Blog Posts
[Building a Spring Boot Application with Maven and MongoDB](https://medium.com/@rnwong2002/building-a-spring-boot-application-with-maven-and-mongodb-integration-fb2247a96aef)

## Built With

- [![Spring Boot](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://docs.spring.io/spring-boot/index.html)
- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
- [![Mongo DB Atlas](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/products/platform/atlas-database)
- [![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/material-ui/)
- [![GraphQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)

## Features

- **User Authentication**
  - User registration and login.
  - Password hashing with Bcrypt for enhanced security.

- **User Profile Management**
  - Update user profile information.
  - Handle user-specific settings and preferences.

- **Workout Management**
  - Create, update, view, and delete workouts.
  - Log individual exercises within a workout.

- **Search and Filter**
  - Search for workouts based on various criteria.
  - Filter workouts by date and volume.

- **API Endpoints**
  - GraphQL API for all CRUD operations on users and workouts.

- **Testing and Debugging**
  - Unit tests for Spring Boot service and controller layers.
  - Full code coverage verified through reports with JaCoCo for code reliability.

- **Progress Tracking**
  - Monitor workout history and progress over time.
  - View summaries of workouts for future reference.

## Getting Started
Follow these steps to set up and run the project locally.

### Prerequisites

1. Ensure you have installed the following on your machine:
   - **Node.js** (v10 or higher): [Download](https://nodejs.org/en/download/prebuilt-installer)
   - **Java** (v17 or higher): [Download](https://www.oracle.com/java/technologies/downloads)
2. Set up a [MongoDB Atlas](https://account.mongodb.com/account/login) project and create a cluster. Copy and save the driver connection string (to be used later).

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/ry4nwong/WorkoutTracker.git
   cd WorkoutTracker
   ```
2. Enter your driver connection string (step 2 of **Prerequisites**) in a file called `.env`.
   ```vim
   DB_URI='YOUR_CONNECTION_STRING'
   ```
3. Start the application
   ```sh
   docker-compose up --build
   ```
4. Access the application at http://localhost:3000

## Contact
Ryan Wong - [LinkedIn](https://www.linkedin.com/in/ryanwong20) - rnwong2002@gmail.com

Project Link: https://github.com/ry4nwong/WorkoutTracker