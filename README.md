# Odream App

Odream App은 adc에서 진행하는 부트캠프 프로젝트로 KREAM(https://kream.co.kr/) 모바일 웹 클론 앱입니다.
... 는 아직 작업중🚧

## Gantt Chart

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title Odream App 프로젝트 일정

    section 프로젝트 분석 및 설계
    기술 스택 결정: done, des1, 2024-02-15, 15d
    요구사항 분석 및 설계 문서 작성 :done, des2, after des1, 46d

    section 프론트엔드 개발
    페이지 구조 및 컴포넌트 개발 :done, des3, after des2, 27d
    대기 기간 : done, des4, after des3, 2024-11-06
    페이지 구조 및 컴포넌트 개발 :active, des4, 2024-11-07, 14d
    UI 스타일링 : -
    주요 기능 구현 :-

    section 테스트
    유닛 테스트 및 통합 테스트 : -
    버그 수정 및 조정 : -

    section 배포 및 마무리 작업
    배포 환경 세팅 및 배포 : -
    문서화 및 코드 정리 : -
    종료 :milestone, 2024-12-15, 0d
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

- [x] 분석/설계
- [x] 기능 구현
- [x] 코딩 컨벤션
  - 네이밍 룰, 코드 스타일, 등 프론트엔드, 커밋 컨벤션 등 코드 전반에 관한 컨벤션 문서 작성
  - lint, prettier, husky 도입
- [] 테스트 자동화 도구 도입/활용
- [] 스토리북 도입
- [] 배포

### 프로젝트 구조

- app
  - (main)
    - [id]
    - upload
      - edit
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
- libs
- types
- utils
