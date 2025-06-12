---
title: BornID Metadata
sidebar_position: 2
---

# BornID Metadata

BornID Metadata is the core technology that ensures the origin and authenticity of digital content. Through a metadata system based on C2PA standards, it can track the entire process from content creation to distribution.

## Overview

The BornID Metadata system securely records the following information:

- **Creation Information**: When, where, and by whom the content was created
- **Edit History**: All changes made to the content and editing tool information
- **Distribution Path**: The routes through which content was propagated
- **Verification Status**: Current integrity status of the content

## Metadata Structure

### Basic Information

```json
{
  "claim": {
    "dc:title": "Content Title",
    "dc:format": "image/jpeg",
    "tiff:ImageWidth": 1920,
    "tiff:ImageLength": 1080,
    "xmp:CreateDate": "2024-01-15T10:30:00Z",
    "xmp:CreatorTool": "DigiCAP Content Creator v1.0"
  }
}
```

### Signature Information

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

### Provenance Information

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

## Digital Signatures

### X.509 Certificate-based Signatures

BornID uses X.509 certificates based on PKI (Public Key Infrastructure) to generate digital signatures.

**Signing Process:**
1. **Hash Generation**: Calculate SHA-256 hash of content and metadata
2. **Signature Creation**: Digitally sign the hash value with a private key
3. **Certificate Attachment**: Include public key certificate in metadata
4. **Timestamp**: Add trusted time information

### Signature Verification Process

:::info Verification Steps
1. **Certificate Validity**: Check certificate chain and expiration date
2. **Signature Verification**: Verify digital signature with public key
3. **Hash Comparison**: Compare current content hash with signed hash
4. **Timestamp Verification**: Verify validity of signing timestamp
:::

## Metadata Usage

### Metadata Retrieval via API

```bash
curl -X GET "https://api.digicap.com/v1/metadata/{content_id}" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Response Example

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

## Security Considerations

### Privacy Protection

- **Selective Disclosure**: Protect sensitive metadata through encryption
- **Anonymization Options**: Allow creator information to be processed anonymously
- **GDPR Compliance**: Full compliance with European privacy protection regulations

### Tampering Prevention

- **Cryptographic Hash**: Use strong hash algorithms like SHA-256 or higher
- **Chain Linking**: Each editing step is cryptographically linked to the previous step
- **Real-time Verification**: Real-time monitoring of metadata integrity

## Supported Formats

| File Format | Metadata Support | Signature Support | Notes |
|-------------|-----------------|------------------|-------|
| **JPEG** | ✅ | ✅ | EXIF, XMP compatible |
| **PNG** | ✅ | ✅ | XMP metadata |
| **MP4** | ✅ | ✅ | QuickTime metadata |
| **WebP** | ✅ | ✅ | Limited metadata |
| **AVIF** | 🔄 | 🔄 | In development |

---

For more detailed technical specifications, please refer to the [C2PA Official Documentation](https://c2pa.org/specifications/specifications/1.3/specs/C2PA_Specification.html). 