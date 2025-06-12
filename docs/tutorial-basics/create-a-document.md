---
sidebar_position: 2
---

# 문서 생성

문서는 다음으로 연결된 **페이지 그룹**입니다:

- **사이드바**
- **이전/다음 탐색**
- **버전 관리**

## 첫 번째 문서 생성

`docs/hello.md`에 마크다운 파일을 생성하세요:

```md title="docs/hello.md"
# 안녕하세요

이것은 제 **첫 번째 Docusaurus 문서**입니다!
```

이제 [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello)에서 새 문서를 볼 수 있습니다.

## 사이드바 구성

Docusaurus는 `docs` 폴더에서 자동으로 **사이드바를 생성**합니다.

사이드바 라벨과 위치를 사용자 정의하기 위해 메타데이터를 추가하세요:

```md title="docs/hello.md" {1-4}
---
sidebar_position: 1
sidebar_label: '안녕!'
---

# 안녕하세요

이것은 제 **첫 번째 Docusaurus 문서**입니다!
```

`sidebars.ts`에서 사이드바를 명시적으로 생성할 수도 있습니다:

```ts title="sidebars.ts"
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: '튜토리얼',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};

export default sidebars;
```
