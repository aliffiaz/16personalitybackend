/**
 * MBTI 16 Personalities — 60-Question Bank
 * 
 * 15 questions per dimension:
 *   Q1–Q15:  Mind     (I/E)
 *   Q16–Q30: Energy   (N/S)
 *   Q31–Q45: Nature   (T/F)
 *   Q46–Q60: Tactics  (J/P)
 * 
 * 7-point Likert scale: 1 (Strongly Disagree) → 7 (Strongly Agree)
 */

const mbtiQuestions = [
  // ─── Dimension 1: Mind (I/E) — 15 Questions ───
  { id: 1,  text: "You feel energized after spending time with a large group of people.", dimension: "Mind", tag: "E" },
  { id: 2,  text: "You prefer to work through problems by talking them out with others.", dimension: "Mind", tag: "E" },
  { id: 3,  text: "At social gatherings, you often find yourself in the center of conversations.", dimension: "Mind", tag: "E" },
  { id: 4,  text: "You tend to think out loud rather than reflecting quietly.", dimension: "Mind", tag: "E" },
  { id: 5,  text: "You enjoy meeting new people and quickly feel comfortable with strangers.", dimension: "Mind", tag: "E" },
  { id: 6,  text: "After a long day with people, you need time alone to recharge.", dimension: "Mind", tag: "I" },
  { id: 7,  text: "You prefer one-on-one conversations to group discussions.", dimension: "Mind", tag: "I" },
  { id: 8,  text: "You often feel mentally drained after spending several hours in social settings.", dimension: "Mind", tag: "I" },
  { id: 9,  text: "You prefer to process your thoughts before sharing them with others.", dimension: "Mind", tag: "I" },
  { id: 10, text: "You enjoy spending evenings alone or with one close friend more than at parties.", dimension: "Mind", tag: "I" },
  { id: 11, text: "You have a wide social circle and find it easy to make new friends.", dimension: "Mind", tag: "E" },
  { id: 12, text: "You would rather have a few deep relationships than many casual ones.", dimension: "Mind", tag: "I" },
  { id: 13, text: "You tend to take initiative and speak up in group settings.", dimension: "Mind", tag: "E" },
  { id: 14, text: "You find that quiet time alone helps you think more clearly.", dimension: "Mind", tag: "I" },
  { id: 15, text: "You feel comfortable being the center of attention at events.", dimension: "Mind", tag: "E" },

  // ─── Dimension 2: Energy (N/S) — 15 Questions ───
  { id: 16, text: "You prefer practical, concrete information over theories and abstract ideas.", dimension: "Energy", tag: "S" },
  { id: 17, text: "You enjoy imagining possibilities and thinking about future scenarios.", dimension: "Energy", tag: "N" },
  { id: 18, text: "You trust your gut instinct over established methods and proven processes.", dimension: "Energy", tag: "N" },
  { id: 19, text: "You focus more on the present reality than on future possibilities.", dimension: "Energy", tag: "S" },
  { id: 20, text: "You enjoy exploring ideas for their own sake, even without a practical outcome.", dimension: "Energy", tag: "N" },
  { id: 21, text: "You prefer step-by-step instructions over open-ended guidelines.", dimension: "Energy", tag: "S" },
  { id: 22, text: "You are drawn to symbolism, metaphors, and abstract patterns in life.", dimension: "Energy", tag: "N" },
  { id: 23, text: "You find it easier to learn through hands-on experience than reading theory.", dimension: "Energy", tag: "S" },
  { id: 24, text: "You often think about how current events could play out in the far future.", dimension: "Energy", tag: "N" },
  { id: 25, text: "You pay close attention to details and rarely overlook specifics.", dimension: "Energy", tag: "S" },
  { id: 26, text: "You enjoy brainstorming creative solutions even when conventional ones exist.", dimension: "Energy", tag: "N" },
  { id: 27, text: "You rely on what has worked before rather than experimenting with new approaches.", dimension: "Energy", tag: "S" },
  { id: 28, text: "You are more interested in the big picture than in the specific details.", dimension: "Energy", tag: "N" },
  { id: 29, text: "You prefer familiar, proven approaches over experimenting with new ones.", dimension: "Energy", tag: "S" },
  { id: 30, text: "You trust facts and data over hunches and intuitions.", dimension: "Energy", tag: "S" },

  // ─── Dimension 3: Nature (T/F) — 15 Questions ───
  { id: 31, text: "When making decisions, you prioritize logic and objectivity over feelings.", dimension: "Nature", tag: "T" },
  { id: 32, text: "You find it easy to critique others' work without worrying about hurting their feelings.", dimension: "Nature", tag: "T" },
  { id: 33, text: "You often make decisions based on how they will affect people's emotions.", dimension: "Nature", tag: "F" },
  { id: 34, text: "You believe fairness is more important than showing compassion in most situations.", dimension: "Nature", tag: "T" },
  { id: 35, text: "You find it difficult to say no to people even when it inconveniences you.", dimension: "Nature", tag: "F" },
  { id: 36, text: "You prefer working in environments that value harmony over competition.", dimension: "Nature", tag: "F" },
  { id: 37, text: "You can remain emotionally detached when analyzing complex problems.", dimension: "Nature", tag: "T" },
  { id: 38, text: "You place great importance on understanding others' feelings and experiences.", dimension: "Nature", tag: "F" },
  { id: 39, text: "You tend to judge people's actions by the rules rather than by their circumstances.", dimension: "Nature", tag: "T" },
  { id: 40, text: "You make decisions with your heart rather than your head.", dimension: "Nature", tag: "F" },
  { id: 41, text: "You believe telling the truth is more important than sparing someone's feelings.", dimension: "Nature", tag: "T" },
  { id: 42, text: "The happiness and wellbeing of others strongly influences your choices.", dimension: "Nature", tag: "F" },
  { id: 43, text: "You value efficiency over people's comfort when making decisions.", dimension: "Nature", tag: "T" },
  { id: 44, text: "You are sensitive to the emotional atmosphere of the places you're in.", dimension: "Nature", tag: "F" },
  { id: 45, text: "You find debates and intellectual arguments more stimulating than consensus-building.", dimension: "Nature", tag: "T" },

  // ─── Dimension 4: Tactics (J/P) — 15 Questions ───
  { id: 46, text: "You feel stressed when plans change unexpectedly at the last minute.", dimension: "Tactics", tag: "J" },
  { id: 47, text: "You prefer to keep your options open rather than making firm commitments.", dimension: "Tactics", tag: "P" },
  { id: 48, text: "You make to-do lists and follow them closely.", dimension: "Tactics", tag: "J" },
  { id: 49, text: "You work best when you can adapt and respond to things as they come.", dimension: "Tactics", tag: "P" },
  { id: 50, text: "You feel more comfortable with a clear plan than an open-ended situation.", dimension: "Tactics", tag: "J" },
  { id: 51, text: "You often start many projects but struggle to finish them all.", dimension: "Tactics", tag: "P" },
  { id: 52, text: "You prefer to finish one task completely before starting the next.", dimension: "Tactics", tag: "J" },
  { id: 53, text: "You enjoy the process of exploring new things more than closing and finalizing.", dimension: "Tactics", tag: "P" },
  { id: 54, text: "You feel uneasy when things are left unresolved or undecided.", dimension: "Tactics", tag: "J" },
  { id: 55, text: "You tend to be spontaneous rather than sticking to a fixed schedule.", dimension: "Tactics", tag: "P" },
  { id: 56, text: "You feel satisfied after completing tasks and crossing them off your list.", dimension: "Tactics", tag: "J" },
  { id: 57, text: "You find deadlines motivating rather than restricting.", dimension: "Tactics", tag: "J" },
  { id: 58, text: "You prefer flexibility and often change plans when better opportunities arise.", dimension: "Tactics", tag: "P" },
  { id: 59, text: "You like having a structured routine in your daily life.", dimension: "Tactics", tag: "J" },
  { id: 60, text: "You find it hard to commit to a plan when you might miss something better.", dimension: "Tactics", tag: "P" },
];

export default mbtiQuestions;
