FROM maven:3.8.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:18-jdk-alpine
COPY --from=builder /app/target/*.jar app.jar
CMD ["java", "-jar", "/app.jar"]