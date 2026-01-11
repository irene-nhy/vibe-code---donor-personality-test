
import { DonorType, Question } from './types';

export const DONOR_TYPES_INFO: Record<DonorType, {
  description: string;
  characteristics: string[];
  engagement: string;
  opportunities: string[];
  icon: string;
  color: string;
  accent: string;
  priorityIssues: string[];
}> = {
  [DonorType.DEVOUT]: {
    description: "Motivated by religious or moral obligation to help those in need by making their lives better and happier.",
    characteristics: ["Values family and safety", "Driven by duty", "Passive engagement", "Do not seek recognition"],
    engagement: "Prefers communication via Email (64%) and Social Media. Often recruited through roadshows (54%).",
    opportunities: ["Child Protection Programs", "Religious Heritage Fund", "Family Safety Initiatives"],
    icon: "🙏",
    color: "bg-blue-900",
    accent: "text-blue-900",
    priorityIssues: ["Protection of children", "Healthcare", "Education"]
  },
  [DonorType.REALIST]: {
    description: "Motivated by knowledge of money being spent well, while also being able to benefit from tax deductions and solving social problems.",
    characteristics: ["Logic-driven", "Values tax efficiency", "Work-life balance focused", "Low recognition need"],
    engagement: "Prefers Email (67%) and Social Media. Focuses on 'money used wisely' (57%).",
    opportunities: ["Tax-Efficient Giving", "Outcome-Based Grants", "Social Problem Solving"],
    icon: "⚖️",
    color: "bg-purple-600",
    accent: "text-purple-600",
    priorityIssues: ["Protection of children", "Healthcare", "Environment"]
  },
  [DonorType.INNER_PEACE_SEEKER]: {
    description: "Motivated by the mere act of helping those who are disadvantaged; giving validates a positive outlook on life.",
    characteristics: ["Gives for joy", "Values peace of mind", "Emotional outlook", "Passive engagement"],
    engagement: "Prefers Email (65%). Finds joy in the act of giving (62%).",
    opportunities: ["Direct Aid to Disadvantaged", "Mental Health Support", "Joy-of-Giving Campaigns"],
    icon: "🕊️",
    color: "bg-rose-400",
    accent: "text-rose-500",
    priorityIssues: ["Child protection", "Healthcare", "Human rights"]
  },
  [DonorType.ACTIVIST]: {
    description: "Motivated to help by desire to stay actively engaged with a cause they are passionate about.",
    characteristics: ["High engagement", "Active volunteer", "Values new experiences", "Systemic focus"],
    engagement: "Prefers Email (70%) and Social Media (58%). Desires to stay 'actively engaged' (35%).",
    opportunities: ["Volunteer Task Force", "Advocacy Leadership", "Hands-on Field Work"],
    icon: "✊",
    color: "bg-cyan-500",
    accent: "text-cyan-600",
    priorityIssues: ["Education", "Protection of children", "Healthcare"]
  },
  [DonorType.COMMUNITARIAN]: {
    description: "Motivated by desire to make a positive impact on the community and show solidarity with it for a better future.",
    characteristics: ["Solidarity focused", "Values community", "Relationship driven", "Medium engagement"],
    engagement: "High preference for Email (66%). Motivated by 'supporting better future of humanity' (80%).",
    opportunities: ["Local Community Fund", "Solidarity Events", "Future-of-Humanity Projects"],
    icon: "🏙️",
    color: "bg-fuchsia-500",
    accent: "text-fuchsia-600",
    priorityIssues: ["Protection of children", "Healthcare", "Human rights"]
  },
  [DonorType.ADVOCATE]: {
    description: "Motivated by desire to influence and participate in high-impact causes that solve social problems.",
    characteristics: ["Influence seekers", "Risk takers", "Seek recognition", "Active engagement"],
    engagement: "Highly motivated to 'influence which causes get attention' (96%). Prefers Email (65%).",
    opportunities: ["Board Membership", "Influencer Partnerships", "Major Impact Grants"],
    icon: "📢",
    color: "bg-red-600",
    accent: "text-red-600",
    priorityIssues: ["Protection of children", "Healthcare", "Human rights"]
  },
  [DonorType.NETWORKER]: {
    description: "Motivated by desire to gain respect from and access to other givers through similar activities.",
    characteristics: ["Access-driven", "Values respect", "Enjoys networking", "Sharing experiences"],
    engagement: "Wants to feel 'respected' (50%) and 'connected with other givers' (49%).",
    opportunities: ["Donor Networking Circles", "Exclusive Briefings", "Partner Collaborations"],
    icon: "🥂",
    color: "bg-sky-400",
    accent: "text-sky-500",
    priorityIssues: ["Protection of children", "Healthcare", "Education"]
  },
  [DonorType.RECOGNITION_SEEKER]: {
    description: "Motivated by social recognition, respect, and prominence that comes with donating to a well-known cause.",
    characteristics: ["Visibility focused", "Seeks prominence", "Family recognition", "Creative explorer"],
    engagement: "Strongest preference for Social Media (61%). Wants to 'stand out from the crowd' (40%).",
    opportunities: ["Public Gala Recognition", "Social Media Spotlight", "Naming Rights"],
    icon: "🏆",
    color: "bg-indigo-800",
    accent: "text-indigo-800",
    priorityIssues: ["Protection of children", "Human rights", "Healthcare"]
  }
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is your primary reason for supporting a charitable cause?",
    options: [
      { id: '1a', text: "I feel a moral or religious obligation to fulfil my duty.", weights: { [DonorType.DEVOUT]: 5, [DonorType.COMMUNITARIAN]: 2 } },
      { id: '1b', text: "I want to be sure my money is used wisely and efficiently.", weights: { [DonorType.REALIST]: 5, [DonorType.ADVOCATE]: 2 } },
      { id: '1c', text: "It gives me personal joy and a positive outlook on life.", weights: { [DonorType.INNER_PEACE_SEEKER]: 5 } },
      { id: '1d', text: "I want to influence which causes get the most attention.", weights: { [DonorType.ADVOCATE]: 5, [DonorType.RECOGNITION_SEEKER]: 2 } }
    ]
  },
  {
    id: 2,
    text: "How important is it that your contribution is recognized by others?",
    options: [
      { id: '2a', text: "Not at all—I prefer to help quietly without any notice.", weights: { [DonorType.DEVOUT]: 4, [DonorType.REALIST]: 4, [DonorType.INNER_PEACE_SEEKER]: 4 } },
      { id: '2b', text: "Somewhat—I value the respect of my family and friends.", weights: { [DonorType.RECOGNITION_SEEKER]: 5, [DonorType.NETWORKER]: 3 } },
      { id: '2c', text: "Very—I want to stand out and inspire others through my status.", weights: { [DonorType.RECOGNITION_SEEKER]: 4, [DonorType.ADVOCATE]: 3 } }
    ]
  },
  {
    id: 3,
    text: "Which of these values resonates with you most strongly?",
    options: [
      { id: '3a', text: "Family importance and a deep feeling of safety.", weights: { [DonorType.DEVOUT]: 5, [DonorType.REALIST]: 3, [DonorType.INNER_PEACE_SEEKER]: 2 } },
      { id: '3b', text: "Achieving a good work-life balance while helping others.", weights: { [DonorType.REALIST]: 5, [DonorType.INNER_PEACE_SEEKER]: 3 } },
      { id: '3c', text: "Staying actively engaged and open to new ideas.", weights: { [DonorType.ACTIVIST]: 5, [DonorType.COMMUNITARIAN]: 2 } }
    ]
  },
  {
    id: 4,
    text: "In terms of involvement, what describes your ideal relationship with us?",
    options: [
      { id: '4a', text: "Passive: I trust you to do the work while I support financially.", weights: { [DonorType.DEVOUT]: 5, [DonorType.REALIST]: 4, [DonorType.INNER_PEACE_SEEKER]: 4 } },
      { id: '4b', text: "Medium: I enjoy community updates and occasional events.", weights: { [DonorType.COMMUNITARIAN]: 5, [DonorType.NETWORKER]: 4 } },
      { id: '4c', text: "Active: I want to volunteer and participate in the decision-making.", weights: { [DonorType.ACTIVIST]: 5, [DonorType.ADVOCATE]: 4 } }
    ]
  },
  {
    id: 5,
    text: "What is your stance on 'Tax Deductions' for donations?",
    options: [
      { id: '5a', text: "It's a major factor—I prioritize gifts that offer clear benefits.", weights: { [DonorType.REALIST]: 5, [DonorType.ADVOCATE]: 2 } },
      { id: '5b', text: "It's a nice bonus, but not why I give.", weights: { [DonorType.COMMUNITARIAN]: 3, [DonorType.DEVOUT]: 2 } },
      { id: '5c', text: "I don't think about it at all.", weights: { [DonorType.INNER_PEACE_SEEKER]: 4, [DonorType.ACTIVIST]: 3 } }
    ]
  },
  {
    id: 6,
    text: "How do you prefer to connect with other like-minded donors?",
    options: [
      { id: '6a', text: "I'd like to share experiences and gain respect within the group.", weights: { [DonorType.NETWORKER]: 5, [DonorType.RECOGNITION_SEEKER]: 2 } },
      { id: '6b', text: "I prefer to act in solidarity with the community as a whole.", weights: { [DonorType.COMMUNITARIAN]: 5, [DonorType.ACTIVIST]: 2 } },
      { id: '6c', text: "I'm not interested in networking with other donors.", weights: { [DonorType.DEVOUT]: 4, [DonorType.REALIST]: 3 } }
    ]
  },
  {
    id: 7,
    text: "Which of these issues is your absolute top priority?",
    options: [
      { id: '7a', text: "Protection of children and their well-being.", weights: { [DonorType.DEVOUT]: 5, [DonorType.REALIST]: 4, [DonorType.INNER_PEACE_SEEKER]: 3 } },
      { id: '7b', text: "Systemic change through education and advocacy.", weights: { [DonorType.ACTIVIST]: 5, [DonorType.ADVOCATE]: 3 } },
      { id: '7c', text: "Broad healthcare and disease prevention.", weights: { [DonorType.COMMUNITARIAN]: 4, [DonorType.DEVOUT]: 3 } }
    ]
  },
  {
    id: 8,
    text: "What describes your attitude toward social change?",
    options: [
      { id: '8a', text: "Too much freedom leads to disorder; traditions are key.", weights: { [DonorType.DEVOUT]: 5, [DonorType.REALIST]: 2 } },
      { id: '8b', text: "I'm willing to take risks and innovate to solve social problems.", weights: { [DonorType.ADVOCATE]: 5, [DonorType.RECOGNITION_SEEKER]: 3, [DonorType.ACTIVIST]: 3 } },
      { id: '8c', text: "I'm open to new ideas that improve community life.", weights: { [DonorType.COMMUNITARIAN]: 4, [DonorType.NETWORKER]: 3 } }
    ]
  }
];
