# Data Management Guide for Poodle & Co.

## Overview

Your website now uses a centralized `data/data.json` file to manage all content, images, and text across the site. This makes it easy to update your website without editing multiple component files.

## What's Been Updated

### ✅ Components Using data.json:
1. **Navigation** - Site name and navigation links
2. **Footer** - Social links, contact info, quick links
3. **Photo Carousel** - Gallery images
4. **Reviews Page** - All customer reviews

### 📝 Pages Still Using Hardcoded Data:
- Home page (hero, values, testimonials, CTA sections)
- Who We Are page
- Our Dogs page  
- Available Puppies page
- Upcoming Litters page
- Contact page

*(These can be updated to use data.json following the same pattern)*

## How to Use data.json

### Location
```
/data/data.json
```

### Structure
The JSON file is organized by page/section:
```json
{
  "site": { ... },           // Global site info
  "home": { ... },           // Home page content
  "whoWeAre": { ... },       // Who We Are page
  "ourDogs": { ... },        // Breeding dogs
  "reviews": { ... },        // Customer reviews
  "contact": { ... },        // Contact information
  "footer": { ... }          // Footer content
}
```

## Common Updates

### 1. Update Contact Email

**Location:** Multiple places in `data.json`

```json
{
  "contact": {
    "email": "newemail@example.com"
  },
  "footer": {
    "contact": {
      "email": "newemail@example.com"
    }
  }
}
```

### 2. Update Social Media Links

**Location:** `contact.social` and `footer.social`

```json
{
  "social": {
    "instagram": "https://instagram.com/your_handle",
    "facebook": "https://www.facebook.com/your_page"
  }
}
```

### 3. Update Locations

**Location:** `contact.locations` and `footer.contact.locations`

```json
{
  "contact": {
    "locations": [
      "City Name, State",
      "Another City, State"
    ]
  },
  "footer": {
    "contact": {
      "locations": "City Name, State & Another City, State"
    }
  }
}
```

### 4. Add/Edit Reviews

**Location:** `reviews.reviews` array

```json
{
  "reviews": {
    "reviews": [
      {
        "name": "Customer Name",
        "location": "City, State",
        "rating": 5,
        "text": "Their review text here...",
        "image": "/path/to/image.jpg"
      }
    ]
  }
}
```

### 5. Update Navigation Links

**Location:** `site.navigation` array

```json
{
  "site": {
    "navigation": [
      { "href": "/page-url", "label": "Page Name" }
    ]
  }
}
```

### 6. Update Breeding Dogs

**Location:** `ourDogs.dogs` array

```json
{
  "ourDogs": {
    "dogs": [
      {
        "name": "Dog Name",
        "gender": "Male/Female",
        "color": "Color",
        "weight": "XX lbs",
        "traits": ["Trait 1", "Trait 2", "Trait 3"],
        "health": "Health testing information",
        "image": "/path/to/dog-image.jpg"
      }
    ]
  }
}
```

### 7. Update Available Puppies

**Location:** `availablePuppies.puppies` array

```json
{
  "availablePuppies": {
    "puppies": [
      {
        "name": "Puppy Name",
        "gender": "Male/Female",
        "color": "Color",
        "birthDate": "YYYY-MM-DD",
        "personality": "Description of personality",
        "status": "Available" or "Reserved",
        "image": "/path/to/puppy-image.jpg"
      }
    ]
  }
}
```

### 8. Update Gallery Photos

**Location:** `home.gallery.photos` array

```json
{
  "home": {
    "gallery": {
      "photos": [
        {
          "id": 1,
          "image": "/path/to/photo.jpg",
          "alt": "Description for accessibility"
        }
      ]
    }
  }
}
```

### 9. Update Past Puppies

**Location:** `pastPuppies.puppies` array

```json
{
  "pastPuppies": {
    "puppies": [
      {
        "id": 1,
        "name": "Puppy Name",
        "puppyImage": "/path/to/puppy-photo.jpg",
        "adultImage": "/path/to/adult-photo.jpg",
        "puppyAge": "8 weeks old",
        "adultAge": "2 years old"
      }
    ]
  }
}
```

**Note:** Each puppy needs both a `puppyImage` (baby photo) and `adultImage` (grown-up photo) for the before/after view.

## Image Path Format

All images should be referenced with a leading slash (`/`), which points to the `/public` folder:

```json
"/image-name.jpg"  // Points to /public/image-name.jpg
```

## Tips

1. **Always use valid JSON syntax** - Use a JSON validator if unsure
2. **Keep backups** - Save a copy before making major changes
3. **Test locally first** - Run `npm run dev` and check your changes
4. **Use consistent formatting** - Keep the same structure for similar items
5. **Quote all strings** - All text must be in "quotes"
6. **Arrays need commas** - Except after the last item

## Validation

Before deploying changes, validate your JSON:
- Use an online JSON validator (jsonlint.com)
- Or check in your code editor (most will highlight JSON errors)

## Example: Adding a New Review

1. Open `data/data.json`
2. Find the `reviews.reviews` array
3. Add a new object with a comma before it:

```json
{
  "reviews": {
    "reviews": [
      // ... existing reviews ...
      ,
      {
        "name": "New Customer",
        "location": "New City, ST",
        "rating": 5,
        "text": "Amazing experience!",
        "image": "/new-customer-photo.jpg"
      }
    ]
  }
}
```

4. Save the file
5. Your website will automatically use the new review!

## Getting Help

If you need to make changes beyond simple text/image updates:
1. Follow the existing patterns in data.json
2. Check that your JSON is valid
3. Test locally before deploying
4. Refer to this guide for common updates

## Future Enhancements

To use data.json in pages that aren't yet converted:
1. Import the data: `import data from "@/data/data.json"`
2. Replace hardcoded values with references like `data.reviews.title`
3. Use `.map()` for arrays of items

Example:
```jsx
import data from "@/data/data.json"

export default function MyPage() {
  return (
    <div>
      <h1>{data.mySection.title}</h1>
      {data.mySection.items.map((item) => (
        <p key={item.id}>{item.text}</p>
      ))}
    </div>
  )
}
```

