/**
 * ============================================================
 * PERSONAL NOTES
 * ============================================================
 * Little personal folded notes for Nishka.
 * ============================================================
 */

export interface Note {
  label: string;
  content: string;
  color?: "rose" | "champagne" | "sage" | "plum" | "ivory";
}

export const notes: Note[] = [
  {
    label: "The Melody Chocolate Story 🍬",
    content: "Pata hai, 28 August ko jab maine tumhe college class me Melody di thi, tab socha bhi nahi tha ki tum meri life ka sabse khoobsurat chapter ban jaogi. Melody me chocolate ho na ho, par tumse milne ke baad meri life me sach me bohot saari mithaas aa gayi!",
    color: "rose",
  },
  {
    label: "Holding Your Hand on 5th Sep 🤝",
    content: "5 September ko jab pehli baar college me tumhara haath pakda tha... sach bolu toh meri heartbeat 200 par thi! Par jaise hi tumne apna haath wahan rehne diya, mujhe laga ki duniya ka sabse sukoon bhara kona mil gaya hai.",
    color: "champagne",
  },
  {
    label: "17 September & Shopping Center 💋",
    content: "Wo shopping center ke piche wali gali aur tumhare gaal par wo pehli pyaari si kiss... uske baad tumhara wo sharmaana aur blush karna — wo scene meri aankhon me freeze ho chuka hai. It will forever be my favourite memory.",
    color: "plum",
  },
  {
    label: "That '2345678910' Call 📞",
    content: "23 October ki raat ko jab tumne call par achanak '2345678910' bola... jab samajh aaya ki isme '1' miss hai kyunki 'Ek tu hi hai'... us raat mere chehre se smile hat hi nahi rahi thi. Tumne mujhe kitna special feel karwaya, tumhe andaza bhi nahi hai.",
    color: "rose",
  },
  {
    label: "Your Laugh That Stops Time ✨",
    content: "Jab tum khul kar hasti ho na, toh aas-paas sab kuch blur ho jata hai. Humari Garba wali photo me bhi tum bas has rahi ho aur main tumhe dekh raha hoon... and honestly, main poori zindagi tumhe bas aise hi haste hue dekhna chahta hoon.",
    color: "sage",
  },
  {
    label: "What I Want to Tell You Every Day ❤️",
    content: "No matter how busy life gets, ya hum kitni bhi faltu baaton par lad lein — meri subah tumse shuru hoti hai aur din tumhari aawaaz sune bina adhoora rehta hai. You mean everything to me, Nishka.",
    color: "ivory",
  },
];
