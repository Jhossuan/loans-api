
# Loans Api

This project was created to practice and reinforce the knowledge in Clean Architecture, Unit Testing using Jest, advanced concept about NestJs and SonarQube.

---

## Set up

You have to follow next steps to execute the code properly

**Step 1**: Install dependencies
```bash
    npm install
```
**Step 2**: Start MongoDD and Redis in a container.
```bash
    docker compose up -d
```

**Step 3**: Run the project
```bash
    npm run start:dev
```

If you want to use the documentation of swagger, you can show them in the next route
```
http://localhost:5000/documentation
```
---



## Running Tests

To run tests, run the following command

```bash
  npm run test
```
---
If you want to check the code and use SonarQube to deep analysis of the code follow the next instructions:

**Step 1**: Run docker compose of sonarqube
```bash
docker compose -f docker-compose.sonarqube.yml
```

**Step 2**:  
Once the docker is ready, you can open the panel of SonarQube in your localhost
```
http://localhost:9001
```
Then you have to login with the default user credentials:  
**username**: admin  
**password**: admin

**Step 3**: Execute code analysis
```bash
  sonar-scanner
```
---
### 🔗 SonarQube Guide followed
[Setting Up and Running SonarQube with Docker Application in Server](https://medium.com/@rithery/setting-up-and-running-sonarqube-with-docker-for-a-nestjs-application-in-server-7dbbdfdb198c)


