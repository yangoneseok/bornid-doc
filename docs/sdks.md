---
title: SDKs
sidebar_position: 4
---

# Software Development Kits (SDKs)

DigiCAP Content Authenticity 서비스를 쉽게 통합할 수 있도록 iOS SDK를 제공합니다. SDK는 C2PA 서명, 미디어 검증, 지문 인식, 콘텐츠 인증 기능을 포함합니다.

## 지원 플랫폼

| 플랫폼 | 버전 | 상태 | 설치 방법 |
|--------|------|------|-----------|
| **iOS** | v0.0.1 | ✅ 지원 | .a 파일 |
| **Android** | - | 🔄 추후 지원 예정 | - |

## iOS SDK (BornIDSDK)

### 설치

현재 SDK는 `.a` 파일 형태로 제공할 예정입니다. 
설치 방법에 대한 자세한 내용은 아래 이메일로 문의해 주세요.

**문의**: info.bornid@digicaps.com

### 초기화

```swift
import BornIDSDK

// SDK 설정
BornIDSDK.shared.configure(baseURL: URL, apiKey: String)
```

## API 레퍼런스

### 사용자 인증

사용자 계정으로 로그인하여 SDK의 모든 기능을 사용할 수 있습니다.

```swift
// 로그인
BornIDSDK.shared.login(email: String, password: String) async throws -> User

// 사용법
let user = try await BornIDSDK.shared.login(email: "user@example.com", password: "password")
```

현재 로그인된 사용자의 세션을 종료합니다.

```swift
// 로그아웃
BornIDSDK.shared.logout() async

// 사용법
await BornIDSDK.shared.logout()
```

사용자가 현재 로그인되어 있는지 확인합니다.

```swift
// 로그인 상태 확인
BornIDSDK.shared.isLoggedIn() async -> Bool

// 사용법
let isLoggedIn = await BornIDSDK.shared.isLoggedIn()
```

최신 사용자 정보를 조회합니다.

```swift
// 사용자 정보 갱신
BornIDSDK.shared.fetchMyProfile() async throws -> User

// 사용법
let user = try await BornIDSDK.shared.fetchMyProfile()
```

### 회사 정보

로그인한 사용자가 속한 회사의 정보를 조회할 수 있습니다.

현재 사용자가 속한 회사의 이름을 가져옵니다.

```swift
// 현재 회사 이름 조회
BornIDSDK.shared.getCurrentCompanyName() async -> String?

// 사용법
let companyName = await BornIDSDK.shared.getCurrentCompanyName()
```

특정 회사의 키 정보를 API에서 직접 조회합니다.

```swift
// 회사 키 정보 조회
BornIDSDK.shared.getCompanyKeys(companyId: String) async throws -> CompanyKeysResponse

// 사용법
let keys = try await BornIDSDK.shared.getCompanyKeys(companyId: "company-id")
```

현재 사용자 회사의 키 정보를 로컬 캐시 또는 API에서 가져옵니다. 로컬에 저장된 키가 있으면 캐시에서 반환하고, 없으면 API로 조회 후 로컬에 저장합니다.

```swift
// 회사 키 정보 조회 (캐시 포함)
BornIDSDK.shared.getCompanyKeysWithCache() async throws -> CompanyKeysResponse

// 사용법
let keys = try await BornIDSDK.shared.getCompanyKeysWithCache()
```


### 미디어 업로드

이미지나 비디오 파일을 서버에 업로드합니다. 위치 정보와 설명을 포함할 수 있으며, 선택적으로 미디어 지문(fingerprint)도 생성할 수 있습니다.

```swift
// 미디어 업로드
BornIDSDK.shared.uploadMedia(
    companyId: String, 
    data: Data, 
    mediaType: MediaType, 
    location: CLLocation, 
    description: String? = nil, 
    fingerprint: Bool? = nil
) async throws -> URL

// 사용법
let uploadURL = try await BornIDSDK.shared.uploadMedia(
    companyId: "company-id",
    data: imageData,
    mediaType: .image,
    location: currentLocation,
    description: "설명",
    fingerprint: true
)
```

### 미디어 목록 조회

특정 사용자가 업로드한 미디어 목록을 페이지 단위로 조회합니다. 한 번에 가져올 개수와 시작점을 지정할 수 있습니다.

```swift
// 미디어 목록 조회
BornIDSDK.shared.listMedia(
    userId: String, 
    limit: Int = 20, 
    offset: Int = 0
) async throws -> MediaListResponse

// 사용법
let mediaList = try await BornIDSDK.shared.listMedia(userId: "user-id", limit: 10)
```

