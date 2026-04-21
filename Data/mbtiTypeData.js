/**
 * MBTI 16 Personality Types — Exhaustive Data
 * 
 * Synchronized with frontend personalityData.js
 */

const mbtiTypeData = {
  INTJ: {
    name: "The Architect",
    category: "Analyst",
    summary: "INTJs are one of the rarest personality types, making up about 2% of the population. They combine a vivid imagination with fierce determination and a razor-sharp mind. Often described as 'the mastermind,' INTJs are natural planners who are never satisfied with the status quo. They constantly seek improvement — in themselves, their systems, and the world around them. They trust logic and reason above emotions and can appear cold or aloof to those who don't know them well. However, beneath this exterior lies a deep inner world of ideas and visions that they are fiercely protective of.",
    strengths: ["Strategic and long-term thinkers", "Highly independent and self-reliant", "Determined and driven", "Open-minded to new ideas", "Deeply intelligent and knowledgeable", "Hard-working and decisive"],
    weaknesses: ["Arrogant and dismissive of others' ideas", "Overly critical and perfectionistic", "Emotionally distant", "Impatient with inefficiency", "Difficulty expressing feelings", "Reluctant to accept outside help"],
    famousPeople: ["Elon Musk", "Stephen Hawking", "Friedrich Nietzsche", "Mark Zuckerberg", "Christopher Nolan"],
    learningStyle: "You learn best through structured, self-directed study. You prefer to understand the 'why' behind concepts and enjoy deep research.",
    workStyle: "INTJs thrive in environments that challenge their intellect and allow for autonomy. They are excellent at systems thinking, long-term planning, and identifying flaws in complex strategies. They prefer working alone or in small, competent teams. They have little patience for bureaucracy or what they see as pointless procedures.",
    relationships: "INTJs are highly selective in relationships. They seek intellectual compatibility above all else. In romance, they are loyal and committed but may struggle to express affection openly. They prefer depth over breadth in friendships and find small talk draining.",
    growth: "INTJs grow by learning to value emotional intelligence, practicing patience with others, opening themselves to feedback, and cultivating personal relationships. They benefit from developing their inferior Extraverted Sensing function — being more present, spontaneous, and physically engaged with the world.",
    functions: "Dominant: Introverted Intuition (Ni) | Auxiliary: Extraverted Thinking (Te) | Tertiary: Introverted Feeling (Fi) | Inferior: Extraverted Sensing (Se)",
    tips: [
      "Respect their need for solitude and deep focus by scheduling meetings in advance",
      "Present ideas logically and be prepared to defend your reasoning with data",
      "Directness is valued; avoid excessive small talk or emotional appeals during problem-solving",
      "Acknowledge their long-term vision and help them identify practical steps to achieve it"
    ]
  },
  INTP: {
    name: "The Logician",
    category: "Analyst",
    summary: "INTPs are rare, making up about 3% of the population. They are the quintessential abstract thinkers — endlessly analyzing, theorizing, and questioning everything. They prize intelligence and honesty above all, and they are perpetually searching for universal truths. INTPs are driven by an intense desire to understand how things work at the deepest level. They often lose track of time when engrossed in a problem and can be oblivious to the world around them when absorbed in thought.",
    strengths: ["Logical and objective", "Creative and inventive", "Open-minded", "Enthusiastic about ideas", "Objective and impartial", "Highly analytical"],
    weaknesses: ["Disconnected from emotions", "Can be condescending", "Loathes rules and routine", "Procrastination tendencies", "Difficulty following through", "Socially awkward at times"],
    famousPeople: ["Albert Einstein", "Isaac Newton", "Charles Darwin", "Bill Gates", "Larry Page"],
    learningStyle: "You learn best by questioning everything and building mental models. You prefer theoretical frameworks over rote memorization.",
    workStyle: "INTPs excel in roles that require deep analytical thinking and innovation. They love solving complex problems and developing new theories. They work best when given freedom to explore without micromanagement. Deadlines and routine can stifle their creativity.",
    relationships: "INTPs are intellectually curious partners who love debating ideas and exploring theories with loved ones. They may seem emotionally detached but care deeply. They prefer a small circle of close friends and may find social obligations draining.",
    growth: "INTPs benefit from developing emotional awareness, improving follow-through on projects, engaging with others' feelings, and practicing decisiveness. Learning to value emotional connection as much as intellectual connection leads to deeper, more fulfilling relationships.",
    functions: "Dominant: Introverted Thinking (Ti) | Auxiliary: Extraverted Intuition (Ne) | Tertiary: Introverted Sensing (Si) | Inferior: Extraverted Feeling (Fe)",
    tips: [
      "Engage them with intellectual curiosity and open-ended 'what if' questions",
      "Give them time to mull over complex information before expecting a final decision",
      "Focus on the logic of an argument rather than its delivery or social convenience",
      "Appreciate their unconventional insights; they often see patterns others miss"
    ]
  },
  ENTJ: {
    name: "The Commander",
    category: "Analyst",
    summary: "ENTJs are natural-born leaders, making up about 3% of the population. They are often described as 'the Commander' because they have an innate ability to lead and organize. ENTJs are strategic, goal-oriented, and intensely focused on results. They thrive in leadership positions and are driven by a desire to turn ideas into realities.",
    strengths: ["Efficient and energetic", "Self-confident and charismatic", "Strategic and long-range thinkers", "Natural leaders", "Determined and strong-willed", "Inspiring to others"],
    weaknesses: ["Stubborn and domineering", "Impatient and intolerant", "Cold and ruthless at times", "Arrogant", "Poor handling of emotions", "Difficulty relaxing"],
    famousPeople: ["Steve Jobs", "Margaret Thatcher", "Franklin D Roosevelt", "Napoleon Bonaparte", "Gordon Ramsay"],
    learningStyle: "You learn best in competitive, high-stakes environments where logic and efficiency are prioritized.",
    workStyle: "ENTJs thrive in leadership roles and competitive environments. They are skilled at organizing people and resources toward a common goal. They prefer structured environments where efficiency and logic are prioritized.",
    relationships: "ENTJs are driven partners who bring energy and ambition into relationships. They can be demanding and may inadvertently overwhelm sensitive partners. They value loyalty and intellectual engagement deeply.",
    growth: "ENTJs grow by developing empathy, learning to listen before deciding, valuing emotions in themselves and others, and slowing down to appreciate the present. Cultivating patience and humility enhances their leadership effectiveness.",
    functions: "Dominant: Extraverted Thinking (Te) | Auxiliary: Introverted Intuition (Ni) | Tertiary: Extraverted Sensing (Se) | Inferior: Introverted Feeling (Fi)",
    tips: [
      "Be concise, efficient, and oriented toward results in your communication",
      "Demonstrate competence and a willingness to take ownership of your tasks",
      "Don't take their directness personally; they prioritize efficiency over social niceties",
      "Provide clear evidence of progress and hold yourself accountable to deadlines"
    ]
  },
  ENTP: {
    name: "The Debater",
    category: "Analyst",
    summary: "ENTPs are the ultimate devil's advocates — not because they're contrarian, but because they genuinely enjoy exploring all sides of an argument. Making up about 3% of the population, they are quick, clever, and always ready to challenge assumptions. ENTPs love ideas more than anything and are energized by innovation and possibility.",
    strengths: ["Knowledgeable and quick-witted", "Charismatic and energetic", "Creative and innovative", "Excellent brainstormer", "Enjoys challenging others", "Open-minded"],
    weaknesses: ["Very argumentative", "Insensitive at times", "Intolerant of repetition", "Difficulty focusing", "Avoids practical matters", "Dislikes routine"],
    famousPeople: ["Mark Twain", "Thomas Edison", "Benjamin Franklin", "Barack Obama", "Sacha Baron Cohen"],
    learningStyle: "You learn best through debate and exploring conflicting theories. You enjoy brainstorming and unconventional approaches.",
    workStyle: "ENTPs excel in brainstorming, innovation, and problem-solving roles. They are at their best in dynamic, fast-changing environments where they can challenge existing norms and develop creative solutions. They dislike repetitive tasks.",
    relationships: "ENTPs bring wit and energy to relationships and enjoy partners who can match their intellectual curiosity. They resist emotional vulnerability but care deeply underneath. They prefer stimulating friendships over large social groups.",
    growth: "ENTPs grow by learning to follow through on ideas, developing emotional sensitivity, respecting others' need for consistency, and channeling their debating energy constructively. Practical execution skills dramatically increase their effectiveness.",
    functions: "Dominant: Extraverted Intuition (Ne) | Auxiliary: Introverted Thinking (Ti) | Tertiary: Extraverted Feeling (Fe) | Inferior: Introverted Sensing (Si)",
    tips: [
      "Be prepared for spirited discussions; they explore ideas by playing devil's advocate",
      "Show flexibility and openness to new, even counter-intuitive, possibilities",
      "Avoid forcing them into rigid routines or overly detailed micro-management",
      "Focus on the 'big picture' and the potential for innovation in every situation"
    ]
  },
  INFJ: {
    name: "The Advocate",
    category: "Diplomat",
    summary: "INFJs are the rarest personality type, comprising only about 1-2% of the population. They are idealists who combine deep empathy with a clear vision for how the world could be better. INFJs are both introspective and action-oriented — they don't just dream of a better world, they work tirelessly toward it.",
    strengths: ["Creative and insightful", "Principled and compassionate", "Decisive", "Highly empathetic", "Passionate about their values", "Inspiring leader"],
    weaknesses: ["Sensitive to criticism", "Reluctant to open up", "Perfectionist", "Can burn out easily", "Overly private", "Too idealistic"],
    famousPeople: ["Martin Luther King Jr", "Mother Teresa", "Nelson Mandela", "Taylor Swift", "Plato"],
    learningStyle: "You learn best when material is connected to personal values and human potential. You prefer deep, quiet reflection.",
    workStyle: "INFJs thrive in roles where they can make a meaningful difference. They are skilled at understanding people and complex situations. They prefer collaborative environments built on mutual respect but need alone time to recharge.",
    relationships: "INFJs seek deep, meaningful connections. They are empathetic and nurturing partners who are sensitive to their loved ones' needs. They are very selective in relationships and need a partner who understands their complexity.",
    growth: "INFJs grow by setting healthy boundaries, accepting imperfection, sharing their inner world more openly, and ensuring they care for themselves as much as they care for others.",
    functions: "Dominant: Introverted Intuition (Ni) | Auxiliary: Extraverted Feeling (Fe) | Tertiary: Introverted Thinking (Ti) | Inferior: Extraverted Sensing (Se)",
    tips: [
      "Approach them with sincerity and authenticity; they value deep, meaningful connections",
      "Give them quiet space to process their thoughts and recharge their social battery",
      "Acknowledge their insights into people and motivation; they are often highly intuitive",
      "Be mindful of their values and the impact of decisions on the well-being of others"
    ]
  },
  INFP: {
    name: "The Mediator",
    category: "Diplomat",
    summary: "INFPs are true idealists, always looking for the good in people and events, and searching for their purpose in life. Making up about 4% of the population, they are guided by a deep sense of personal values and a desire for inner harmony. INFPs are creative souls who use their imagination to express their deepest feelings.",
    strengths: ["Empathetic and caring", "Imaginative and open-minded", "Passionate and energetic", "Committed to their values", "Seeks harmony", "Deeply creative"],
    weaknesses: ["Too idealistic", "Self-isolating", "Overly self-critical", "Struggles with criticism", "Impractical", "Emotionally vulnerable"],
    famousPeople: ["J.R.R. Tolkien", "William Shakespeare", "Princess Diana", "Fred Rogers", "John Lennon"],
    learningStyle: "You learn best through creative expression and exploring personal meaning. You thrive in non-judgmental environments.",
    workStyle: "INFPs thrive in environments that allow for creative expression and personal meaning. They work best with minimal conflict and prefer roles where they can help others or contribute to a cause they believe in.",
    relationships: "INFPs are devoted, empathetic partners who care deeply about authenticity in relationships. They are sensitive to conflict and prefer harmonious, emotionally open partnerships. They are highly loyal once they commit.",
    growth: "INFPs grow by developing practical skills, accepting conflict as healthy, challenging their perfectionism, and learning to receive as well as give in relationships.",
    functions: "Dominant: Introverted Feeling (Fi) | Auxiliary: Extraverted Intuition (Ne) | Tertiary: Introverted Sensing (Si) | Inferior: Extraverted Thinking (Te)",
    tips: [
      "Create a safe space for them to express their values and creative ideas without judgment",
      "Be patient and gentle in your feedback, focusing on personal growth and alignment",
      "Respect their need for authenticity; avoid pressuring them into superficial social roles",
      "Show interest in their unique perspective and the 'why' behind their actions"
    ]
  },
  ENFJ: {
    name: "The Protagonist",
    category: "Diplomat",
    summary: "ENFJs are natural-born leaders, full of passion and charisma. Making up about 2-5% of the population, they are often called 'the Protagonist' because they have a gift for bringing out the best in others. ENFJs are idealists who believe in human potential and are driven to help others grow.",
    strengths: ["Receptive and warm", "Reliable and passionate", "Charismatic and inspirational", "Altruistic", "Natural leader", "Excellent communicator"],
    weaknesses: ["Overly idealistic", "Too selfless", "Too sensitive", "Struggles to make tough decisions", "Fluctuating self-esteem", "Difficult to give up on projects"],
    famousPeople: ["Barack Obama", "Oprah Winfrey", "Martin Luther King Jr", "Maya Angelou", "Nelson Mandela"],
    learningStyle: "You learn best through collaboration and helping others grow. You enjoy group discussions and personal connection.",
    workStyle: "ENFJs excel in leadership, teaching, and helping professions. They are skilled at understanding and motivating people. They work best in structured but collaborative environments where their enthusiasm can inspire others.",
    relationships: "ENFJs are devoted, warm, and supportive partners who invest heavily in their relationships. They are attentive to their partner's needs and are natural connectors. They may neglect their own needs in favor of others.",
    growth: "ENFJs grow by setting boundaries, acknowledging their own needs, accepting that they can't please everyone, and developing the capacity for objective, logical analysis alongside their emotional intelligence.",
    functions: "Dominant: Extraverted Feeling (Fe) | Auxiliary: Introverted Intuition (Ni) | Tertiary: Extraverted Sensing (Se) | Inferior: Introverted Thinking (Ti)",
    tips: [
      "Express genuine appreciation for their efforts to support and organize others",
      "Be open to their collaborative approach and invite their input on team dynamics",
      "Provide constructive feedback privately and framed as a way to improve harmony",
      "Engage in conversations about personal growth, goals, and helping the community"
    ]
  },
  ENFP: {
    name: "The Campaigner",
    category: "Diplomat",
    summary: "ENFPs are free spirits who are energized by possibility and connection. Making up about 7% of the population, they are among the most enthusiastic and creative types. ENFPs see life as a rich tapestry of experiences and are always searching for deeper meaning in everything they encounter.",
    strengths: ["Curious and perceptive", "Observant and energetic", "Enthusiastic and optimistic", "Excellent communicator", "Fun and spontaneous", "Creative and imaginative"],
    weaknesses: ["Poor practical skills", "Can overthink", "Gets stressed easily", "Highly emotional", "Difficulty focusing", "Overly accommodating"],
    famousPeople: ["Robin Williams", "Will Smith", "Ellen DeGeneres", "Dr Seuss", "Walt Disney"],
    learningStyle: "You learn best when exploring possibilities and connecting with people. You dislike repetitive, dry material.",
    workStyle: "ENFPs thrive in flexible, creative environments where they can brainstorm, connect with people, and pursue meaningful goals. They are excellent at generating ideas and inspiring others but may struggle with tedious follow-through.",
    relationships: "ENFPs are warm, enthusiastic, and spontaneous partners. They bring joy and excitement to relationships and are deeply committed to authentic emotional connection. They may struggle with routine or constraint in relationships.",
    growth: "ENFPs grow by developing consistency and follow-through, setting healthy boundaries, managing their emotional sensitivity, and learning to be present rather than always looking toward the next exciting thing.",
    functions: "Dominant: Extraverted Intuition (Ne) | Auxiliary: Introverted Feeling (Fi) | Tertiary: Extraverted Thinking (Te) | Inferior: Introverted Sensing (Si)",
    tips: [
      "Validate their enthusiasm and join them in exploring creative, future-oriented ideas",
      "Provide a sense of variety and avoid tethering them to repetitive, mundane tasks",
      "Offer regular positive reinforcement and acknowledge their unique contributions",
      "Be prepared for spontaneous changes in direction as they follow new inspirations"
    ]
  },
  ISTJ: {
    name: "The Logistician",
    category: "Sentinel",
    summary: "ISTJs are the backbone of many institutions — dependable, methodical, and deeply responsible. Making up about 11-14% of the population, they are one of the most common types. ISTJs have a strong sense of duty and take their commitments very seriously. They are steady, reliable people who prefer proven methods over innovation.",
    strengths: ["Honest and direct", "Strong-willed and dutiful", "Responsible and calm", "Practical and orderly", "Reliable and trustworthy", "Patient and dedicated"],
    weaknesses: ["Stubborn", "Insensitive", "Always by the book", "Judgmental", "Resistant to change", "Difficulty expressing emotions"],
    famousPeople: ["Queen Elizabeth II", "George Washington", "Jeff Bezos", "Denzel Washington", "Angela Merkel"],
    learningStyle: "You learn best through structured, factual material and clear instructions. You value accuracy and proven methods.",
    workStyle: "ISTJs thrive in structured, stable environments where expectations are clear. They are excellent at managing details, following procedures, and ensuring accuracy. They are dependable colleagues who deliver on their promises.",
    relationships: "ISTJs are committed, dependable partners who take their relationships seriously. They show love through acts of service and reliability rather than emotional expression. They value tradition and stability in partnerships.",
    growth: "ISTJs grow by developing flexibility, opening themselves to new ideas and change, learning to express emotions more freely, and recognizing that innovation can complement tradition rather than threaten it.",
    functions: "Dominant: Introverted Sensing (Si) | Auxiliary: Extraverted Thinking (Te) | Tertiary: Introverted Feeling (Fi) | Inferior: Extraverted Intuition (Ne)",
    tips: [
      "Be reliable, punctual, and consistent in your actions and communication",
      "Use clear facts and concrete examples when explaining new concepts or tasks",
      "Respect established procedures and explain the practical reason for any changes",
      "Give them time to prepare and don't expect immediate pivots on a major plan"
    ]
  },
  ISFJ: {
    name: "The Defender",
    category: "Sentinel",
    summary: "ISFJs are among the most nurturing and giving of all personality types. Making up about 9-14% of the population, they are the quiet force behind many of society's most essential institutions. ISFJs have a tremendous capacity for caring and are devoted to the people and causes they hold dear.",
    strengths: ["Supportive and reliable", "Patient and imaginative", "Observant and enthusiastic", "Loyal and hardworking", "Practical and caring", "Good at remembering details"],
    weaknesses: ["Too altruistic", "Takes things personally", "Represses their feelings", "Overloads themselves", "Reluctant to change", "Too humble"],
    famousPeople: ["Mother Teresa", "Queen Elizabeth II", "Rosa Parks", "Kate Middleton", "Halle Berry"],
    learningStyle: "You learn best when material is presented in a supportive, structured Way. You value tradition and personal connection.",
    workStyle: "ISFJs excel in structured, service-oriented environments. They are detail-oriented, thorough, and committed to quality. They prefer cooperative working environments and are skilled at remembering personal details that help them support their colleagues.",
    relationships: "ISFJs are devoted, loving partners who express care through thoughtful actions. They are attentive to others' needs but may neglect their own. They value long-term commitment and stability deeply.",
    growth: "ISFJs grow by learning to set boundaries, communicating their own needs, embracing change and innovation, and accepting that self-care is not selfish.",
    functions: "Dominant: Introverted Sensing (Si) | Auxiliary: Extraverted Feeling (Fe) | Tertiary: Introverted Thinking (Ti) | Inferior: Extraverted Intuition (Ne)",
    tips: [
      "Show gratitude for the practical ways they support the team and maintain stability",
      "Communicate with warmth and consideration for their feelings and the group's needs",
      "Provide clear instructions and avoid 'surprise' changes to their routine",
      "Acknowledge their attention to detail and the history of what has worked before"
    ]
  },
  ESTJ: {
    name: "The Executive",
    category: "Sentinel",
    summary: "ESTJs are pillars of the community — confident, organized, and deeply committed to upholding standards. Making up about 8-12% of the population, they are natural administrators who love bringing order to chaos. ESTJs believe in doing things the right way and expect others to live up to the same standards.",
    strengths: ["Dedicated and strong-willed", "Direct and honest", "Loyal and patient", "Reliable", "Excellent organizer", "Strong leadership"],
    weaknesses: ["Inflexible and stubborn", "Uncomfortable with unconventional situations", "Judgmental", "Too focused on social status", "Difficulty relaxing", "Difficulty expressing emotions"],
    famousPeople: ["Judge Judy", "Sonia Sotomayor", "George W Bush", "Michelle Obama", "Frank Sinatra"],
    learningStyle: "You learn best through structured, logical material with clear goals. You value authority and established norms.",
    workStyle: "ESTJs excel in management and administration roles. They are skilled at creating order, establishing procedures, and driving teams to meet goals. They prefer clear hierarchies and well-defined roles.",
    relationships: "ESTJs are devoted, loyal partners who take their responsibilities in relationships seriously. They show love through commitment and action. They value clear expectations and traditional relationship structures.",
    growth: "ESTJs grow by developing empathy and emotional intelligence, learning to appreciate diverse perspectives, becoming more flexible, and recognizing that feelings are as valid as facts in human relationships.",
    functions: "Dominant: Extraverted Thinking (Te) | Auxiliary: Introverted Sensing (Si) | Tertiary: Extraverted Intuition (Ne) | Inferior: Introverted Feeling (Fi)",
    tips: [
      "Present information in a structured, organized manner with clear goals and metrics",
      "Be direct and honest; they value straightforwardness and clear expectations",
      "Demonstrate your reliability by following through on commitments consistently",
      "Focus on practical solutions and the most efficient way to achieve the objective"
    ]
  },
  ESFJ: {
    name: "The Consul",
    category: "Sentinel",
    summary: "ESFJs are the social glue that holds communities together. Making up about 9-13% of the population, they are among the most common personality types. ESFJs are deeply attuned to others' emotions and needs, and they find great fulfillment in supporting and nurturing those around them.",
    strengths: ["Strong practical skills", "Loyal and warm-hearted", "Sensitive and caring", "Good at connecting with others", "Reliable and organized", "Likes to help others"],
    weaknesses: ["Too worried about social status", "Inflexible", "Reluctant to innovate", "Vulnerable to criticism", "Often too needy", "Too selfless"],
    famousPeople: ["Taylor Swift", "Bill Clinton", "Jennifer Garner", "Hugh Jackman", "Tyra Banks"],
    learningStyle: "You learn best through collaborative activities and personal interaction. You value social harmony and clear expectations.",
    workStyle: "ESFJs thrive in structured, team-oriented environments where they can use their interpersonal skills to support others. They are excellent at organizing people and events and work hard to maintain harmony in their workplace.",
    relationships: "ESFJs are devoted, attentive partners who invest heavily in making relationships work. They are warm, affectionate, and skilled at creating a comfortable home environment. They may be hurt by criticism or perceived rejection.",
    growth: "ESFJs grow by developing independence, valuing their own opinions regardless of others' approval, becoming more open to change and new ideas, and building internal confidence that doesn't rely solely on external validation.",
    functions: "Dominant: Extraverted Feeling (Fe) | Auxiliary: Introverted Sensing (Si) | Tertiary: Extraverted Intuition (Ne) | Inferior: Introverted Thinking (Ti)",
    tips: [
      "Be appreciative of their efforts to create a positive and inclusive social environment",
      "Use a friendly, collaborative tone and acknowledge the impact on individuals",
      "Be clear about social expectations and participate in team-building activities",
      "Offer help with practical tasks to show your support for their hard work"
    ]
  },
  ISTP: {
    name: "The Virtuoso",
    category: "Explorer",
    summary: "ISTPs are the ultimate pragmatists — observant, analytical, and hands-on. Making up about 4-6% of the population, they are action-oriented problem solvers who love understanding how things work. ISTPs are masters of their craft and bring a cool, calm efficiency to everything they do.",
    strengths: ["Optimistic and energetic", "Creative and practical", "Spontaneous and rational", "Skillful with hands-on work", "Direct and calm", "Master of tools and mechanics"],
    weaknesses: ["Stubborn", "Insensitive", "Private and reserved", "Easily bored", "Dislikes commitment", "Risk-prone behavior"],
    famousPeople: ["Clint Eastwood", "Bruce Lee", "Michael Jordan", "Bear Grylls", "Scarlett Johansson"],
    learningStyle: "You learn best by doing and experimenting. You prefer hands-on problems over theoretical discussions.",
    workStyle: "ISTPs thrive in environments that allow them to work independently with tangible problems. They excel in technical, mechanical, and crisis-management roles. They prefer learning by doing and can become bored with theoretical discussions.",
    relationships: "ISTPs are independent partners who need significant personal space. They show affection through practical help rather than words. They value partners who respect their autonomy and share their love of adventure.",
    growth: "ISTPs grow by developing emotional awareness, making longer-term commitments, communicating their feelings, and channeling their need for stimulation into constructive and sustainable activities.",
    functions: "Dominant: Introverted Thinking (Ti) | Auxiliary: Extraverted Sensing (Se) | Tertiary: Introverted Intuition (Ni) | Inferior: Extraverted Feeling (Fe)",
    tips: [
      "Get straight to the point and focus on the immediate, practical reality of a situation",
      "Respect their need for autonomy and 'hands-on' problem-solving",
      "Avoid over-explaining or getting bogged down in abstract theories",
      "Appreciate their ability to remain calm and pragmatic during a crisis"
    ]
  },
  ISFP: {
    name: "The Adventurer",
    category: "Explorer",
    summary: "ISFPs are true artists — not necessarily in the formal sense, but in how they experience and express themselves through the world. Making up about 8-9% of the population, they are among the most creative and spontaneous types. ISFPs live fully in the present moment and find beauty in everyday life.",
    strengths: ["Charming and sensitive", "Imaginative and open-minded", "Passionate and curious", "Artistic and caring", "Generous and compassionate", "Present-focused"],
    weaknesses: ["Fiercely independent", "Unpredictable", "Easily stressed", "Overly competitive", "Difficulty planning ahead", "Low self-esteem tendencies"],
    famousPeople: ["Michael Jackson", "Frida Kahlo", "Lana Del Rey", "Prince", "Kevin Costner"],
    learningStyle: "You learn best through sensory experience and personal expression. You thrive in flexible, creative environments.",
    workStyle: "ISFPs thrive in environments that allow for creative expression and sensory engagement. They prefer hands-on work and dislike administrative tasks. They work best when given freedom to express their individual style.",
    relationships: "ISFPs are warm, present-focused partners who bring spontaneity and genuine affection to relationships. They are sensitive to criticism and need emotional safety to open up. They show love through acts of service and thoughtful gestures.",
    growth: "ISFPs grow by developing planning skills, building self-confidence, learning to assert their needs, and developing a longer-term perspective on their goals and values.",
    functions: "Dominant: Introverted Feeling (Fi) | Auxiliary: Extraverted Sensing (Se) | Tertiary: Introverted Intuition (Ni) | Inferior: Extraverted Thinking (Te)",
    tips: [
      "Communicate with kindness and respect for their personal space and artistic expression",
      "Allow for flexibility and spontaneity in your plans and collaborations",
      "Show interest in their sensory experiences and appreciation for aesthetic details",
      "Be gentle and supportive when discussing change or sensitive personal topics"
    ]
  },
  ESTP: {
    name: "The Entrepreneur",
    category: "Explorer",
    summary: "ESTPs are the ultimate thrill-seekers — bold, perceptive, and energetically engaged with the world around them. Making up about 4-5% of the population, they are action-oriented individuals who prefer doing to thinking. ESTPs are incredibly perceptive and can read people and situations with remarkable accuracy.",
    strengths: ["Bold and direct", "Perceptive and original", "Practical and action-oriented", "Sociable and fun", "Resourceful", "Athletic and hands-on"],
    weaknesses: ["Impatient and risk-prone", "Unstructured", "May miss the big picture", "Defiant of rules", "Insensitive to others' feelings", "Difficulty with commitment"],
    famousPeople: ["Donald Trump", "Ernest Hemingway", "Jack Nicholson", "Eddie Murphy", "Vin Diesel"],
    learningStyle: "You learn best through direct action and real-world challenges. You prefer immediate results over theoretical study.",
    workStyle: "ESTPs thrive in fast-paced, high-stakes environments where quick decisions matter. They are excellent in sales, crisis management, and entrepreneurship. They prefer action over extended analysis and can adapt instantly to changing circumstances.",
    relationships: "ESTPs are exciting, energetic partners who bring fun and spontaneity to relationships. They are direct in expressing interest but may struggle with deeper emotional intimacy. They need partners who can keep up with their fast-paced lifestyle.",
    growth: "ESTPs grow by developing patience, considering long-term consequences, deepening emotional connections, following through on commitments, and learning to be present rather than always looking toward the next exciting thing.",
    functions: "Dominant: Extraverted Sensing (Se) | Auxiliary: Introverted Thinking (Ti) | Tertiary: Extraverted Feeling (Fe) | Inferior: Introverted Intuition (Ni)",
    tips: [
      "Keep communication fast-paced, energetic, and focused on immediate action",
      "Be prepared to adapt quickly as they respond to real-time opportunities and shifts",
      "Focus on what works right now rather than long-term, theoretical projections",
      "Appreciate their boldness and ability to navigate high-pressure situations with ease"
    ]
  },
  ESFP: {
    name: "The Entertainer",
    category: "Explorer",
    summary: "ESFPs are the life of the party — warm, enthusiastic, and bursting with energy. Making up about 8-9% of the population, they are natural entertainers who find joy in bringing happiness to others. ESFPs live fully in the present and have an infectious zest for life.",
    strengths: ["Bold and original", "Practical and observant", "Excellent people skills", "Spontaneous and energetic", "Fun and loving", "Very sensory-oriented"],
    weaknesses: ["Sensitive and easily bored", "Poor long-term planners", "Unfocused", "Difficulty handling conflict", "Easily distracted", "Avoids difficult tasks"],
    famousPeople: ["Marilyn Monroe", "Elvis Presley", "Jamie Oliver", "Katy Perry", "Adele"],
    learningStyle: "You learn best through sensory engagement and group activities. You value immediate feedback and social connection.",
    workStyle: "ESFPs thrive in social, energetic environments where they can interact with people and bring their enthusiasm to the team. They prefer hands-on, immediate work to abstract planning. They excel in customer-facing and performing roles.",
    relationships: "ESFPs are fun, affectionate, and genuinely loving partners. They bring joy, spontaneity, and warmth to all their relationships. They need emotional validation and may struggle when relationships feel dull or routine.",
    growth: "ESFPs grow by developing long-term planning skills, learning to handle conflict directly, building focus and follow-through, and cultivating a richer inner reflective life to complement their vibrant outward expression.",
    functions: "Dominant: Extraverted Sensing (Se) | Auxiliary: Introverted Feeling (Fi) | Tertiary: Extraverted Thinking (Te) | Inferior: Introverted Intuition (Ni)",
    tips: [
      "Be enthusiastic and expressive; they respond well to positive, high-energy interactions",
      "Join them in activities and experiences rather than just talking about them",
      "Avoid overly technical or dry explanations that might drain their energy",
      "Offer immediate feedback and celebrations for achievements and shared fun"
    ]
  }
};

export default mbtiTypeData;
