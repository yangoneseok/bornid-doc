---
title: Help
sidebar_position: 5
---

# Help & Support

DigiCAP Content Authenticity 서비스 사용 중 궁금한 점이나 문제가 있으시면 이 페이지를 참고해주세요.

## 자주 묻는 질문 (FAQ)

### 기본 사용법

**Q: API 키는 어떻게 발급받나요?**
A: [BornID](https://bornid.io)에서 계정을 생성하고 API 키를 발급받을 수 있습니다.(회원가입 이후 사용가능)

**Q: 지원되는 파일 형식이 무엇인가요?**
A: 현재 지원되는 형식은 다음과 같습니다:
- **이미지**: JPEG, PNG, WebP, HEIC
- **동영상**: MP4, MOV, AVI (베타)
- **최대 파일 크기**: 50MB

**Q: 처리 시간은 얼마나 걸리나요?**
A: 평균 처리 시간:
- 이미지 메타데이터 생성: 1-3초
- 지문 생성: 2-5초  
- 콘텐츠 검증: 3-8초

### 기술적 질문

**Q: C2PA 표준과 어떻게 호환되나요?**
A: DigiCAP는 C2PA 1.3 표준을 완전히 준수하며, Adobe, Microsoft 등 주요 업체의 도구와 호환됩니다.

**Q: 개인정보는 어떻게 보호되나요?**
A: 
- 모든 데이터는 AES-256으로 암호화
- GDPR, CCPA 완전 준수
- 사용자 요청 시 데이터 삭제 보장

**Q: 오프라인에서도 사용할 수 있나요?**
A: 현재는 온라인 API만 제공하며, 온프레미스 솔루션은 엔터프라이즈 플랜에서 제공됩니다.

## 문제 해결

### 일반적인 오류

#### 인증 오류
```
Error: INVALID_API_KEY
```
**해결 방법:**
1. API 키가 올바른지 확인
2. 환경(sandbox/production) 설정 확인
3. API 키 만료일 확인

#### 파일 업로드 오류
```
Error: FILE_TOO_LARGE
```
**해결 방법:**
1. 파일 크기를 50MB 이하로 줄이기
2. 이미지 압축 또는 해상도 조정
3. 지원되는 파일 형식인지 확인

#### 처리 시간 초과
```
Error: TIMEOUT
```
**해결 방법:**
1. 파일 크기 줄이기
2. 네트워크 연결 상태 확인
3. 재시도 로직 구현

### SDK별 문제 해결

#### JavaScript/Node.js
```javascript
// 일반적인 오류 처리
try {
  const result = await client.verify(params);
} catch (error) {
  if (error.code === 'ECONNRESET') {
    // 네트워크 재연결 시도
    await new Promise(resolve => setTimeout(resolve, 1000));
    return await client.verify(params);
  }
  throw error;
}
```

#### Python
```python
import time
from digicap_content_auth.exceptions import RateLimitError

try:
    result = client.verify(file_path="image.jpg")
except RateLimitError as e:
    # 속도 제한 대기
    time.sleep(e.retry_after)
    result = client.verify(file_path="image.jpg")
```

## 성능 최적화

### 파일 최적화
- **이미지**: 1920px 이하 권장, JPEG 품질 80% 이상
- **동영상**: H.264 코덱, 30fps 이하 권장
- **압축**: 무손실 압축 사용 권장

### API 사용 최적화
```javascript
// 배치 처리로 효율성 향상
const files = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
const promises = files.map(file => client.verify({ file }));
const results = await Promise.all(promises);
```

### 캐싱 전략
```javascript
// 결과 캐싱으로 중복 요청 방지
const cache = new Map();

async function verifyWithCache(file) {
  const hash = await getFileHash(file);
  
  if (cache.has(hash)) {
    return cache.get(hash);
  }
  
  const result = await client.verify({ file });
  cache.set(hash, result);
  
  return result;
}
```

## 지원 채널

### 기술 지원

**📧 이메일 지원**
- 서비스 및 기술 문의: [info-bornid@digicaps.com](mailto:info-bornid@digicaps.com)
