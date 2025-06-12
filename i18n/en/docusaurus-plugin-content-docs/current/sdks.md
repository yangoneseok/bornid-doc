---
title: SDKs
sidebar_position: 4
---

# Software Development Kits (SDKs)

DigiCAP provides SDKs for various programming languages to easily integrate Content Authenticity services. Each SDK includes metadata generation, fingerprint recognition, and content verification features.

## Supported Languages

| Language | Version | Status | Installation |
|----------|---------|--------|--------------|
| **JavaScript/Node.js** | v2.1.0 | ✅ Stable | `npm install @digicap/content-auth` |
| **Python** | v2.0.5 | ✅ Stable | `pip install digicap-content-auth` |
| **Java** | v1.8.3 | ✅ Stable | Maven/Gradle |
| **Swift/iOS** | v1.5.0 | ✅ Stable | CocoaPods/SPM |
| **Kotlin/Android** | v1.5.0 | ✅ Stable | Maven |
| **Go** | v1.2.0 | 🔄 Beta | `go get github.com/digicap/go-sdk` |
| **C#/.NET** | v1.1.0 | 🔄 Beta | NuGet |

## JavaScript SDK

### Installation

```bash
npm install @digicap/content-auth
# or
yarn add @digicap/content-auth
```

### Basic Usage

```javascript
import { DigiCAPClient } from '@digicap/content-auth';

// Initialize client
const client = new DigiCAPClient({
  apiKey: 'your-api-key-here',
  environment: 'production' // or 'sandbox'
});

// Add metadata to image
async function addMetadata() {
  try {
    const result = await client.metadata.create({
      file: './image.jpg',
      metadata: {
        title: 'Sample Image',
        creator: 'photographer@example.com',
        description: 'A beautiful sunset photo'
      },
      sign: true // Add digital signature
    });
    
    console.log('Metadata added:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Generate and register fingerprint
async function generateFingerprint() {
  try {
    const fingerprint = await client.fingerprint.generate({
      file: './image.jpg',
      register: true // Auto-register to database
    });
    
    console.log('Fingerprint ID:', fingerprint.id);
    console.log('Vector length:', fingerprint.vector.length);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Verify content
async function verifyContent() {
  try {
    const verification = await client.verify({
      file: './image.jpg',
      checkMetadata: true,
      checkFingerprint: true,
      checkDeepfake: true
    });
    
    console.log('Verification result:', verification);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Python SDK

### Installation

```bash
pip install digicap-content-auth
```

### Basic Usage

```python
from digicap_content_auth import DigiCAPClient
import asyncio

# Initialize client
client = DigiCAPClient(
    api_key="your-api-key-here",
    environment="production"
)

# Synchronous method
def create_signed_content():
    # Add metadata and signature
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

# Asynchronous method
async def verify_content_async():
    verification = await client.verify_async(
        file_path="./suspicious_image.jpg",
        check_metadata=True,
        check_fingerprint=True,
        check_deepfake=True
    )
    
    return verification

# Batch processing
def process_batch():
    image_files = ["img1.jpg", "img2.jpg", "img3.jpg"]
    
    results = client.batch_process(
        files=image_files,
        operations=["fingerprint", "metadata"],
        max_workers=4
    )
    
    for file_path, result in results.items():
        print(f"{file_path}: {result.status}")

# Execute
if __name__ == "__main__":
    # Synchronous execution
    create_signed_content()
    
    # Asynchronous execution
    asyncio.run(verify_content_async())
    
    # Batch processing
    process_batch()
```

## Common Features

### Error Handling

All SDKs provide consistent error handling:

```javascript
// JavaScript
try {
  const result = await client.verify(params);
} catch (error) {
  switch (error.code) {
    case 'INVALID_API_KEY':
      console.log('Invalid API key');
      break;
    case 'FILE_TOO_LARGE':
      console.log('File size too large');
      break;
    case 'UNSUPPORTED_FORMAT':
      console.log('Unsupported file format');
      break;
    default:
      console.log('Unknown error:', error.message);
  }
}
```

### Configuration Options

```javascript
const client = new DigiCAPClient({
  apiKey: 'your-api-key',
  environment: 'production', // 'sandbox' or 'production'
  timeout: 30000, // 30 second timeout
  retryAttempts: 3, // Retry count
  enableLogging: true, // Debug logging
  baseURL: 'https://api.digicap.com/v1' // Custom endpoint
});
```

## Support and Contact

### Technical Support

- **Developer Portal**: [https://developers.digicap.com](https://developers.digicap.com)
- **API Documentation**: [https://docs.digicap.com/api](https://docs.digicap.com/api)
- **GitHub Repository**: [https://github.com/digicap/sdks](https://github.com/digicap/sdks)
- **Email Support**: [dev-support@digicap.com](mailto:dev-support@digicap.com)

### Community

- **Discord**: [DigiCAP Developer Community](https://discord.gg/digicap-dev)
- **Stack Overflow**: Use `digicap` tag
- **YouTube**: [DigiCAP Developer Channel](https://youtube.com/digicap-dev)

---

For more examples and tutorials, visit [Developer Documentation](https://developers.digicap.com). 