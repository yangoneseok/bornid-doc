---
sidebar_position: 1
---

# 문서 버전 관리

Docusaurus는 문서의 여러 버전을 관리할 수 있습니다.

## 문서 버전 생성

프로젝트의 버전 1.0을 릴리스하세요:

```bash
npm run docusaurus docs:version 1.0
```

`docs` 폴더가 `versioned_docs/version-1.0`으로 복사되고 `versions.json`이 생성됩니다.

이제 문서에는 2개의 버전이 있습니다:

- `1.0` - `http://localhost:3000/docs/`에서 버전 1.0 문서 제공
- `current` - `http://localhost:3000/docs/next/`에서 **향후 출시 예정인 미출시 문서** 제공

## 버전 드롭다운 추가

버전 간 원활한 탐색을 위해 버전 드롭다운을 추가하세요.

`docusaurus.config.js` 파일을 수정하세요:

```js title="docusaurus.config.js"
export default {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'docsVersionDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

문서 버전 드롭다운이 네비게이션 바에 나타납니다:

![문서 버전 드롭다운](./img/docsVersionDropdown.png)

## 기존 버전 업데이트

각각의 폴더에서 버전별 문서를 편집할 수 있습니다:

- `versioned_docs/version-1.0/hello.md`는 `http://localhost:3000/docs/hello`를 업데이트
- `docs/hello.md`는 `http://localhost:3000/docs/next/hello`를 업데이트
