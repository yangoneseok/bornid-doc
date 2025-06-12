---
sidebar_position: 1
---

# 튜토리얼 소개

**5분 안에 Docusaurus**를 알아보세요.

## 시작하기

**새 사이트 만들기**로 시작하세요.

또는 **[docusaurus.new](https://docusaurus.new)**에서 **Docusaurus를 즉시 사용해보세요**.

### 필요한 것들

- [Node.js](https://nodejs.org/en/download/) 버전 18.0 이상:
  - Node.js를 설치할 때 종속성과 관련된 모든 체크박스를 선택하는 것이 좋습니다.

## 새 사이트 생성

**클래식 템플릿**을 사용하여 새 Docusaurus 사이트를 생성합니다.

명령을 실행한 후 클래식 템플릿이 자동으로 프로젝트에 추가됩니다:

```bash
npm init docusaurus@latest my-website classic
```

이 명령은 명령 프롬프트, Powershell, 터미널 또는 코드 에디터의 통합 터미널에서 입력할 수 있습니다.

이 명령은 또한 Docusaurus를 실행하는 데 필요한 모든 종속성을 설치합니다.

## 사이트 시작

개발 서버를 실행합니다:

```bash
cd my-website
npm run start
```

`cd` 명령은 작업 중인 디렉토리를 변경합니다. 새로 생성된 Docusaurus 사이트로 작업하려면, 터미널에서 해당 위치로 이동해야 합니다.

`npm run start` 명령은 웹사이트를 로컬에서 빌드하고 개발 서버를 통해 제공하여 http://localhost:3000/에서 볼 수 있도록 준비합니다.

`docs/intro.md` (이 페이지)를 열고 몇 줄을 편집해보세요: 사이트가 **자동으로 다시 로드**되어 변경 사항을 표시합니다.
