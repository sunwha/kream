# Odream App

Odream App은 adc에서 진행하는 부트캠프 프로젝트로 KREAM(https://kream.co.kr/) 모바일 웹 클론 앱입니다.
... 는 아직 작업중🚧

## Gantt Chart

```mermaid
gantt
    section 프로젝트 분석 및 설계 (20%)
    요구사항 분석 :done, des1, 2023-10-01, 2d
    기술 스택 결정 :done, des2, after des1, 1d
    설계 문서 작성 :done, des3, after des2, 2d
    진척률 산정 :done, des4, after des3, 1d

    section 프론트엔드 개발 (30%)
    페이지 구조 및 컴포넌트 개발 :active, des5, after des4, 3d
    UI 스타일링 : des6, after des5, 2d
    주요 기능 구현 : des7, after des6, 3d

    section 백엔드 개발 (20%)
    API 개발 및 데이터베이스 연동 : des8, after des7, 3d
    서버 상태 관리 및 비즈니스 로직 구현 : des9, after des8, 2d
    인증 및 인가 : des10, after des9, 2d

    section 테스트 및 QA (15%)
    유닛 테스트 및 통합 테스트 : des11, after des10, 2d
    QA 및 리뷰 : des12, after des11, 2d
    버그 수정 및 조정 : des13, after des12, 1d

    section 배포 및 마무리 작업 (15%)
    배포 환경 세팅 및 배포 : des14, after des13, 2d
    클라이언트 리뷰 및 최종 조정 : des15, after des14, 1d
    문서화 및 코드 정리 : des16, after des15, 1d
```

## 사용된 기술 스택

- NextJS
- Typescript
- Redux toolkit
- React-query
- Next-auth
- Axios
- Jest
- pnpm
- Tailwind CSS

### 필수 기능 범위

1. 회원가입
2. 로그인/로그아웃
3. 마이페이지
4. Style 게시판

### Key Results

- 분석/설계 [o]
- 기능 구현 [o]
- 코딩 컨벤션 [o]
  - 네이밍 룰, 코드 스타일, 등 프론트엔드, 커밋 컨벤션 등 코드 전반에 관한 컨벤션 문서 작성
  - lint, prettier, husky 도입
- 테스트 자동화 도구 도입/활용 []
- 스토리북 도입 []
- 배포 []

### 프로젝트 구조

- app
  - (main)
    - list
    - detail
    - upload
      - edit
  - search
  - (account)
    - login
    - signup
    - find-email
    - find-pass
  - mypage
    - profile
    - info
  - components
    - ui
  - lib
  - types
  - utils
