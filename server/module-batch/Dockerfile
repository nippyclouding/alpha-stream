FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace
COPY . .
RUN chmod +x ./gradlew && ./gradlew :batch-service:bootJar --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /workspace/module-batch/build/libs/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
