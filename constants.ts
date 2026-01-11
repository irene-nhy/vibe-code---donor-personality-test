
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
    text: "What is your primary motivation for giving?",
    options: [
      { id: '1a', text: "I feel I have a moral or religious obligation.", weights: { [DonorType.DEVOUT]: 5 } },
      { id: '1b', text: "I want to be sure my money is used wisely.", weights: { [DonorType.REALIST]: 5 } },
      { id: '1c', text: "Giving gives me joy and a sense of peace.", weights: { [DonorType.INNER_PEACE_SEEKER]: 5 } },
      { id: '1d', text: "I want to influence which causes get more attention.", weights: { [DonorType.ADVOCATE]: 5 } }
    ]
  },
  {
    id: 2,
    text: "How would you describe your ideal connection to a cause?",
    options: [
      { id: '2a', text: "Fulfilling a deep sense of responsibility to the world.", weights: { [DonorType.DEVOUT]: 5 } },
      { id: '2b', text: "Sharing my commitment with my community and family.", weights: { [DonorType.RECOGNITION_SEEKER]: 5 } },
      { id: '2c', text: "Being part of a hands-on, active movement for change.", weights: { [DonorType.ACTIVIST]: 5 } },
      { id: '2d', text: "Building meaningful connections with fellow supporters.", weights: { [DonorType.NETWORKER]: 5 } }
    ]
  },
  {
    id: 3,
    text: "What is the intended outcome of your gift?",
    options: [
      { id: '3a', text: "A better future for humanity through solidarity.", weights: { [DonorType.COMMUNITARIAN]: 5 } },
      { id: '3b', text: "Supporting a cause I feel a strong passion about.", weights: { [DonorType.ACTIVIST]: 5 } },
      { id: '3c', text: "Being able to deduct this donation from my taxes.", weights: { [DonorType.REALIST]: 5 } },
      { id: '3d', text: "Standing out from the crowd.", weights: { [DonorType.RECOGNITION_SEEKER]: 5 } }
    ]
  },
  {
    id: 4,
    text: "What values do you look for in an organization?",
    options: [
      { id: '4a', text: "A steadfast commitment to moral duty and protecting the innocent.", weights: { [DonorType.DEVOUT]: 5 } },
      { id: '4b', text: "Creativity and new ways of thinking.", weights: { [DonorType.ACTIVIST]: 5, [DonorType.ADVOCATE]: 3 } },
      { id: '4c', text: "Risk-taking to solve major social problems.", weights: { [DonorType.ADVOCATE]: 5 } },
      { id: '4d', text: "Efficiency and wise spending of funds.", weights: { [DonorType.REALIST]: 5 } }
    ]
  },
  {
    id: 5,
    text: "How do you prefer to experience giving?",
    options: [
      { id: '5a', text: "It helps me to have a positive view on life.", weights: { [DonorType.INNER_PEACE_SEEKER]: 5 } },
      { id: '5b', text: "I enjoy sharing my experiences with other givers.", weights: { [DonorType.NETWORKER]: 5 } },
      { id: '5c', text: "I like doing something spontaneous that gives me pleasure.", weights: { [DonorType.INNER_PEACE_SEEKER]: 3, [DonorType.ADVOCATE]: 2 } },
      { id: '5d', text: "I want to express my solidarity with the community.", weights: { [DonorType.COMMUNITARIAN]: 5 } }
    ]
  },
  {
    id: 6,
    text: "Which of these benefits matters most to you?",
    options: [
      { id: '6a', text: "Gaining respect and access through my activities.", weights: { [DonorType.NETWORKER]: 5 } },
      { id: '6b', text: "Seeing the world for what it really is and fixing it.", weights: { [DonorType.ACTIVIST]: 3, [DonorType.ADVOCATE]: 2 } },
      { id: '6c', text: "Feeling connected with those in need.", weights: { [DonorType.COMMUNITARIAN]: 5 } },
      { id: '6d', text: "It is an exclusive habit not many people can afford.", weights: { [DonorType.INNER_PEACE_SEEKER]: 5 } }
    ]
  }
];
