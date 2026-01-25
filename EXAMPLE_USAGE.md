# Example: Before & After Using data.json

## 🎯 Real Examples from Your Codebase

### Example 1: Navigation Component

#### Before (Hardcoded)
```jsx
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/our-dogs", label: "Our Dogs" },
  { href: "/past-puppies", label: "Past Puppies" },
  { href: "/upcoming-litters", label: "Upcoming Litters" },
  { href: "/available-puppies", label: "Available Puppies" },
  { href: "/reviews", label: "Customer Reviews" },
  { href: "/contact", label: "Contact Us" },
]

<Link href="/">Poodle & Co.</Link>
```

#### After (Using data.json)
```jsx
import data from "@/data/data.json"

const navLinks = data.site.navigation

<Link href="/">{data.site.name}</Link>
```

#### Result
✅ Change navigation in ONE place (data.json)  
✅ Updates everywhere automatically  
✅ Add/remove/reorder nav items easily

---

### Example 2: Footer Component

#### Before (Hardcoded)
```jsx
<h3>Poodle & Co.</h3>
<p>Dedicated to ethical breeding practices...</p>

<Link href="/who-we-are">Who We Are</Link>
<Link href="/our-dogs">Our Dogs</Link>
<Link href="/available-puppies">Available Puppies</Link>
<Link href="/contact">Contact Us</Link>

<a href="https://instagram.com/poodle_and_co">
  <Instagram />
</a>
<a href="https://www.facebook.com/profile.php?id=100090026601586">
  <Facebook />
</a>
<a href="mailto:poodleco1@gmail.com">
  <Mail />
</a>

<p>Email: poodleco1@gmail.com</p>
<p>Fayetteville, NC & Toledo, OH</p>
```

#### After (Using data.json)
```jsx
import data from "@/data/data.json"

<h3>{data.site.name}</h3>
<p>{data.footer.description}</p>

{data.footer.quickLinks.map((link) => (
  <Link key={link.href} href={link.href}>
    {link.label}
  </Link>
))}

<a href={data.footer.social.instagram}>
  <Instagram />
</a>
<a href={data.footer.social.facebook}>
  <Facebook />
</a>
<a href={`mailto:${data.footer.contact.email}`}>
  <Mail />
</a>

<p>Email: {data.footer.contact.email}</p>
<p>{data.footer.contact.locations}</p>
```

#### Result
✅ Change email once, updates footer everywhere  
✅ Update social links in one place  
✅ Easy to maintain consistency

---

### Example 3: Reviews Page

#### Before (Hardcoded Array)
```jsx
const reviews = [
  {
    name: "Sarah & Michael",
    location: "Portland, OR",
    rating: 5,
    text: "We couldn't be happier with our puppy...",
    image: "/cream-poodle-female.jpg",
  },
  {
    name: "Jennifer L.",
    location: "Seattle, WA",
    rating: 5,
    text: "The care and attention to detail...",
    image: "/placeholder.svg",
  },
  // ... more reviews hardcoded here
]

<h1>Customer Reviews</h1>
<p>Hear from the families...</p>

{reviews.map((review) => (
  <div key={review.name}>
    <h3>{review.name}</h3>
    <p>{review.text}</p>
  </div>
))}
```

#### After (Using data.json)
```jsx
import data from "@/data/data.json"

const reviews = data.reviews.reviews

<h1>{data.reviews.title}</h1>
<p>{data.reviews.description}</p>

{reviews.map((review) => (
  <div key={review.name}>
    <h3>{review.name}</h3>
    <p>{review.text}</p>
  </div>
))}
```

#### Result
✅ Add new reviews by editing data.json  
✅ No code changes needed  
✅ Update title/description easily

---

### Example 4: Photo Carousel

#### Before (Hardcoded)
```jsx
const photos = [
  { id: 1, query: "happy poodle with owner 1" },
  { id: 2, query: "happy poodle with owner 2" },
  { id: 3, query: "happy poodle with owner 3" },
  { id: 4, query: "happy poodle with owner 4" },
  { id: 5, query: "happy poodle with owner 5" },
  { id: 6, query: "happy poodle with owner 6" },
]

<Image
  src={`/happy-poodle-with-owner-.jpg?query=${photo.query}`}
  alt={`Happy poodle family ${photo.id}`}
/>
```

#### After (Using data.json)
```jsx
import data from "@/data/data.json"

const photos = data.home.gallery.photos

<Image
  src={photo.image}
  alt={photo.alt}
/>
```

#### Result
✅ Change gallery images in data.json  
✅ Proper alt text for accessibility  
✅ Easy to add/remove photos

---

## 💡 How to Make Changes Now

### Add a New Review
Edit `data/data.json`:
```json
{
  "reviews": {
    "reviews": [
      {
        "name": "New Customer",
        "location": "City, State",
        "rating": 5,
        "text": "Great experience!",
        "image": "/customer-photo.jpg"
      }
    ]
  }
}
```
**That's it!** The review appears automatically.

### Change Contact Email
Edit `data/data.json`:
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
**That's it!** Email updates on Contact page AND Footer.

### Update Social Media Links
Edit `data/data.json`:
```json
{
  "footer": {
    "social": {
      "instagram": "https://instagram.com/new_handle",
      "facebook": "https://www.facebook.com/new_page"
    }
  }
}
```
**That's it!** Links update in Footer automatically.

---

## 🎨 The Power of Centralized Data

### Before
- Need to update email in 5 different files
- Navigation changes require editing navigation.tsx
- Adding a review means editing reviews/page.tsx
- Social links scattered across multiple components
- Hard to keep everything consistent

### After
- Update email ONCE in data.json
- Navigation changes in data.json
- Add reviews in data.json
- All social links in ONE place
- Consistency guaranteed

---

## 🚀 Quick Start

1. Open `data/data.json`
2. Find what you want to change
3. Edit the value
4. Save
5. See the change on your website!

No code editing required! 🎉

---

## 📖 More Help

- See `DATA_MANAGEMENT_GUIDE.md` for detailed instructions
- See `CENTRALIZED_DATA_SUMMARY.md` for technical details
- Look at `data/data.json` for the data structure


