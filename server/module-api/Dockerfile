FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace
COPY . .
RUN chmod +x ./gradlew && ./gradlew :api-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /workspace/module-api/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
