FROM maven:3.9.9 AS build

WORKDIR /gainz

COPY pom.xml ./
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-alpine

WORKDIR /gainz

# Copy the JAR file built in the previous stage
COPY --from=build /gainz/target/*.jar gainz.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/gainz/gainz.jar"]