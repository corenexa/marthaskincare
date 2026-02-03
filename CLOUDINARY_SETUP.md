# Cloudinary Integration Guide

## 1. Environment Setup

To use Cloudinary in your project, you need to add your Cloudinary credentials to your `.env` file.

1.  Create an account at [Cloudinary.com](https://cloudinary.com/).
2.  Go to your Dashboard and find your **Cloud Name**, **API Key**, and **API Secret**.
3.  Add the following to your `.env` file in the root of your project:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="djkhjvews"
NEXT_PUBLIC_CLOUDINARY_API_KEY="667197943796989"
CLOUDINARY_API_SECRET="zoWS2NElGupHHpUfwIwj3na-jCE"
```

## 2. Using the Cloudinary Image Component

I have created a reusable component called `CloudinaryImage` in `components/cloudinary-image.tsx`. This component wraps the powerful `next-cloudinary` library to provide automatic optimization and features like background removal.

### How to use it:

Replace your standard `<img>` or `Image` tags with `<CloudinaryImage />`.

```tsx
import CloudinaryImage from "@/components/cloudinary-image"

// ...

<CloudinaryImage
  src={product.image} // This should be the Cloudinary Public ID or URL
  alt={product.name}
  width={400}
  height={400}
  removeBackground={true} // Set to true to automatically remove background
/>
```

## 3. Important: Background Removal

To use the `removeBackground` feature:

1.  **Add-on Required**: You must enable the **"Cloudinary AI Background Removal"** add-on in your Cloudinary Dashboard (Note: This may have a cost associated with it depending on your plan, though there is often a free tier/credits).
2.  **Image Source**: The `src` must be an image hosted on Cloudinary (either a Public ID or a full Cloudinary URL). If you pass a generic URL (like another website), Cloudinary might not be able to process it unless you use "Fetch" features, but best practice is to upload images to Cloudinary first.

## 4. Backend Uploads (Optional)

If you are building an upload feature (e.g., in an admin panel), you should use the Cloudinary Upload Widget or the Node.js SDK to upload images.

For the Upload Widget (Frontend upload):
1.  Include `next-cloudinary`'s `CldUploadWidget`.
2.  Upon successful upload, it returns a `public_id`. Save this `public_id` to your database instead of the full URL.

Example:
```tsx
import { CldUploadWidget } from 'next-cloudinary';

<CldUploadWidget uploadPreset="your_unsigned_preset">
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
```
