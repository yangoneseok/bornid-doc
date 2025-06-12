---
title: SDKs
sidebar_position: 4
---

# Software Development Kits (SDKs)

DigiCAP Content Authenticity 서비스를 쉽게 통합할 수 있도록 다양한 프로그래밍 언어용 SDK를 제공합니다. 각 SDK는 메타데이터 생성, 지문 인식, 콘텐츠 검증 기능을 포함합니다.

## 지원 언어

| 언어 | 버전 | 상태 | 설치 방법 |
|------|------|------|-----------|
| **JavaScript/Node.js** | v2.1.0 | ✅ 안정 | `npm install @digicap/content-auth` |
| **Python** | v2.0.5 | ✅ 안정 | `pip install digicap-content-auth` |
| **Java** | v1.8.3 | ✅ 안정 | Maven/Gradle |
| **Swift/iOS** | v1.5.0 | ✅ 안정 | CocoaPods/SPM |
| **Kotlin/Android** | v1.5.0 | ✅ 안정 | Maven |
| **Go** | v1.2.0 | 🔄 베타 | `go get github.com/digicap/go-sdk` |
| **C#/.NET** | v1.1.0 | 🔄 베타 | NuGet |

## JavaScript SDK

### 설치

```bash
npm install @digicap/content-auth
# 또는
yarn add @digicap/content-auth
```

### 기본 사용법

```javascript
import { DigiCAPClient } from '@digicap/content-auth';

// 클라이언트 초기화
const client = new DigiCAPClient({
  apiKey: 'your-api-key-here',
  environment: 'production' // 또는 'sandbox'
});

// 이미지에 메타데이터 추가
async function addMetadata() {
  try {
    const result = await client.metadata.create({
      file: './image.jpg',
      metadata: {
        title: 'Sample Image',
        creator: 'photographer@example.com',
        description: 'A beautiful sunset photo'
      },
      sign: true // 디지털 서명 추가
    });
    
    console.log('Metadata added:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 지문 생성 및 등록
async function generateFingerprint() {
  try {
    const fingerprint = await client.fingerprint.generate({
      file: './image.jpg',
      register: true // 데이터베이스에 자동 등록
    });
    
    console.log('Fingerprint ID:', fingerprint.id);
    console.log('Vector length:', fingerprint.vector.length);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 콘텐츠 검증
async function verifyContent() {
  try {
    const verification = await client.verify({
      file: './image.jpg',
      checkMetadata: true,
      checkFingerprint: true,
      checkDeepfake: true
    });
    
    console.log('Verification result:', verification);
    /*
    {
      isAuthentic: true,
      confidence: 0.95,
      metadata: { valid: true, signed: true },
      fingerprint: { matches: [...], similarity: 0.98 },
      deepfake: { detected: false, confidence: 0.05 }
    }
    */
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### React 컴포넌트 예시

```jsx
import React, { useState } from 'react';
import { DigiCAPClient } from '@digicap/content-auth';

