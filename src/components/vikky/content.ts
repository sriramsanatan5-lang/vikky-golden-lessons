export const PHOTOS = {
  desk: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=75",
  deskShare:
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&h=630&q=70",
  blocks: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=75",
};

export const NAV = [
  { label: "How it teaches", id: "lesson" },
  { label: "For parents", id: "parents" },
  { label: "Questions", id: "questions" },
] as const;

export const QUESTION_CARDS = [
  { subject: "Maths", age: 11, q: "What is 1/2 + 1/4?" },
  { subject: "Science", age: 8, q: "Why does ice float on water?" },
  { subject: "English", age: 10, q: "When do I use 'its' and when 'it's'?" },
  { subject: "Maths", age: 7, q: "How many tens are in 340?" },
  { subject: "Science", age: 13, q: "Why do plants need sunlight?" },
  { subject: "Maths", age: 15, q: "How do I solve 2x + 5 = 17?" },
  { subject: "English", age: 6, q: "What does 'enormous' mean?" },
  { subject: "Science", age: 12, q: "What makes a magnet stick?" },
  { subject: "Maths", age: 9, q: "Is 0.5 bigger than 0.45?" },
] as const;

export const LESSON_STEPS = [
  {
    name: "Explain",
    fractions: ["1/2"],
    text: "This bar is cut into two equal parts. One part is coloured, so it shows one half.",
  },
  {
    name: "Simpler",
    fractions: ["1/2", "1/4"],
    text: "Here is one quarter: the same bar cut into four equal parts, with one part coloured.",
  },
  {
    name: "Hint",
    fractions: ["2/4", "1/4"],
    text: "The pieces are different sizes. Cut the half into quarters too, so every piece is the same.",
  },
  {
    name: "Check",
    fractions: ["?/4"],
    text: "Now push the pieces together. How many quarters are coloured?",
  },
  {
    name: "Star",
    fractions: ["3/4"],
    text: "Three quarters. You worked it out yourself: 1/2 + 1/4 = 3/4.",
  },
] as const;

export const PARENT_FEATURES = [
  {
    title: "Study hours",
    text: "Lessons open only in the hours you choose. Your PIN unlocks the rest.",
  },
  {
    title: "Homework",
    text: "Set up to ten questions and see each one started, finished and how it went.",
  },
  {
    title: "What Vikky keeps",
    text: "Choose lesson history, a learning record and notes. Switch one off and it is erased.",
  },
  {
    title: "Read aloud",
    text: "Every explanation can be spoken in an Indian-English voice, with the words on screen.",
  },
] as const;

export const WEEK = [
  { day: "Mon", min: 18 },
  { day: "Tue", min: 25 },
  { day: "Wed", min: 0 },
  { day: "Thu", min: 30 },
  { day: "Fri", min: 22 },
  { day: "Sat", min: 35 },
  { day: "Sun", min: 12 },
] as const;

export const RECENT_LESSONS = [
  { topic: "Adding fractions, different bottoms", status: "Understood it", hints: 1 },
  { topic: "Times tables", status: "Still practising", hints: 2 },
  { topic: "Parts of a plant", status: "Understood it", hints: 0 },
] as const;

export const FAQS = [
  {
    q: "Does Vikky give the answer?",
    a: "Not straight away. It explains, makes it simpler and gives hints first. The answer comes at the end, after your child has had a real try.",
  },
  {
    q: "Which subjects and ages?",
    a: "Maths, Science and English, plus everyday schoolwork, for children aged 3 to 16. Vikky changes its words and pictures to suit your child's age.",
  },
  {
    q: "Can Vikky be wrong?",
    a: "It can. That is why Vikky checks its working step by step, and why you can open every lesson, read what was said and flag anything that looks off.",
  },
  {
    q: "What happens to my child's data?",
    a: "You decide. Choose whether Vikky keeps lesson history, a learning record and notes. Switch any of them off and it is erased straight away.",
  },
  {
    q: "How much does it cost?",
    a: "Sign up in a minute and try a lesson with your child first. Choose a family plan only once you have seen how Vikky teaches.",
  },
] as const;

export function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h} h ${m} min`;
}
