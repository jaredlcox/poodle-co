export type PastPuppyPhoto = {
  src: string
  age: string
}

export type PastPuppy = {
  id: string
  name: string
  puppy?: PastPuppyPhoto
  adult?: PastPuppyPhoto
}

/** At least one of puppy or adult must be set per entry. Puppy litter names ↔ adult names are paired in comments where known. */
export const pastPuppies: PastPuppy[] = [
  {
    id: "caramella",
    name: "Caramella",
    puppy: { src: "/past-litters/as-puppies/Ruby week 6.png", age: "6 weeks old" },
    adult: { src: "/past-litters/as-adults/caramella.jpg", age: "All grown up" },
  },
  {
    id: "ernie",
    name: "Ernie",
    puppy: { src: "/past-litters/as-puppies/Cupid wk6.png", age: "6 weeks old" },
    adult: { src: "/past-litters/as-adults/Ernie.jpg", age: "All grown up" },
  },
  {
    id: "kodak",
    name: "Kodak",
    puppy: { src: "/past-litters/as-puppies/Romeo wk3.png", age: "3 weeks old" },
    adult: { src: "/past-litters/as-adults/kodak.jpg", age: "All grown up" },
  },
  {
    id: "myla",
    name: "Myla",
    puppy: { src: "/past-litters/as-puppies/Amour wk6.5.png", age: "6.5 weeks old" },
    adult: { src: "/past-litters/as-adults/myla1.jpg", age: "All grown up" },
  },
  {
    id: "penny-velvet",
    name: "Penny (Velvet)",
    puppy: { src: "/past-litters/as-puppies/Velvet wk6.5.png", age: "6.5 weeks old" },
    adult: { src: "/past-litters/as-adults/penny  .jpg", age: "All grown up" },
  },
  {
    id: "penny-rose",
    name: "Penny (Rose)",
    puppy: { src: "/past-litters/as-puppies/rose wk4.png", age: "4 weeks old" },
    adult: { src: "/past-litters/as-adults/penny  .jpg", age: "All grown up" },
  },
  {
    id: "poppie",
    name: "Poppie",
    puppy: { src: "/past-litters/as-puppies/Juliet wk4.png", age: "4 weeks old" },
    adult: { src: "/past-litters/as-adults/poppie.jpg", age: "All grown up" },
  },
  {
    id: "winnie",
    name: "Winnie",
    puppy: { src: "/past-litters/as-puppies/Scarlett wk 4.png", age: "4 weeks old" },
    adult: { src: "/past-litters/as-adults/Winnie .jpg", age: "All grown up" },
  },
  {
    id: "buddy",
    name: "Buddy",
    puppy: { src: "/past-litters/as-puppies/buddywk2.png", age: "2 weeks old" },
  },
  {
    id: "cocoa",
    name: "Cocoa",
    puppy: { src: "/past-litters/as-puppies/cocoa wk2.png", age: "2 weeks old" },
  },
  {
    id: "crystal",
    name: "Crystal",
    puppy: { src: "/past-litters/as-puppies/crystal wk2.png", age: "2 weeks old" },
  },
  {
    id: "frosty",
    name: "Frosty",
    puppy: { src: "/past-litters/as-puppies/Frosty wk1.png", age: "1 week old" },
  },
  {
    id: "moose",
    name: "Moose",
    puppy: { src: "/past-litters/as-puppies/Moose wk2.png", age: "2 weeks old" },
  },
  {
    id: "winter",
    name: "Winter",
    puppy: { src: "/past-litters/as-puppies/winter wk1.png", age: "1 week old" },
  },
]
