# Alpha Stream Services

This directory is a monorepo MSA workspace. Each Spring Boot service is built and run independently, while shared event contracts live in `common-contracts`.

## Gradle projects

- `api-service`: order/account-facing HTTP API
- `matching-service`: matching engine worker/API surface
- `realtime-service`: WebSocket/realtime delivery
- `batch-service`: scheduled and batch processing
- `common-contracts`: shared DTO/event contracts only

The physical directories still use the original `module-*` names, but `settings.gradle` maps them to service names.

## Local commands

```bash
./gradlew test
./gradlew :api-service:bootJar
./gradlew :matching-service:bootJar
./gradlew :realtime-service:bootJar
./gradlew :batch-service:bootJar
docker compose up --build
```

Gateway routes:

- `http://localhost:8088/api/**` -> `api-service`
- `ws://localhost:8088/ws/**` -> `realtime-service`

Direct service ports:

- `api-service`: `8080`
- `matching-service`: `8081`
- `realtime-service`: `8082`
- `batch-service`: `8083`
- ClickHouse HTTP: `8123`
- ClickHouse native: `9000`
