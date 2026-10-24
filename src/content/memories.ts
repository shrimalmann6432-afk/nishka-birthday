/**
 * ============================================================
 * MEMORY TIMELINE
 * ============================================================
 * Real shared memories and milestones between us and Nishka.
 * ============================================================
 */

export interface Memory {
  date: string;
  title: string;
  body: string;
  photo?: string;
  location?: string;
  icon?: string;
}

export const memories: Memory[] = [
  {
    date: "28 August",
    title: "The First Meet & The Melody Chocolate 🍬",
    body: "College ki class me wo pehli baar milna... jab maine thoda sa nervous hokar tumhe wo Melody chocolate offer ki thi. 'Melody itni chocolaty kyu hai?' pata nahi, par us ek chocolate se jo humari kahani shuru hui, usne meri poori duniya ko itna meetha aur khoobsurat bana diya.",
    icon: "🍫",
    location: "College Classroom",
  },
  {
    date: "5 September",
    title: "Holding Your Hand for the First Time 🤝",
    body: "College me wo special moment jab maine pehli baar tumhara haath apne haathon me liya tha. Dil itni tezi se dhadak raha tha jaise abhi bahar aa jayega, par tumhara wo soft sa touch aur wo comfort... us pal laga tha ki kaash waqt yahin ruk jaye.",
    icon: "🤝",
    location: "College Campus",
  },
  {
    date: "17 September",
    title: "First Cheek Kiss — My Favourite Memory 💋",
    body: "Shopping center ke piche wali gali, thodi si shaanti, thodi si heartbeat aur bohot saara pyaar... jab maine pehli baar tumhare gaal par gently kiss kiya tha. Tumhara wo sharma kar muskurana aur wo adaa — sach kahun toh ye meri sabse favourite memory hai jo mere dil me hamesha taaza rahegi.",
    icon: "💋",
    location: "Shopping Center ke piche wali gali",
  },
  {
    date: "23 October",
    title: "Late Night Call & '2345678910' 📞",
    body: "Kal raat call par jab tumne wo '2345678910' bola... usne mere dil ko itni bepanah khushi di ki main lafzon me bata nahi sakta! Kyunki usme '1' missing tha — aur 'Ek' sirf tum ho meri zindagi me. Us raat tumhari us ek baat ne mujhe sabse zyada khush kar diya.",
    icon: "✨",
    location: "Late Night Call",
  },
];
