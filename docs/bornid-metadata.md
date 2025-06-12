---
title: BornID Metadata
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

### 기본 정보 (Basic Information)

```json
{
  "claim": {
    "dc:title": "콘텐츠 제목",
    "dc:format": "image/jpeg",
    "tiff:ImageWidth": 1920,
    "tiff:ImageLength": 1080,
    "xmp:CreateDate": "2024-01-15T10:30:00Z",
    "xmp:CreatorTool": "DigiCAP Content Creator v1.0"
  }
}
```

### 서명 정보 (Signature Information)

```json
{
  "signature": {
    "alg": "ps256",
    "iss": "DigiCAP Authority",
    "iat": 1705312200,
    "claim_hash": "sha256:abc123...",
    "cert_chain": ["-----BEGIN CERTIFICATE-----..."]
  }
}
```

### 출처 정보 (Provenance Information)

```json
{
  "assertions": [
    {
      "label": "c2pa.actions",
      "data": {
        "actions": [
          {
            "action": "c2pa.created",
            "when": "2024-01-15T10:30:00Z",
            "softwareAgent": "DigiCAP Creator v1.0"
          }
        ]
      }
    }
  ]
}
```

## 디지털 서명

### X.509 인증서 기반 서명

BornID는 PKI(Public Key Infrastructure) 기반의 X.509 인증서를 사용하여 디지털 서명을 생성합니다.

**서명 과정:**
1. **해시 생성**: 콘텐츠와 메타데이터의 SHA-256 해시 계산
2. **서명 생성**: 개인키로 해시값에 디지털 서명
3. **인증서 첨부**: 공개키 인증서를 메타데이터에 포함
4. **타임스탬프**: 신뢰할 수 있는 시간 정보 추가

### 서명 검증 프로세스

:::info 검증 단계
1. **인증서 유효성**: 인증서 체인과 만료일 확인
2. **서명 검증**: 공개키로 디지털 서명 검증
3. **해시 비교**: 현재 콘텐츠의 해시와 서명된 해시 비교
4. **타임스탬프 확인**: 서명 시점의 유효성 검증
:::

## 메타데이터 활용

### API를 통한 메타데이터 조회

```bash
curl -X GET "https://api.digicap.com/v1/metadata/{content_id}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### 응답 예시

```json
{
  "status": "verified",
  "content_id": "bc123456789",
  "metadata": {
    "creation_date": "2024-01-15T10:30:00Z",
    "creator": "photographer@example.com",
    "location": {
      "latitude": 37.5665,
      "longitude": 126.9780
    },
    "device_info": {
      "make": "Canon",
      "model": "EOS R5"
    },
    "editing_history": [
      {
        "timestamp": "2024-01-15T11:00:00Z",
        "software": "Adobe Photoshop 2024",
        "operation": "color_adjustment"
      }
    ]
  },
  "verification": {
    "signature_valid": true,
    "certificate_valid": true,
    "content_integrity": "intact"
  }
}
```

## 보안 고려사항

### 개인정보 보호

- **선택적 공개**: 민감한 메타데이터는 암호화하여 보호
- **익명화 옵션**: 창작자 정보를 익명으로 처리 가능
- **GDPR 준수**: 유럽 개인정보 보호 규정 완전 준수

### 변조 방지

- **암호화 해시**: SHA-256 이상의 강력한 해시 알고리즘 사용
- **체인 연결**: 각 편집 단계가 이전 단계와 암호학적으로 연결
- **실시간 검증**: 메타데이터 무결성의 실시간 모니터링

## 지원 형식

| 파일 형식 | 메타데이터 지원 | 서명 지원 | 비고 |
|-----------|----------------|-----------|------|
| **JPEG** | ✅ | ✅ | EXIF, XMP 호환 |
| **PNG** | ✅ | ✅ | XMP 메타데이터 |
| **MP4** | ✅ | ✅ | QuickTime 메타데이터 |
| **WebP** | ✅ | ✅ | 제한적 메타데이터 |
| **AVIF** | 🔄 | 🔄 | 개발 중 |

---

더 자세한 기술 사양은 [C2PA 공식 문서](https://c2pa.org/specifications/specifications/1.3/specs/C2PA_Specification.html)를 참조하세요. 