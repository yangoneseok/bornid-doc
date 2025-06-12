---
title: Help
sidebar_position: 5
---

# Help & Support

If you have any questions or issues while using DigiCAP Content Authenticity service, please refer to this page.

## Frequently Asked Questions (FAQ)

### Basic Usage

**Q: How do I get an API key?**
A: You can create an account and get an API key at [DigiCAP Developer Portal](https://developers.digicap.com). The free tier allows up to 1,000 requests per month at no cost.

**Q: What file formats are supported?**
A: Currently supported formats are:
- **Images**: JPEG, PNG, WebP, HEIC
- **Videos**: MP4, MOV, AVI (Beta)
- **Maximum file size**: 50MB

**Q: How long does processing take?**
A: Average processing times:
- Image metadata generation: 1-3 seconds
- Fingerprint generation: 2-5 seconds
- Content verification: 3-8 seconds

### Technical Questions

**Q: How is it compatible with C2PA standards?**
A: DigiCAP fully complies with C2PA 1.3 standards and is compatible with tools from major companies like Adobe and Microsoft.

**Q: How is personal information protected?**
A:
- All data is encrypted with AES-256
- Full compliance with GDPR and CCPA
- Data deletion guaranteed upon user request

**Q: Can it be used offline?**
A: Currently only online API is provided. On-premises solutions are available in enterprise plans.

## Troubleshooting

### Common Errors

#### Authentication Error
```
Error: INVALID_API_KEY
```
**Solution:**
1. Check if API key is correct
2. Verify environment (sandbox/production) settings
3. Check API key expiration date

#### File Upload Error
```
Error: FILE_TOO_LARGE
```
**Solution:**
1. Reduce file size to under 50MB
2. Compress images or adjust resolution
3. Check if it's a supported file format

#### Processing Timeout
```
Error: TIMEOUT
```
**Solution:**
1. Reduce file size
2. Check network connection status
3. Implement retry logic

### SDK-specific Troubleshooting

#### JavaScript/Node.js
```javascript
// Common error handling
try {
  const result = await client.verify(params);
} catch (error) {
  if (error.code === 'ECONNRESET') {
    // Attempt network reconnection
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
    # Wait for rate limit
    time.sleep(e.retry_after)
    result = client.verify(file_path="image.jpg")
```

## Performance Optimization

### File Optimization
- **Images**: Recommended 1920px or below, JPEG quality 80% or higher
- **Videos**: H.264 codec, 30fps or below recommended
- **Compression**: Lossless compression recommended

### API Usage Optimization
```javascript
// Improve efficiency with batch processing
const files = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
const promises = files.map(file => client.verify({ file }));
const results = await Promise.all(promises);
```

### Caching Strategy
```javascript
// Prevent duplicate requests with result caching
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

## Support Channels

### Technical Support

**📧 Email Support**
- General inquiries: [support@digicap.com](mailto:support@digicap.com)
- Developer support: [dev-support@digicap.com](mailto:dev-support@digicap.com)
- Enterprise: [enterprise@digicap.com](mailto:enterprise@digicap.com)

**💬 Live Chat**
- Business hours (weekdays 9-18 KST): [Live Chat](https://digicap.com/chat)
- Average response time: Within 30 minutes

**📞 Phone Support**
- Korea: +82-2-1234-5678
- USA: +1-555-123-4567
- Support hours: Weekdays 9-18 (KST)

### Community

**🎮 Discord**
- [DigiCAP Developer Community](https://discord.gg/digicap-dev)
- 24/7 community support
- Real-time communication with developers

**📚 GitHub**
- [Code Examples](https://github.com/digicap/examples)
- [SDK Source Code](https://github.com/digicap/sdks)
- Issue reporting and feature requests

**🎥 YouTube**
- [DigiCAP Developer Channel](https://youtube.com/digicap-dev)
- Tutorials and webinars
- New feature introductions

## Status Page

Check real-time service status:

**🟢 API Server**: Operating normally
**🟢 Database**: Operating normally
**🟡 File Processing**: Delayed (average +2 seconds)
**🟢 Authentication Server**: Operating normally

[View Full Status Page](https://status.digicap.com)

## Service Level Agreement (SLA)

| Service | Availability Target | Response Time |
|---------|-------------------|---------------|
| **API Endpoints** | 99.9% | < 500ms |
| **File Processing** | 99.5% | < 5 seconds |
| **Technical Support** | - | < 4 hours |

## Feedback

We welcome feedback for service improvement:

**📝 Feedback Forms**
- [Feature Request](https://digicap.com/feature-request)
- [Bug Report](https://digicap.com/bug-report)
- [Usability Improvement](https://digicap.com/ux-feedback)

**⭐ Rate Us**
Please leave a review of our current service:
- [Google Play Store](https://play.google.com/store/apps/details?id=com.digicap.app)
- [App Store](https://apps.apple.com/app/digicap/id123456789)

---

**24/7 Emergency Support**
For critical production issues, contact [emergency@digicap.com](mailto:emergency@digicap.com). 