### C2PA 미디어 서명

미디어 파일에 C2PA (Coalition for Content Provenance and Authenticity) 서명을 추가하여 콘텐츠의 진위성과 출처를 보장합니다.

메모리에 있는 미디어 데이터에 C2PA 서명을 추가합니다.

```swift
// 데이터 서명
BornIDSDK.shared.signMedia(
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
let result = BornIDSDK.shared.signMedia(
    assetData: imageData,
    username: "사용자명",
    company: "회사명",
    privateKeyData: privateKey,
    publicKeyData: publicKey,
    format: "jpg",
    latitude: 37.5665,
    longitude: 126.9780
)
```

파일 URL에서 미디어를 읽어 C2PA 서명을 추가합니다.

```swift
// 파일 URL 서명
BornIDSDK.shared.signMedia(
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
let result = BornIDSDK.shared.signMedia(
    assetFileURL: imageURL,
    username: "사용자명",
    company: "회사명",
    privateKeyData: privateKey,
    publicKeyData: publicKey,
    format: "jpg"
)
```

### 미디어 검증

미디어 파일에 포함된 C2PA 서명과 메타데이터를 분석하여 콘텐츠의 진위성을 검증합니다. 조작 여부와 출처 정보를 확인할 수 있습니다.

메모리에 있는 미디어 데이터의 진위성을 검증합니다. 결과는 JSON 형태로 반환됩니다.

```swift
// 데이터 검증
BornIDSDK.shared.verifyMedia(data: Data, ext: String) -> String?

// 사용법
let result = BornIDSDK.shared.verifyMedia(data: imageData, ext: "jpg")
```

파일 시스템에 저장된 미디어 파일의 진위성을 검증합니다. 파일 경로를 통해 접근하여 분석합니다.

```swift
// 파일 검증
BornIDSDK.shared.verifyMedia(fileURL: URL, ext: String) -> String?

// 사용법
let result = BornIDSDK.shared.verifyMedia(fileURL: imageURL, ext: "jpg")
```

### 위치 정보

앱에서 위치 권한을 관리하고 현재 위치 정보를 확인할 수 있습니다.

```swift
// 위치 권한 상태 확인
BornIDSDK.shared.locationAuthorizationStatus() -> CLAuthorizationStatus

// 위치 권한 요청
BornIDSDK.shared.requestLocationPermission()

// 사용법
if BornIDSDK.shared.locationAuthorizationStatus() == .notDetermined {
    BornIDSDK.shared.requestLocationPermission()
}
```

### 설정 관리

SDK의 다양한 설정을 관리할 수 있습니다.

```swift
// 설정 매니저 접근
BornIDSDK.shared.getSettingsManager() -> SettingsManager

// 사용법
let settingsManager = BornIDSDK.shared.getSettingsManager()
```

### 카메라 기능

SDK에 내장된 카메라 화면을 표시하여 사진을 촬영할 수 있습니다. 촬영과 동시에 메타데이터를 수집하고 C2PA 서명을 적용할 수 있습니다.

```swift
// 카메라 화면 표시
BornIDSDK.shared.presentCamera(from: UIViewController, delegate: CameraViewControllerDelegate)

// 사용법
BornIDSDK.shared.presentCamera(from: self, delegate: self)
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

### User
```swift
struct User {
    let id: String
    let email: String
    let name: String
    let companyId: String
    // 기타 사용자 정보
}
```

### Company
```swift
struct Company {
    let id: String
    let name: String
    // 기타 회사 정보
}
```

### MediaListResponse
```swift
struct MediaListResponse {
    let media: [Media]
    let totalCount: Int
    let hasMore: Bool
    // 기타 응답 정보
}
```

### CompanyKeysResponse
```swift
struct CompanyKeysResponse {
    let publicKey: String
    let privateKey: String
}
```

## 에러 처리

SDK의 모든 비동기 함수는 Swift의 표준 에러 처리 방식을 사용합니다:

```swift
do {
    let user = try await BornIDSDK.shared.login(email: email, password: password)
    // 성공 처리
} catch {
    // 에러 처리
    print("오류: \(error.localizedDescription)")
}
```

## 지원 및 문의

### 기술 지원

- **이메일**: [info.bornid@digicaps.com](mailto:info.bornid@digicaps.com)

### 시스템 요구사항

- **iOS**: 15.0 이상
- **Xcode**: 14.0 이상
- **Swift**: 5.0 이상

---
