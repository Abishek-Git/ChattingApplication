# Chatter — Real-time 1:1 Chat Application

A full-stack one-to-one messaging app. Users sign in, see everyone else on the
platform, open a conversation, and exchange messages that are persisted on the
server.

- **Frontend:** Angular 13 (Bootstrap 5, Font Awesome)
- **Backend:** Spring Boot 2.7 (Spring MVC + Spring Data JPA / Hibernate)
- **Database:** H2 in-memory (zero setup — seeded on startup)

---

## Features

- Email/password login with per-request validation (`401` on bad credentials)
- Home "People" directory with avatar initials (you are tagged with a **You** badge)
- 1:1 conversations with a live sidebar of everyone you can chat with
- Sent / received message bubbles with timestamps
- Messages persisted server-side and reloaded per conversation
- CORS enabled so the Angular dev server can call the API directly

---

## Tech stack

| Layer     | Technology                                                        |
|-----------|-------------------------------------------------------------------|
| Frontend  | Angular 13, TypeScript, Bootstrap 5, jQuery, ng2-order-pipe       |
| Backend   | Spring Boot 2.7.18, Spring Web, Spring Data JPA, Hibernate 5.6    |
| Database  | H2 (in-memory, `jdbc:h2:mem:chatter`)                             |
| Build     | Maven (backend), Angular CLI / npm (frontend)                    |
| Runtime   | Java 17, Node.js 16+                                              |

---

## Project structure

```
ChattingApplication/
├── Angular/
│   └── chatbox/                  # Angular 13 frontend
│       └── src/app/
│           ├── login/            # Login page
│           ├── chatpage/         # Conversation view
│           ├── services/         # user.service.ts, message.service.ts
│           └── entity/           # User, Message models
└── spring/
    └── chatbox/
        └── chatter/              # Spring Boot backend
            └── src/main/
                ├── java/chatter/
                │   ├── ChatterApplication.java   # Boot entry point
                │   ├── controller/               # REST controllers
                │   ├── service/                  # Service layer
                │   ├── dao/                      # Hibernate DAOs
                │   └── entity/                   # User, Message JPA entities
                └── resources/
                    ├── application.properties    # Port, H2, JPA config
                    └── data.sql                  # Seed users
```

---

## Prerequisites

- **Java 17+** and **Maven 3.6+**
- **Node.js 16+** and **npm**

---

## Getting started

### 1. Backend (Spring Boot, port 8080)

```powershell
cd spring/chatbox/chatter
mvn spring-boot:run
```

Or build and run the jar:

```powershell
mvn -DskipTests package
java -jar target/chatter.jar
```

The API is served at **http://localhost:8080/chatter**. On startup Hibernate
creates the schema in H2 and `data.sql` seeds the demo users.

### 2. Frontend (Angular, port 4200)

```powershell
cd Angular/chatbox
npm install
npm start
```

Then open **http://localhost:4200**.

> **Node 17+ note:** Angular 13's build pipeline needs the legacy OpenSSL
> provider on newer Node versions. If `npm start` fails with
> `ERR_OSSL_EVP_UNSUPPORTED`, run it like this:
>
> ```powershell
> $env:NODE_OPTIONS='--openssl-legacy-provider'; npm start
> ```

---

## Demo accounts

| Name          | Email                       | Password   |
|---------------|-----------------------------|------------|
| Sarah Chen    | `sarah.chen@chatter.com`    | `sarah123` |
| James Miller  | `james.miller@chatter.com`  | `james123` |
| Priya Nair    | `priya.nair@chatter.com`    | `priya123` |
| David Okafor  | `david.okafor@chatter.com`  | `david123` |

Sign in as two different users (e.g. in two browsers) to chat between them.

---

## REST API

Base URL: `http://localhost:8080/chatter`

| Method | Endpoint                                   | Description                          |
|--------|--------------------------------------------|--------------------------------------|
| PUT    | `/login`                                   | Authenticate (body: `{email,password}`) |
| GET    | `/allusers`                                | List all users                       |
| GET    | `/userbyid/{id}`                           | Get a user by id                     |
| POST   | `/setmessage`                              | Send a message (body: `Message`)     |
| GET    | `/msgbysenderid/{userId}/{receiverId}`     | Messages from sender to receiver     |
| GET    | `/msgbyreceiverid/{userId}/{receiverId}`   | Messages from receiver to sender     |

---

## Configuration

Backend settings live in
[`application.properties`](spring/chatbox/chatter/src/main/resources/application.properties):

- `server.port=8080`, `server.servlet.context-path=/chatter`
- H2 in-memory datasource with `ddl-auto=update`
- Database credentials are read from the `DB_USERNAME` / `DB_PASSWORD` environment
  variables (defaulting to `sa` / empty for local H2), so no real password is
  hard-coded in the repo
- H2 console enabled at **http://localhost:8080/chatter/h2-console**
  (JDBC URL `jdbc:h2:mem:chatter`, user `sa`, empty password)

To use a persistent database instead, set `DB_USERNAME` / `DB_PASSWORD` and change
`spring.datasource.url` and the dialect in `application.properties`.

### npm registry note

If `registry.npmjs.org` is blocked on your network (e.g. behind a corporate
proxy or web gateway), copy the template and point npm at an allowed mirror or
your internal registry. The real `.npmrc` is **gitignored** so environment-specific
settings and any auth tokens are never committed:

```powershell
cd Angular/chatbox
copy .npmrc.example .npmrc   # then edit the registry line
```

Example `.npmrc`:

```
registry=https://registry.npmmirror.com/
legacy-peer-deps=true
```

## Security notes

- **Passwords are never returned by the API.** `User.password` is annotated
  `@JsonProperty(access = WRITE_ONLY)`, so it is accepted on login requests but
  omitted from every JSON response (and therefore never stored in the browser).
- **No secrets in source control.** Database credentials come from `DB_USERNAME` /
  `DB_PASSWORD` env vars, and `.gitignore` excludes build output (`target/`,
  `dist/`, `node_modules/`, `.angular/`), IDE files, `.env*`, and `.npmrc`.
- The seed credentials in `data.sql` are **demo-only** values for the throwaway
  in-memory database. For production, store password hashes (e.g. BCrypt) rather
  than plain text and verify them during login.

---

## How it works

1. **Login** — the frontend `PUT /login`s the credentials; on success the user
   object is stored in `sessionStorage` and drives the signed-in state.
2. **People** — the home page lists all users (from `GET /allusers`), excluding
   yourself, each with a **Chat** action.
3. **Conversation** — opening a chat loads the other user and merges the two
   message directions (sent + received) ordered by time.
4. **Sending** — `POST /setmessage` persists the message; the conversation then
   refreshes in place.

---

## License

This project is provided as-is for learning and demonstration purposes.
