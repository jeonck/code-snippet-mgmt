# Code Snippet Manager - 최적 설계 패턴

> 확장성, 유지보수성, 유연성을 고려한 코드 스니펫 관리 앱 설계 가이드

## 📋 목차

1. [전체 아키텍처](#전체-아키텍처)
2. [모듈화 전략](#모듈화-전략)
3. [데이터 관리](#데이터-관리)
4. [UI/UX 패턴](#uiux-패턴)
5. [성능 최적화](#성능-최적화)
6. [확장성 고려사항](#확장성-고려사항)
7. [최적 관행](#최적-관행)

---

## 🏗️ 전체 아키텍처

### 계층별 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
├── data/               # 데이터 레이어
│   └── snippets/       # 카테고리별 스니펫 모듈
├── hooks/              # 커스텀 React 훅
├── utils/              # 유틸리티 함수
└── styles/             # 전역 스타일
```

### 핵심 설계 원칙

1. **관심사 분리**: UI, 데이터, 비즈니스 로직 분리
2. **단일 책임**: 각 모듈은 하나의 명확한 목적
3. **의존성 역전**: 인터페이스 기반 설계
4. **확장성 우선**: 새로운 기능 추가 용이

---

## 🧩 모듈화 전략

### 1. 카테고리별 파일 분리

**✅ 권장 구조:**
```javascript
// data/snippets/
├── index.js          // 중앙 오케스트레이터
├── javascript.js     // JavaScript 스니펫
├── python.js         // Python 스니펫
├── spring-boot.js    // Spring Boot 스니펫
└── [category].js     // 새 카테고리별 파일
```

**장점:**
- 독립적 관리 가능
- 병렬 개발 지원
- 충돌 최소화
- 로딩 성능 최적화

### 2. 동적 import 시스템

```javascript
// 카테고리별 지연 로딩
const categoryImports = {
  javascript: () => import('./javascript.js').then(m => m.javascriptSnippets),
  python: () => import('./python.js').then(m => m.pythonSnippets),
  // 새 카테고리 쉽게 추가 가능
};
```

**이점:**
- 초기 로딩 시간 단축
- 필요시에만 리소스 로드
- 번들 크기 최적화

---

## 📊 데이터 관리

### 1. 자동 ID 생성 시스템

**❌ 피해야 할 방식:**
```javascript
// 수동 ID 관리 (충돌 위험)
{ id: 17, title: "FastAPI", ... }
{ id: 18, title: "Pandas", ... }
```

**✅ 권장 방식:**
```javascript
// 자동 ID 생성
snippets.map((snippet, index) => ({
  ...snippet,
  id: `${category}-${index + 1}`,
  originalId: snippet.id // 필요시 보존
}))
```

**장점:**
- ID 충돌 완전 방지
- 카테고리별 자동 정렬
- 유지보수 부담 제거

### 2. 스니펫 데이터 구조

```javascript
// 표준 스니펫 객체 구조
{
  title: string,           // 필수: 스니펫 제목
  language: string,        // 필수: 프로그래밍 언어
  category: string,        // 필수: 카테고리 분류
  code: string,           // 필수: 코드 내용
  tags: string[],         // 필수: 검색용 태그
  description?: string,    // 선택: 상세 설명
  author?: string,        // 선택: 작성자
  createdAt?: Date,       // 선택: 생성일
  difficulty?: 'easy'|'medium'|'hard'  // 선택: 난이도
}
```

---

## 🎨 UI/UX 패턴

### 1. 모달 기반 상세 보기

**설계 근거:**
- 스니펫 수가 증가해도 성능 유지
- 전체 화면 활용으로 가독성 향상
- ESC 키, 클릭 외부 영역으로 직관적 닫기

```javascript
// 모달 상태 관리
const [selectedSnippet, setSelectedSnippet] = useState(null);

// ESC 키 핸들링
useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === 'Escape') setSelectedSnippet(null);
  };
  if (selectedSnippet) {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }
}, [selectedSnippet]);
```

### 2. 카드 기반 프리뷰

```javascript
// 프리뷰 카드 최적화
<div className="snippet-card">
  <h3>{snippet.title}</h3>
  <span className="language-badge">{snippet.language}</span>
  <pre className="code-preview">
    {snippet.code.split('\n').slice(0, 3).join('\n')}
    {snippet.code.split('\n').length > 3 && '\n...'}
  </pre>
  <div className="tags">
    {snippet.tags.map(tag => <span key={tag}>{tag}</span>)}
  </div>
</div>
```

### 3. 실시간 검색 및 필터링

```javascript
// 통합 검색 로직
const filteredSnippets = snippets.filter(snippet => {
  const matchesSearch =
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    snippet.code.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory = selectedCategory === 'all' ||
    snippet.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
```

---

## ⚡ 성능 최적화

### 1. 코드 분할 (Code Splitting)

```javascript
// 카테고리별 청크 분할
const categoryImports = {
  javascript: () => import(
    /* webpackChunkName: "snippets-javascript" */
    './javascript.js'
  ),
  python: () => import(
    /* webpackChunkName: "snippets-python" */
    './python.js'
  ),
};
```

### 2. 로딩 상태 관리

```javascript
// 사용자 피드백 제공
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const loadData = async () => {
  try {
    setLoading(true);
    const data = await loadAllSnippets();
    setSnippets(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 3. 메모이제이션 활용

```javascript
// 비싼 계산 결과 캐싱
const categoryCounts = useMemo(() => {
  return snippets.reduce((acc, snippet) => {
    acc[snippet.category] = (acc[snippet.category] || 0) + 1;
    return acc;
  }, {});
}, [snippets]);
```

---

## 🚀 확장성 고려사항

### 1. 새 카테고리 추가

**단계별 확장 방법:**

1. **새 스니펫 파일 생성**
```javascript
// data/snippets/golang.js
export const golangSnippets = [
  {
    title: "Go HTTP Server",
    language: "go",
    category: "golang",
    code: `package main...`,
    tags: ["go", "http", "server"]
  }
];
```

2. **중앙 레지스트리 업데이트**
```javascript
// data/snippets/index.js
export const snippetCategories = {
  // 기존 카테고리들...
  golang: "Go Language"  // 새 카테고리 추가
};

const categoryImports = {
  // 기존 import들...
  golang: () => import('./golang.js').then(m => m.golangSnippets)
};
```

### 2. 고급 기능 확장

**즐겨찾기 시스템:**
```javascript
// localStorage 기반 즐겨찾기
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('snippet-favorites');
  return saved ? JSON.parse(saved) : [];
});

const toggleFavorite = (snippetId) => {
  const newFavorites = favorites.includes(snippetId)
    ? favorites.filter(id => id !== snippetId)
    : [...favorites, snippetId];

  setFavorites(newFavorites);
  localStorage.setItem('snippet-favorites', JSON.stringify(newFavorites));
};
```

**카테고리별 설정:**
```javascript
// 카테고리별 메타데이터
const categoryConfig = {
  javascript: {
    icon: "🟨",
    color: "#f7df1e",
    description: "JavaScript & ES6+ features"
  },
  python: {
    icon: "🐍",
    color: "#3776ab",
    description: "Python scripts and frameworks"
  }
};
```

### 3. 데이터베이스 연동 준비

**추상화 레이어 설계:**
```javascript
// services/snippetService.js
class SnippetService {
  async loadAllSnippets() {
    // 현재: 정적 import
    // 향후: API 호출
  }

  async saveSnippet(snippet) {
    // 향후: POST /api/snippets
  }

  async deleteSnippet(id) {
    // 향후: DELETE /api/snippets/:id
  }
}
```

---

## 🎯 최적 관행

### 1. 코드 조직

**파일 명명 규칙:**
- `camelCase`: JavaScript 파일/함수명
- `kebab-case`: CSS 클래스명
- `PascalCase`: React 컴포넌트명

**폴더 구조 원칙:**
- 기능별 그룹핑 우선
- 공통 요소는 상위 레벨
- 최대 3단계 깊이 제한

### 2. 에러 처리

```javascript
// 포괄적 에러 처리
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Snippet loading error:', error);
      setHasError(true);
    };

    window.addEventListener('unhandledrejection', handleError);
    return () => window.removeEventListener('unhandledrejection', handleError);
  }, []);

  if (hasError) {
    return <div>스니펫을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return children;
};
```

### 3. 접근성 (Accessibility)

```javascript
// 키보드 네비게이션 지원
const SnippetCard = ({ snippet, onClick }) => (
  <div
    className="snippet-card"
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    tabIndex={0}
    role="button"
    aria-label={`${snippet.title} 스니펫 보기`}
  >
    {/* 카드 내용 */}
  </div>
);
```

### 4. 테스트 가능한 설계

```javascript
// 순수 함수로 로직 분리
export const filterSnippets = (snippets, searchTerm, category) => {
  return snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || snippet.category === category;
    return matchesSearch && matchesCategory;
  });
};

// 테스트 작성 용이
describe('filterSnippets', () => {
  test('should filter by search term', () => {
    const result = filterSnippets(mockSnippets, 'react', 'all');
    expect(result).toHaveLength(2);
  });
});
```

---

## 📈 확장 로드맵

### Phase 1: 기본 기능 (완료)
- ✅ 카테고리별 스니펫 관리
- ✅ 검색 및 필터링
- ✅ 모달 기반 상세 보기
- ✅ 자동 ID 생성

### Phase 2: 향상된 기능
- 🔄 즐겨찾기 시스템
- 🔄 개인 스니펫 추가/편집
- 🔄 다크 모드 지원
- 🔄 키보드 단축키

### Phase 3: 고급 기능
- 📋 백엔드 API 연동
- 📋 사용자 인증
- 📋 스니펫 공유 기능
- 📋 버전 관리

### Phase 4: 엔터프라이즈
- 📋 팀 협업 기능
- 📋 권한 관리
- 📋 API 문서 생성
- 📋 분석 대시보드

---

## 🏆 결론

이 설계 패턴은 다음과 같은 혜택을 제공합니다:

### 개발자 경험
- **빠른 개발**: 명확한 구조로 개발 속도 향상
- **쉬운 유지보수**: 모듈화로 버그 수정 간소화
- **확장성**: 새 기능 추가 시 기존 코드 영향 최소화

### 사용자 경험
- **빠른 로딩**: 코드 분할로 초기 로딩 최적화
- **직관적 UI**: 일관된 패턴으로 학습 비용 감소
- **안정성**: 포괄적 에러 처리로 안정적 동작

### 확장성
- **수평 확장**: 새 카테고리/기능 쉽게 추가
- **수직 확장**: 고급 기능으로 점진적 업그레이드
- **플랫폼 확장**: 웹, 모바일, 데스크톱 대응 가능

이러한 설계 패턴을 따르면 유지보수가 쉽고 확장 가능한 코드 스니펫 관리 애플리케이션을 구축할 수 있습니다.