const ContentVerifier = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const client = new DigiCAPClient({
    apiKey: process.env.REACT_APP_DIGICAP_API_KEY
  });

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setLoading(true);

    try {
      const verification = await client.verify({
        file: uploadedFile,
        checkMetadata: true,
        checkFingerprint: true
      });
      
      setResult(verification);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*,video/*" 
        onChange={handleFileUpload}
      />
      
      {loading && <div>검증 중...</div>}
      
      {result && (
        <div>
          <h3>검증 결과</h3>
          <p>진위성: {result.isAuthentic ? '✅ 인증됨' : '❌ 의심됨'}</p>
          <p>신뢰도: {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
};
```

## Python SDK

### 설치

```bash
pip install digicap-content-auth
```

### 기본 사용법

```python
from digicap_content_auth import DigiCAPClient
import asyncio

# 클라이언트 초기화
client = DigiCAPClient(
    api_key="your-api-key-here",
    environment="production"
)

# 동기 방식
def create_signed_content():
    # 메타데이터와 서명 추가
    result = client.metadata.create(
        file_path="./image.jpg",
        metadata={
            "title": "Sample Image",
            "creator": "photographer@example.com",
            "location": {"lat": 37.5665, "lng": 126.9780}
        },
        sign=True,
        certificate_path="./cert.pem"
    )
    
    print(f"Content ID: {result.content_id}")
    print(f"Signature valid: {result.signature_valid}")
    
    return result

# 비동기 방식
async def verify_content_async():
    verification = await client.verify_async(
        file_path="./suspicious_image.jpg",
        check_metadata=True,
        check_fingerprint=True,
        check_deepfake=True
    )
    
    return verification

# 배치 처리
def process_batch():
    image_files = ["img1.jpg", "img2.jpg", "img3.jpg"]
    
    results = client.batch_process(
        files=image_files,
        operations=["fingerprint", "metadata"],
        max_workers=4
    )
    
    for file_path, result in results.items():
        print(f"{file_path}: {result.status}")

# 실행
if __name__ == "__main__":
    # 동기 실행
    create_signed_content()
    
    # 비동기 실행
    asyncio.run(verify_content_async())
    
    # 배치 처리
    process_batch()
```

### Flask 웹 애플리케이션 예시

```python
from flask import Flask, request, jsonify
from digicap_content_auth import DigiCAPClient
import tempfile
import os

app = Flask(__name__)
client = DigiCAPClient(api_key=os.getenv('DIGICAP_API_KEY'))

@app.route('/api/verify', methods=['POST'])
def verify_content():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    
    # 임시 파일로 저장
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        file.save(tmp_file.name)
        
        try:
            # 콘텐츠 검증
            result = client.verify(
                file_path=tmp_file.name,
                check_metadata=True,
                check_fingerprint=True
            )
            
            return jsonify({
                "authentic": result.is_authentic,
                "confidence": result.confidence,
                "details": result.details
            })
            
        except Exception as e:
            return jsonify({"error": str(e)}), 500
            
        finally:
            # 임시 파일 정리
            os.unlink(tmp_file.name)

if __name__ == '__main__':
    app.run(debug=True)
```

## Java SDK

### Maven 의존성

```xml
<dependency>
    <groupId>com.digicap</groupId>
    <artifactId>content-auth-sdk</artifactId>
    <version>1.8.3</version>
</dependency>
```

### 기본 사용법

```java
import com.digicap.contentauth.DigiCAPClient;
import com.digicap.contentauth.models.*;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;

public class ContentAuthExample {
    
    private final DigiCAPClient client;
    
    public ContentAuthExample() {
        this.client = DigiCAPClient.builder()
            .apiKey("your-api-key-here")
            .environment(Environment.PRODUCTION)
            .build();
    }
    
    public void createSignedContent() {
        try {
            // 메타데이터 생성 및 서명
            MetadataRequest request = MetadataRequest.builder()
                .filePath(Paths.get("./image.jpg"))
                .title("Sample Image")
                .creator("photographer@example.com")
                .sign(true)
                .build();
            
            MetadataResponse response = client.metadata().create(request);
            
            System.out.println("Content ID: " + response.getContentId());
            System.out.println("Signed: " + response.isSigned());
            
        } catch (DigiCAPException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    public void verifyContentAsync() {
        VerificationRequest request = VerificationRequest.builder()
            .filePath(Paths.get("./test_image.jpg"))
            .checkMetadata(true)
            .checkFingerprint(true)
            .build();
        
        CompletableFuture<VerificationResponse> future = 
            client.verifyAsync(request);
        
        future.thenAccept(response -> {
            System.out.println("Authentic: " + response.isAuthentic());
            System.out.println("Confidence: " + response.getConfidence());
        }).exceptionally(throwable -> {
            System.err.println("Verification failed: " + throwable.getMessage());
            return null;
        });
    }
    
    public static void main(String[] args) {
        ContentAuthExample example = new ContentAuthExample();
        example.createSignedContent();
        example.verifyContentAsync();
    }
}
```

## iOS Swift SDK

### CocoaPods 설치

```ruby
pod 'DigiCAPContentAuth', '~> 1.5.0'
```

### 기본 사용법

```swift
import DigiCAPContentAuth
import UIKit

class ContentAuthManager {
    private let client: DigiCAPClient
    
    init() {
        let config = DigiCAPConfig(
            apiKey: "your-api-key-here",
            environment: .production
        )
        self.client = DigiCAPClient(config: config)
    }
    
    func createSignedImage(image: UIImage) async throws -> MetadataResult {
        let metadata = ContentMetadata(
            title: "Mobile Photo",
            creator: "mobile-user@example.com",
            location: CLLocationCoordinate2D(latitude: 37.5665, longitude: 126.9780)
        )
        
        let request = MetadataRequest(
            image: image,
            metadata: metadata,
            shouldSign: true
        )
        
        let result = try await client.metadata.create(request)
        return result
    }
    
    func verifyImage(image: UIImage) async throws -> VerificationResult {
        let request = VerificationRequest(
            image: image,
            checkMetadata: true,
            checkFingerprint: true
        )
        
        let result = try await client.verify(request)
        return result
    }
}

// SwiftUI 사용 예시
struct ContentVerificationView: View {
    @State private var selectedImage: UIImage?
    @State private var verificationResult: VerificationResult?
    @State private var isLoading = false
    
    private let authManager = ContentAuthManager()
    
    var body: some View {
        VStack {
            if let image = selectedImage {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .frame(height: 200)
            }
            
            Button("이미지 선택") {
                // 이미지 선택 로직
            }
            
            if let result = verificationResult {
                VStack {
                    Text("검증 결과")
                        .font(.headline)
                    Text("인증됨: \(result.isAuthentic ? "✅" : "❌")")
                    Text("신뢰도: \(String(format: "%.1f", result.confidence * 100))%")
                }
                .padding()
            }
            
            if isLoading {
                ProgressView("검증 중...")
            }
        }
    }
    
    private func verifySelectedImage() {
        guard let image = selectedImage else { return }
        
        isLoading = true
        
        Task {
            do {
                let result = try await authManager.verifyImage(image: image)
                await MainActor.run {
                    self.verificationResult = result
                    self.isLoading = false
                }
            } catch {
                await MainActor.run {
                    self.isLoading = false
                    // 에러 처리
                }
            }
        }
    }
}
```

## 공통 기능

### 에러 처리

모든 SDK는 일관된 에러 처리 방식을 제공합니다:

```javascript
// JavaScript
try {
  const result = await client.verify(params);
} catch (error) {
  switch (error.code) {
    case 'INVALID_API_KEY':
      console.log('API 키가 유효하지 않습니다');
      break;
    case 'FILE_TOO_LARGE':
      console.log('파일 크기가 너무 큽니다');
      break;
    case 'UNSUPPORTED_FORMAT':
      console.log('지원하지 않는 파일 형식입니다');
      break;
    default:
      console.log('알 수 없는 오류:', error.message);
  }
}
```

### 설정 옵션

```javascript
const client = new DigiCAPClient({
  apiKey: 'your-api-key',
  environment: 'production', // 'sandbox' 또는 'production'
  timeout: 30000, // 30초 타임아웃
  retryAttempts: 3, // 재시도 횟수
  enableLogging: true, // 디버그 로깅
  baseURL: 'https://api.digicap.com/v1' // 커스텀 엔드포인트
});
```

## 지원 및 문의

### 기술 지원

- **개발자 포털**: [https://developers.digicap.com](https://developers.digicap.com)
- **API 문서**: [https://docs.digicap.com/api](https://docs.digicap.com/api)
- **GitHub 리포지토리**: [https://github.com/digicap/sdks](https://github.com/digicap/sdks)
- **이메일 지원**: [dev-support@digicap.com](mailto:dev-support@digicap.com)

### 커뮤니티

- **Discord**: [DigiCAP 개발자 커뮤니티](https://discord.gg/digicap-dev)
- **Stack Overflow**: `digicap` 태그 사용
- **YouTube**: [DigiCAP 개발자 채널](https://youtube.com/digicap-dev)

---

더 많은 예제와 튜토리얼은 [개발자 문서](https://developers.digicap.com)에서 확인하실 수 있습니다. 