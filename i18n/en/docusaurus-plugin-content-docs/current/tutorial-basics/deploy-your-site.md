---
sidebar_position: 5
---

# 사이트 배포

Docusaurus는 **정적 사이트 생성기**(**[Jamstack](https://jamstack.org/)**라고도 불림)입니다.

사이트를 간단한 **정적 HTML, JavaScript, CSS 파일**로 빌드합니다.

## 사이트 빌드

**프로덕션용**으로 사이트를 빌드하세요:

```bash
npm run build
```

정적 파일들이 `build` 폴더에 생성됩니다.

## 사이트 배포

프로덕션 빌드를 로컬에서 테스트하세요:

```bash
npm run serve
```

이제 `build` 폴더가 [http://localhost:3000/](http://localhost:3000/)에서 서빙됩니다.

이제 `build` 폴더를 **거의 모든 곳에** 쉽게, **무료로** 또는 매우 저렴한 비용으로 배포할 수 있습니다(**[배포 가이드](https://docusaurus.io/docs/deployment)** 참조).
