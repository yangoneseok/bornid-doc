---
title: SDKs
sidebar_position: 4
---

# Software Development Kits (SDKs)

DigiCAP Content Authenticity 서비스를 쉽게 통합할 수 있도록 iOS SDK를 제공합니다. SDK는 C2PA 서명, 미디어 검증, 지문 인식, 콘텐츠 인증 기능을 포함합니다.

## 지원 플랫폼

| 플랫폼 | 버전 | 상태 | 설치 방법 |
|--------|------|------|-----------|
| **iOS** | v1.0.0 | ✅ 지원 | .a 파일 |
| **Android** | - | 🔄 추후 지원 예정 | - |

## iOS SDK (JinbonSDK)

### 설치

현재 SDK는 `.a` 파일 형태로 제공할 예정입니다. 
설치 방법에 대한 자세한 내용은 아래 이메일로 문의해 주세요.

**문의**: info@digicaps.com

### 초기화

```swift
import JinbonSDK

// SDK 설정
JinbonSDK.shared.configure(baseURL: URL, apiKey: String)
```

## API 레퍼런스

### 사용자 인증

```swift
// 로그인
JinbonSDK.shared.login(email: String, password: String) async throws -> User

// 사용법
let user = try await JinbonSDK.shared.login(email: "user@example.com", password: "password")
```

```swift
// 로그아웃
JinbonSDK.shared.logout() async

// 사용법
await JinbonSDK.shared.logout()
```

```swift
// 로그인 상태 확인
JinbonSDK.shared.isLoggedIn() async -> Bool

// 사용법
let isLoggedIn = await JinbonSDK.shared.isLoggedIn()
```

```swift
// 사용자 정보 갱신
JinbonSDK.shared.fetchMyProfile() async throws -> User

// 사용법
let user = try await JinbonSDK.shared.fetchMyProfile()
```

### 회사 정보

```swift
// 현재 회사 이름 조회
JinbonSDK.shared.getCurrentCompanyName() async -> String?

// 사용법
let companyName = await JinbonSDK.shared.getCurrentCompanyName()
```

```swift
// 회사 키 정보 조회
JinbonSDK.shared.getCompanyKeys(companyId: String) async throws -> CompanyKeysResponse

// 사용법
let keys = try await JinbonSDK.shared.getCompanyKeys(companyId: "company-id")
```

```swift
// 캐시된 회사 키 정보 조회
JinbonSDK.shared.getCompanyKeysWithCache() async throws -> CompanyKeysResponse

// 사용법
let keys = try await JinbonSDK.shared.getCompanyKeysWithCache()
```

### 미디어 업로드

```swift
// 미디어 업로드
JinbonSDK.shared.uploadMedia(
    companyId: String, 
    data: Data, 
    mediaType: MediaType, 
    location: CLLocation, 
    description: String? = nil, 
    fingerprint: Bool? = nil
) async throws -> URL

// 사용법
let uploadURL = try await JinbonSDK.shared.uploadMedia(
    companyId: "company-id",
    data: imageData,
    mediaType: .image,
    location: currentLocation,
    description: "설명",
    fingerprint: true
)
```

### 미디어 목록 조회

```swift
// 미디어 목록 조회
JinbonSDK.shared.listMedia(
    userId: String, 
    limit: Int = 20, 
    offset: Int = 0
) async throws -> MediaListResponse

// 사용법
let mediaList = try await JinbonSDK.shared.listMedia(userId: "user-id", limit: 10)
```

### C2PA 서명

```swift
// 이미지 데이터 서명
JinbonSDK.shared.signMedia(
    assetData: Data,
    thumbnailData: Data? = nil,
    username: String,
    company: String,
    privateKeyData: Data,
    publicKeyData: Data,
    format: String,
    additionalInfo: String? = nil,
    latitude: Double = 0.0,
    longitude: Double = 0.0
) -> (signedImage: Data?, status: Int32, message: String?, manifestJson: String?)

// 사용법
let result = JinbonSDK.shared.signMedia(
    assetData: imageData,
    username: "사용자명",
    company: "회사명",
    privateKeyData: privateKey,
    publicKeyData: publicKey,
    format: "jpg"
)
```

```swift
// 파일 URL 서명
JinbonSDK.shared.signMedia(
    assetFileURL: URL,
    thumbnailFileURL: URL? = nil,
    username: String,
    company: String,
    privateKeyData: Data,
    publicKeyData: Data,
    format: String,
    additionalInfo: String? = nil,
    latitude: Double = 0.0,
    longitude: Double = 0.0
) -> (signedImage: Data?, status: Int32, message: String?, manifestJson: String?)

// 사용법
let result = JinbonSDK.shared.signMedia(
    assetFileURL: imageURL,
    username: "사용자명",
    company: "회사명",
    privateKeyData: privateKey,
    publicKeyData: publicKey,
    format: "jpg"
)
```

### 미디어 검증

```swift
// 데이터 검증
JinbonSDK.shared.verifyMedia(data: Data, ext: String) -> String?

// 사용법
let result = JinbonSDK.shared.verifyMedia(data: imageData, ext: "jpg")
```

```swift
// 파일 검증
JinbonSDK.shared.verifyMedia(fileURL: URL, ext: String) -> String?

// 사용법
let result = JinbonSDK.shared.verifyMedia(fileURL: imageURL, ext: "jpg")
```

### 카메라 기능

```swift
// 카메라 화면 표시
JinbonSDK.shared.presentCamera(from: UIViewController, delegate: CameraViewControllerDelegate)

// 사용법
JinbonSDK.shared.presentCamera(from: self, delegate: self)
```

### 위치 권한

```swift
// 위치 권한 상태 확인
JinbonSDK.shared.locationAuthorizationStatus() -> CLAuthorizationStatus

// 사용법
let status = JinbonSDK.shared.locationAuthorizationStatus()
```

```swift
// 위치 권한 요청
JinbonSDK.shared.requestLocationPermission()

// 사용법
JinbonSDK.shared.requestLocationPermission()
```

### 설정 관리

```swift
// 설정 매니저 조회
JinbonSDK.shared.getSettingsManager() -> SettingsManager

// 사용법
let settingsManager = JinbonSDK.shared.getSettingsManager()
```

### 속성 접근

```swift
// 현재 사용자 정보
JinbonSDK.shared.currentUser: User?

// 현재 회사 정보
JinbonSDK.shared.currentCompany: Company?
```

## 델리게이트 프로토콜

### CameraViewControllerDelegate

```swift
protocol CameraViewControllerDelegate {
    func cameraViewController(_ controller: UIViewController, didCaptureImage image: UIImage, with metadata: [String: Any])
    func cameraViewControllerDidCancel(_ controller: UIViewController)
}
```

## 데이터 모델

### MediaType
```swift
enum MediaType {
    case image
    case video
}
```

## 에러 처리

SDK의 모든 비동기 함수는 Swift의 표준 에러 처리 방식을 사용합니다:

```swift
do {
    let user = try await JinbonSDK.shared.login(email: email, password: password)
    // 성공 처리
} catch {
    // 에러 처리
    print("오류: \(error.localizedDescription)")
}
```

## 지원 및 문의

### 기술 지원

- **이메일**: [info@digicaps.com](mailto:info@digicaps.com)

### 시스템 요구사항

- **iOS**: 15.0 이상
- **Xcode**: 14.0 이상
- **Swift**: 5.0 이상

---

더 많은 예제와 튜토리얼은 [개발자 문서](https://developers.digicap.com)에서 확인하실 수 있습니다. 