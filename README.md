# 🐔 Blind Chicken Market – Frontend (User)

익명 기반 중고 경매 거래 플랫폼 **Blind Chicken Market**의  
**회원용 프론트엔드 웹 애플리케이션**입니다.

사용자는 익명으로 상품을 등록하고, 경매에 참여하거나 즉시 구매할 수 있습니다.

---

## 🚀 프로젝트 개요

| 항목       | 내용                        |
| ---------- | --------------------------- |
| 프로젝트명 | Blind Chicken Market        |
| 파트       | Frontend (User Web)         |
| 목적       | 중고 거래 · 경매 UI/UX 구현 |
| 개발 기간  | 2025.10.31 ~ 2026.01.02     |
| 배포 주소  | (추후 추가)                 | 

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
  
