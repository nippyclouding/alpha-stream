# Alpha Stream

Alpha Stream은 React 클라이언트와 Spring Boot 기반 MSA 서버로 구성된 주식 거래/실시간 시세 예제 프로젝트입니다.

## 구조

```text
alpha-stream/
  client/
    alpha-stream/        React + Vite 프론트엔드

  server/                Spring Boot monorepo MSA
    module-api/          api-service
    module-matching/     matching-service
    module-realtime/     realtime-service
    module-batch/        batch-service
    module-common/       common-contracts
    docker-compose.yml
```

서버는 물리 폴더명은 `module-*` 형태지만, Gradle 프로젝트명은 `api-service`, `matching-service`, `realtime-service`, `batch-service`, `common-contracts`로 매핑되어 있습니다.

## 필요 환경

- Java 21
- Docker Desktop
- Node.js 20 이상 권장
- npm

## 전체 실행

### 1. 서버 실행

```bash
cd server
docker compose up --build
```

서버는 Docker Compose로 다음 구성요소를 함께 실행합니다.

- `api-service`: `http://localhost:8080`
- `matching-service`: `http://localhost:8081`
- `realtime-service`: `http://localhost:8082`
- `batch-service`: `http://localhost:8083`
- Gateway: `http://localhost:8088`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
- Kafka: `localhost:9092`
- ClickHouse HTTP: `http://localhost:8123`

Gateway 라우팅:

```text
http://localhost:8088/api/**  -> api-service
ws://localhost:8088/ws/**     -> realtime-service
```

서버를 백그라운드에서 실행하려면:

```bash
cd server
docker compose up --build -d
```

서버를 종료하려면:

```bash
cd server
docker compose down
```

데이터 볼륨까지 삭제하려면:

```bash
cd server
docker compose down -v
```

### 2. 클라이언트 실행

새 터미널에서 실행합니다.

```bash
cd client/alpha-stream
npm install
npm run dev
```

브라우저에서 접속:

```text
http://localhost:3000
```

## 서버만 로컬 Gradle로 검증

Docker를 띄우지 않고 빌드/테스트만 확인하려면:

```bash
cd server
./gradlew test
./gradlew :api-service:bootJar
./gradlew :matching-service:bootJar
./gradlew :realtime-service:bootJar
./gradlew :batch-service:bootJar
```

## 클라이언트만 검증

```bash
cd client/alpha-stream
npm install
npm run lint
npm run build
```

## 참고

클라이언트의 `.env.example`에는 AI Studio/Gemini 관련 예시 변수가 들어 있습니다. 현재 화면 실행만 확인할 때는 기본적으로 별도 환경변수 없이 `npm run dev`로 실행할 수 있습니다.
