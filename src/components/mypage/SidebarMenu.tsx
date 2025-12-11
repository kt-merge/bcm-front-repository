"use client";

export default function SidebarMenu() {
  return (
    <aside className="shrink-0 lg:w-50">
      <div className="sticky top-12">
        <h2 className="text-foreground mb-4 text-lg font-bold">마이 페이지</h2>

        {/* 쇼핑 정보 섹션 */}
        <div className="mb-6">
          <h3 className="text-foreground mb-2 text-sm font-bold">쇼핑 정보</h3>
          <nav className="space-y-1">
            <a
              href="#purchase"
              className="text-foreground hover:bg-muted block rounded-md py-2 text-sm transition-colors"
            >
              구매 내역
            </a>
            <a
              href="#sales"
              className="text-foreground hover:bg-muted block rounded-md py-2 text-sm transition-colors"
            >
              판매 내역
            </a>
          </nav>
        </div>

        {/* 내 정보 섹션 */}
        <div>
          <h3 className="text-foreground mb-2 text-sm font-bold">내 정보</h3>
          <nav className="space-y-1">
            <a
              href="#login-info"
              className="text-foreground hover:bg-muted block rounded-md py-2 text-sm transition-colors"
            >
              로그인 정보
            </a>
            <a
              href="#profile"
              className="text-foreground hover:bg-muted block rounded-md py-2 text-sm transition-colors"
            >
              프로필 관리
            </a>
            <a
              href="#address"
              className="text-foreground hover:bg-muted block rounded-md py-2 text-sm transition-colors"
            >
              주소록
            </a>
            <a
              href="#payment-info"
              className="text-foreground hover:bg-muted block rounded-md py-2 text-sm transition-colors"
            >
              결제 정보
            </a>
          </nav>
        </div>
      </div>
    </aside>
  );
}
