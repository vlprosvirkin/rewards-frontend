export interface IConnectionLog {
  id: number;
  createdAt: string;
  updatedAt: string;
  userAgent: string;
  userId: number;
}

// Определение типа UserQuest
export interface IUserQuest {
  QuestId: number;
  UserId: number;
  bonusRate: number;
  createdAt: string;
  updatedAt: string;
}

// Определение типа Quest
export interface IQuest {
  id: number;
  code: string;
  name: string;
  description: string;
  points: number;
  bonusRate: number;
  category: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  completedQuests: IUserQuest[];
}

// Определение типа User
export interface IUser {
  id: number;
  bonusRate: number;
  address: string;
  username: string;
  lastAccess: string;
  ConnectionLogs: IConnectionLog[];
  hasMint: boolean;
  canMint: boolean;
  charLvl: number;
  completedQuests: IQuest[];
  isMonthTopUser: boolean;
  isWeekTopUser: boolean;
  isReferralUsed: boolean;
  place: number;
  referral: string;
  regPoints: number;
  strikeCount: number;
  totalPoints: number;
  telegramId: string;
  twitterId: string;
  createdAt: string;
  updatedAt: string;
}