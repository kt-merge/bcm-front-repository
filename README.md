# 🐔 Blind Chicken Market

익명 기반 중고 경매 거래 플랫폼 (Full-Stack Project)

> **Blind Chicken Market**은 사용자가 익명으로 중고 상품을 등록하고, 입찰(경매) 또는 구매할 수 있는 웹 플랫폼입니다.
> 실무형 풀스택 경험을 목표로, 프론트엔드부터 백엔드, 배포까지 모두 구현합니다.

---

## 🚀 프로젝트 개요

| 항목       | 내용                                                |
| ---------- | --------------------------------------------------- |
| 프로젝트명 | Blind Chicken Market                                |
| 주제       | 익명 기반 중고 거래 및 경매 웹사이트                |
| 개발 기간  | 2025.11 ~ 2025.12                                   |
| 목표       | 프론트엔드 + 백엔드 통합 전자상거래 프로토타입 완성 |
| 팀명       | Darius Team                                         |
| 배포 주소  | (추후 추가)                                         |

---

## 🧩 주요 기능

### ✅ 필수 기능

- 반응형 웹 디자인 (PC / 모바일)
- RESTful API 설계 및 구현
- 상품 등록 / 수정 / 삭제 / 조회 (CRUD)
- 사용자 회원가입 및 로그인 (NextAuth)
- Prisma ORM 기반 데이터베이스 연동
- TypeScript를 활용한 타입 안정성 확보

### 💎 추가 기능 (가산점)

- 상품 경매 시스템 (입찰, 남은 시간 표시, 낙찰 처리)
- 실시간 업데이트 (Socket.io or Pusher)
- 사용자 리뷰 및 평점
- 결제 및 주문 처리 (Toss, Stripe 등 연동)
- 관리자 페이지 (상품/회원 관리)
- 다크 모드 지원 / 반응형 디자인 / SEO 최적화

---

## 🧱 기술 스택

| 구분                | 사용 기술                                                  |
| ------------------- | ---------------------------------------------------------- |
| Frontend            | Next.js, TypeScript, Tailwind CSS, shadcn/ui, Axios        |
| Backend             | Spring Boot, STOMP (WebSocket), JPA (Java Persistence API) |
| DB                  | PostgreSQL                                                 |
| Server / Deployment | GitHub Actions, Jenkins, AWS EC2, AWS EKS                  |

---

## 📁 폴더 구조

```
blind-chicken-market/
├─ app/
│  ├─ (routes)/
│  │  ├─ products/
│  │  │  ├─ page.tsx
│  │  │  ├─ [id]/page.tsx
│  │  ├─ auction/
│  │  ├─ auth/
│  │  └─ profile/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ ui/
│  ├─ product/
│  ├─ auction/
│  └─ common/
├─ lib/
│  ├─ prisma.ts
│  ├─ auth.ts
│  └─ utils.ts
├─ prisma/
│  └─ schema.prisma
├─ public/
│  └─ images/
├─ styles/
│  └─ globals.css
└─ package.json
```

---

## 🧮 ERD (예시)

```
User (id, name, email, password, createdAt)
Product (id, title, description, price, image, userId, status)
Bid (id, productId, userId, bidAmount, createdAt)
Order (id, productId, buyerId, sellerId, totalPrice, status)
Review (id, productId, userId, rating, comment)
```

---

## 🪜 개발 목표

- UI/UX 설계 및 반응형 구현
- RESTful API 설계 및 Prisma 기반 DB 구축
- 인증 / 권한 / 세션 관리
- 상품 등록 → 입찰 → 낙찰 → 결제 → 리뷰까지의 흐름 완성
- TypeScript로 안정적 코드베이스 유지

---

## 🧾 문서화

| 항목         | 설명                                 |
| ------------ | ------------------------------------ |
| README       | 프로젝트 개요 및 실행 방법           |
| API 문서     | Postman / Swagger 기반 API 명세      |
| ERD          | DB 관계 구조 (Prisma ERD or Draw.io) |
| 와이어프레임 | v0.dev / Figma 디자인 시안           |
| 시연 영상    | (추후 추가)                          |

---

## ⚙️ 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/{username}/blind-chicken-market.git

# 2. 패키지 설치
npm install

# 3. 환경 변수 설정 (.env)
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"

# 4. 데이터베이스 마이그레이션
npx prisma migrate dev

# 5. 개발 서버 실행
npm run dev
```

---

## 🧑‍💻 팀 정보

| 이름   | 역할            | 담당                    |
| ------ | --------------- | ----------------------- |
| 남경진 | PM / Frontend   | 프론트 설계             |
| 이유진 | Backend         | 백엔드 담당 개발        |
| 정성훈 | Backend         | 서버 구축 및 CI/CD 연결 |
| 최태웅 | Frontend / Docs |                         |

---

## 📜 라이선스

본 프로젝트는 교육용으로 제작되었으며, 상업적 이용을 금합니다.

---
