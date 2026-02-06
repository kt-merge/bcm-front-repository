# 🐔 Blind Chicken Market – Frontend (User)

익명 기반 중고 경매 거래 플랫폼 **Blind Chicken Market**의  
**회원용 프론트엔드 웹 애플리케이션**입니다.

사용자는 익명으로 상품을 등록하고, 경매에 참여하거나 즉시 구매할 수 있습니다.

---

## 🚀 프로젝트 개요

| 항목       | 내용                                      |
| ---------- | ----------------------------------------- |
| 프로젝트명 | Blind Chicken Market                      |
| 파트       | Frontend (User Web)                       |
| 목적       | 중고 거래 · 경매 UI/UX 구현               |
| 개발 기간  | 2025.10.31 ~ 2026.01.02                   |
| 배포 주소  | [(링크)](https://bcm.u-jinlee1029.store/) |

---

## 🧩 주요 기능

- 회원가입 / 로그인 (NextAuth)
- 상품 목록 조회
- 상품 상세 페이지
- 상품 등록
- 입찰(경매) UI
- 실시간 경매 상태 표시
- 반응형 UI (PC / Mobile)

---

## 🧱 기술 스택

| 구분          | 기술                    |
| ------------- | ----------------------- |
| Framework     | Next.js (App Router)    |
| Language      | TypeScript              |
| Styling       | Tailwind CSS, shadcn/ui |
| Data Fetching | Axios                   |

---

## 📂 프로젝트 구조

```
bcm-front-repository/
├── src/
│   ├── app/                          # Next.js App Router 페이지
│   │   ├── api/
│   │   │   └── payments/
│   │   │       └── confirm/
│   │   │           └── route.ts      # 토스페이먼츠 결제 승인 API
│   │   ├── globals.css               # 글로벌 스타일
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   ├── page.tsx                  # 홈 페이지
│   │   ├── login/
│   │   │   └── page.tsx              # 로그인 페이지
│   │   ├── signup/
│   │   │   └── page.tsx              # 회원가입 페이지
│   │   ├── reset-password/
│   │   │   └── page.tsx              # 비밀번호 초기화 페이지
│   │   ├── mypage/
│   │   │   └── page.tsx              # 마이페이지 (구매/판매 내역)
│   │   ├── products/
│   │   │   ├── page.tsx              # 상품 목록 페이지
│   │   │   ├── create/
│   │   │   │   └── page.tsx          # 상품 등록 페이지
│   │   │   └── [id]/
│   │   │       └── page.tsx          # 상품 상세 페이지
│   │   └── payment/
│   │       ├── page.tsx              # 결제 페이지
│   │       ├── [orderId]/
│   │       │   └── page.tsx          # 주문별 결제 페이지
│   │       ├── success/
│   │       │   └── page.tsx          # 결제 성공 페이지
│   │       └── fail/
│   │           └── page.tsx          # 결제 실패 페이지
│   │
│   ├── components/                   # 재사용 가능한 UI 컴포넌트
│   │   ├── common/
│   │   │   ├── Navigation.tsx        # 네비게이션 바
│   │   │   ├── HeaderSearch.tsx      # 검색 바
│   │   │   ├── SearchModal.tsx       # 검색 모달
│   │   │   ├── ClientBottomNav.tsx   # 모바일 하단 네비게이션
│   │   │   └── MobileBottomNav.tsx   # 모바일 네비게이션
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # 홈 히어로 섹션
│   │   │   ├── ProductsHeader.tsx    # 상품 섹션 헤더
│   │   │   ├── ProductsGrid.tsx      # 상품 그리드 (정적)
│   │   │   ├── InfiniteProductsGrid.tsx  # 무한 스크롤 상품 그리드
│   │   │   └── Pagination.tsx        # 페이지네이션
│   │   ├── product/
│   │   │   ├── ProductCard.tsx       # 상품 카드
│   │   │   ├── ProductCardSkeleton.tsx   # 상품 카드 스켈레톤
│   │   │   ├── ProductDetailSkeleton.tsx # 상품 상세 스켈레톤
│   │   │   ├── ProductImageGallery.tsx   # 상품 이미지 갤러리
│   │   │   ├── ProductPhotosSection.tsx  # 상품 사진 섹션
│   │   │   ├── ProductBidForm.tsx    # 입찰 폼
│   │   │   └── ProductBidHistory.tsx # 입찰 내역
│   │   ├── payment/
│   │   │   ├── PaymentWidget.tsx     # 토스페이먼츠 결제 위젯
│   │   │   ├── PaymentSummary.tsx    # 결제 요약
│   │   │   ├── ShippingForm.tsx      # 배송 정보 입력 폼
│   │   │   ├── AddressSearch.tsx     # 주소 검색
│   │   │   └── OrderSkeleton.tsx     # 주문 정보 스켈레톤
│   │   ├── mypage/
│   │   │   ├── SidebarMenu.tsx       # 마이페이지 사이드바
│   │   │   ├── ProfileSection.tsx    # 프로필 섹션
│   │   │   ├── PurchaseHistorySection.tsx # 구매 내역 섹션
│   │   │   ├── SalesHistorySection.tsx    # 판매 내역 섹션
│   │   │   └── ProductListItem.tsx   # 상품 리스트 아이템
│   │   ├── user/
│   │   │   ├── FormInput.tsx         # 입력 폼
│   │   │   ├── SignupForm.tsx        # 회원가입 폼
│   │   │   └── TermsCheckbox.tsx     # 약관 동의 체크박스
│   │   └── ui/                       # shadcn/ui 기본 컴포넌트
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── skeleton.tsx
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useCategories.ts          # 카테고리 조회
│   │   ├── useCreateProductForm.ts   # 상품 등록 폼
│   │   ├── useInfiniteProducts.ts    # 무한 스크롤 상품 조회
│   │   ├── useProductDetail.ts       # 상품 상세 조회
│   │   ├── useProducts.ts            # 상품 목록 조회
│   │   ├── payment/
│   │   │   ├── usePaymentCalculation.ts  # 결제 금액 계산
│   │   │   ├── usePaymentOrder.ts    # 주문 정보 조회
│   │   │   └── useTossPayments.ts    # 토스페이먼츠 통합
│   │   └── user/
│   │       ├── useAuth.tsx           # 인증 상태 관리
│   │       ├── useLoginForm.ts       # 로그인 폼
│   │       ├── useMe.ts              # 현재 사용자 정보
│   │       ├── useProductHistory.ts  # 상품 거래 내역
│   │       ├── useSignupForm.ts      # 회원가입 폼
│   │       └── useUserProfile.ts     # 사용자 프로필
│   │
│   ├── lib/                          # 유틸리티, API, 설정
│   │   ├── api.ts                    # Axios API 클라이언트
│   │   ├── constants.ts              # 상수 정의
│   │   ├── errors.ts                 # 에러 처리
│   │   └── utils.ts                  # 유틸리티 함수
│   │
│   ├── types/                        # TypeScript 타입 정의
│   │   ├── index.ts                  # 타입 export
│   │   ├── auth.ts                   # 인증 관련 타입
│   │   ├── common.ts                 # 공통 타입
│   │   ├── error.ts                  # 에러 타입
│   │   ├── order.ts                  # 주문 타입
│   │   ├── payment.ts                # 결제 타입
│   │   └── product.ts                # 상품 타입
│   │
│   └── mocks/
│       └── products.json             # 목 데이터
│
├── public/                           # 정적 자산 (이미지, 폰트 등)
│
├── components.json                   # shadcn/ui 설정
├── next.config.ts                    # Next.js 설정
├── tsconfig.json                     # TypeScript 설정
├── tailwind.config.ts                # Tailwind CSS 설정
├── postcss.config.mjs                # PostCSS 설정
├── eslint.config.mjs                 # ESLint 설정
├── .env                              # 환경 변수
├── .env.example                      # 환경 변수 예시
├── package.json                      # 프로젝트 의존성
├── package-lock.json                 # 의존성 lock 파일
├── Dockerfile                        # Docker 이미지 빌드
├── README.md                         # 프로젝트 설명서
└── .gitignore
```

---

## ⚙️ 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/kt-merge/bcm-front-repository

# 2. 패키지 설치
npm install

# 3. 환경 변수 설정 (.env)
NEXT_PUBLIC_API_URL=http://localhost:8080 #https://bcm.u-jinlee1029.store

# 토스페이먼츠 시크릿 키
NEXT_PUBLIC_TOSS_CLIENT_KEY=
TOSS_SECRET_KEY=

# 5. 개발 서버 실행
npm run dev
```

---
## 🛡️ 트러블슈팅

### 1) URL 직접 입력을 통한 비인가 접근(IDOR) 방지

**문제 상황**  
결제 페이지가 `/payment/{orderId}` 형태의 URL 구조였기 때문에, 주소창에서 주문 ID만 변경해도 페이지 접근이 가능했다. UI에서는 버튼을 통한 이동만 제공했지만 실제 접근 제어는 이루어지지 않고 있었다.

**리스크 판단**  
- 타인의 주문 정보 조회 가능  
- 의도치 않은 대납 발생 가능  
- 프론트엔드 화면 제어만으로는 보안 요구사항 충족 불가  

**해결 방식**  
- 페이지 진입 시 주문 정보 조회 API를 반드시 호출하도록 구조 변경  
- 서버에서 요청 사용자와 주문 소유자가 다를 경우 `403 Forbidden` 반환  
- 프론트엔드에서 403 응답 감지 시 경고 메시지 표시 후 메인 페이지로 리다이렉트  

**결과**  
URL 직접 입력을 통한 비인가 접근을 차단하고, 비정상 접근 상황에서도 사용자 경험이 자연스럽게 유지되도록 개선했다.

---

### 2) 종료된 상품에서 웹소켓 메시지 수신 지속 문제

**문제 상황**  
경매 종료 이후에도 STOMP 구독이 유지되어 불필요한 실시간 메시지가 계속 수신되었고, 페이지 재진입 시 동일 메시지가 중복 수신되는 문제가 발생했다.

**원인 분석**  
- 경매 상태 변경 시 기존 구독 해제 로직 누락  
- 컴포넌트 언마운트 시 소켓 정리 처리 미흡  

**해결 방식**  
- 경매 상태가 `CLOSED`로 변경되면 즉시 `unsubscribe()` 호출  
- 실시간 기능이 더 이상 필요 없는 경우 STOMP `deactivate()` 실행  
- `useEffect` cleanup에서 구독 해제 및 연결 종료 보장  
- 재진입 시 기존 구독이 재사용되지 않도록 구조 수정  

**결과**  
불필요한 네트워크 트래픽과 중복 렌더링을 제거하고, 실시간 기능의 안정성을 개선했다.

---

### 3) 액세스 토큰 / 리프레시 토큰 저장 방식 설계

**설계 배경**  
보안(XSS, CSRF), 새로고침 및 탭 이동 시 인증 유지, 구현 복잡도 사이의 균형을 맞추는 것이 핵심 과제였다.

**최종 구조**

| 토큰 | 저장 위치 | 이유 |
|---|---|---|
| Access Token | 메모리(전역 상태) | 저장소 노출 최소화 |
| Refresh Token | httpOnly + Secure + SameSite 쿠키 | XSS 공격 방어 |

**주요 설계 포인트**  
- 페이지 로드 시 액세스 토큰이 없거나 만료된 경우 Silent Refresh 수행  
- 다중 API 요청 상황에서 중복 갱신을 방지하기 위해 토큰 갱신 요청 큐잉 처리  
- Refresh Token 사용 시마다 새로운 토큰을 발급하고 기존 토큰 즉시 무효화(Token Rotation)  
- 로그아웃 시 서버에서 Refresh Token 폐기 및 클라이언트 인증 상태 초기화  

**개선 전/후 (설계/권장 사항)**
- 기존: Access Token을 `localStorage`에 저장
- 권장(설계): Access Token은 메모리(전역 상태)로 보관하고, Refresh Token은 httpOnly + Secure + SameSite 쿠키로 분리하여 보안 강화

**참고**: 시간 관계상 레포지토리 내 실제 코드 변경(예: localStorage → 메모리 전환, Auth 초기화에서의 reissue 호출 등)은 이번 작업에 포함되지 않았습니다.

---

### 4) 정렬 방식 마이그레이션 (클라이언트 → 서버)

**전환 배경**  
초기에는 클라이언트에서 정렬을 수행했으나, 페이징·검색과 결합되면서 전체 데이터 기준의 정렬 일관성이 깨지는 문제가 발생했다.

**문제점**  
- 클라이언트 정렬과 서버 페이징 간 기준 불일치  
- 클라이언트 키와 서버 필드명 불일치  
- 동일 값 다수 존재 시 정렬 안정성 차이  
- 한글 및 대소문자 정렬 기준 차이  

**마이그레이션 과정**  
1. 정렬 API 계약 정리 (`sort`, `order` 파라미터 명세화)  
2. DB `ORDER BY` 기반 서버 정렬 구현  
3. 클라이언트 정렬 로직 제거 후 API 쿼리 파라미터 방식으로 전환  
4. 클라이언트-서버 필드 매핑 정리  
5. 정렬과 페이징을 포함한 통합 테스트 수행  
6. 데이터 타입별 정렬 정책 정리  
7. 캐시 키에 정렬 및 페이징 파라미터 포함  

**결과**  
정렬 기준을 서버 단일 기준으로 통합하고, 클라이언트 로직을 단순화하여 대용량 데이터 환경에서도 확장 가능한 구조를 확보했다.

---

## 🧹 Code Style

- Formatter: Prettier
- Linter: ESLint
- TypeScript strict mode 사용
- 컴포넌트 단위 책임 분리

---

## 🔖 참고 자료

- Tailwind CSS 설치 및 클래스
  https://tailwindcss.com/docs/installation/using-vite
- Shadcn/ui
  https://ui.shadcn.com/docs/installation/next

---

## 📷 화면 캡처

<img width="632" height="787" alt="1" src="https://github.com/user-attachments/assets/02899703-cfc4-4fcd-9cdc-54ee134cc04e" />
<img width="619" height="565" alt="6" src="https://github.com/user-attachments/assets/f1ef9ff6-bc2f-4b55-b9e9-10726078c859" />
<img width="613" height="484" alt="2" src="https://github.com/user-attachments/assets/5d7cb577-45cd-459c-bea6-7383ae03d736" />
<img width="615" height="868" alt="3" src="https://github.com/user-attachments/assets/4147db85-0f58-459a-890f-a7df8dd0246c" />
<img width="621" height="646" alt="4" src="https://github.com/user-attachments/assets/e7f45d1c-677d-4ba0-8eea-b6c0eff7378e" />
<img width="621" height="432" alt="5" src="https://github.com/user-attachments/assets/fa38e807-d452-43b4-9a76-d4cad04ce75a" />

## 📷 시연 영상

https://www.youtube.com/watch?v=dM07anPjfsk
