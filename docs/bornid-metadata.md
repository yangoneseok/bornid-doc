---
title: Metadata
sidebar_position: 2
---

# BornID Metadata

BornID Metadata는 디지털 콘텐츠의 출처와 진위성을 보장하는 핵심 기술입니다. C2PA 표준을 기반으로 한 메타데이터 시스템을 통해 콘텐츠의 생성부터 배포까지 전 과정을 추적할 수 있습니다.

## 개요

BornID Metadata 시스템은 다음과 같은 정보를 안전하게 기록합니다:

- **생성 정보**: 콘텐츠가 언제, 어디서, 누구에 의해 생성되었는지
- **편집 이력**: 콘텐츠에 가해진 모든 변경사항과 편집 도구 정보
- **배포 경로**: 콘텐츠가 어떤 경로로 전파되었는지
- **검증 상태**: 현재 콘텐츠의 무결성 상태

## 메타데이터 구조

### 기본 매니페스트 (Active Manifest)

```json
{
  "active_manifest": "urn:uuid:f6969d4b-5871-468e-b237-e21f8d2cc219",
  "manifests": {
    "urn:uuid:f6969d4b-5871-468e-b237-e21f8d2cc219": {
      "claim_generator": "c2pa-rs/0.46.0",
      "format": "image/jpeg",
      "instance_id": "xmp:iid:626032b0-9050-4084-8af5-81175cdea0cd"
    }
  }
}
```

### 창작자 정보 (Creative Work)

```json
{
  "assertions": [
    {
      "label": "stds.schema-org.CreativeWork",
      "data": {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "author": [
          {
            "name": "Test User",
            "@type": "Person"
          },
          {
            "name": "Test Company",
            "@type": "Company"
          }
        ],
        "when": "2025-06-24T00:02:01Z"
      }
    }
  ]
}
```

### 편집 이력 정보 (Ingredients)

```json
{
  "ingredients": [
    {
      "title": "parent",
      "format": "jpg",
      "instance_id": "xmp:iid:7c0c4c00-e968-4a60-aa26-b362793fe6b2",
      "relationship": "parentOf",
      "thumbnail": {
        "format": "image/jpeg",
        "identifier": "self#jumbf=c2pa.assertions/c2pa.thumbnail.ingredient.jpeg"
      }
    }
  ]
}
```

### 콘텐츠 fingerprint 이력

```json
"assertions": [
  {
    "label": "c2pa.soft-binding",
    "data": {
      "alg": "com.digicaps.fingerprint.1",
      "blocks": [
          {
            "scope": {},
            "value": "1*{해시값}"
          }
      ]
    }
  },
]
```

## 디지털 서명

### PS256 서명 시스템

BornID는 RSASSA-PSS with SHA-256 (PS256) 알고리즘을 사용하여 강력한 디지털 서명을 제공합니다.

**서명 정보:**
```json
{
  "signature_info": {
    "alg": "Ps256",
    "issuer": "DigiCAP Co.,Ltd.",
    "cert_serial_number": "5539112271043283054276207401787004462"
  }
}
```

### 검증 프로세스

:::info 검증 단계
1. **클레임 서명**: 내부 유효성 기간 및 서명 유효성 검증
2. **해시 URI 매칭**: 모든 어설션의 해시 URI 일치성 확인
3. **데이터 해시**: 콘텐츠 데이터의 무결성 검증
4. **썸네일 검증**: 클레임 및 상위 콘텐츠 썸네일 유효성 확인
:::

## 검증 결과

### 성공적인 검증 항목

```json
{
  "validation_results": {
    "activeManifest": {
      "success": [
        {
          "code": "claimSignature.validated",
          "explanation": "claim signature valid"
        },
        {
          "code": "assertion.dataHash.match",
          "explanation": "data hash valid"
        }
      ],
      "failure": []
    }
  }
}
```

## 보안 고려사항

### 암호화 강도

- **PS256 서명**: RSASSA-PSS with SHA-256으로 강력한 보안 제공
- **해시 무결성**: 모든 어설션에 대한 SHA-256 해시 검증
- **인증서 체인**: DigiCAP Co.,Ltd. 발행 인증서를 통한 신뢰성 보장

### 콘텐츠 추적

- **UUID 기반**: 전역 고유 식별자로 충돌 없는 추적
- **관계 매핑**: parentOf 관계를 통한 편집 이력 추적
- **썸네일 보존**: 편집 전후 시각적 비교를 위한 썸네일 유지

## 지원 형식 및 도구

| 컴포넌트 | 버전 | 지원 기능 | 비고 |
|----------|------|-----------|------|
| **JPEG** | - | ✅ 메타데이터 임베딩 | JUMBF 포맷 지원 |
| **PNG** | ✅ | ✅ | XMP 메타데이터 |
| **MP4** | ✅ | ✅ | QuickTime 메타데이터 |

## 실제 활용 사례

### 콘텐츠 출처 확인

매니페스트 분석을 통해 다음 정보를 확인할 수 있습니다:

- **생성 시점**: 2025년 6월 24일 00:02:01 UTC
- **창작자**: Test User (개인), Test Company (기업)
- **편집 이력**: JPG 원본에서 JPEG로 변환된 이력 존재

### 무결성 검증

모든 검증 항목이 성공적으로 통과하여 콘텐츠의 무결성이 보장됩니다:

- **서명 검증**: ✅ 통과
- **해시 일치**: ✅ 모든 어설션 해시 검증 완료
- **데이터 무결성**: ✅ 원본 데이터 변조 없음

---

더 자세한 기술 사양은 [C2PA 공식 문서](https://c2pa.org/specifications/specifications/1.3/specs/C2PA_Specification.html)를 참조하세요.