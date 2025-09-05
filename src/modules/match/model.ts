import { $Enums } from "@/generated/prisma";

export interface MatchWithDetails {
  stage: {
    tournament: {
      sport: { name: string } | null;
      name: string;
    };
  } | null;
  results: {
    id: string;
    order: number;
    participantOneScore: number;
    participantTwoScore: number;
    matchId: string;
  }[];
  participantOne: { name: string } | null;
  participantTwo: { name: string } | null;
  matchDate: Date | null;
  matchTime: string | null;
  startTime: Date | null;
  endTime: Date | null;
  createdAt: Date;
}

export interface StageWithTournament {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
  parallelMatches: number;
  maxTimePerMatch: number;
  tournamentId: string;
  type: string;
  tournament: {
    id: string;
    name: string;
    location: string;
    type: string;
    description: string;
    startDate: Date;
    endDate: Date;
  };
}

export interface MatchGroup {
  date: string;
  matches: MatchWithDetails[];
}

export interface TournamentParticipantDetails {
  id: string;
  name: string;
  email: string | null;
  order: number;
  phone: string | null;
  tournamentId: string;
}

export interface RoundDetails {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
  stageId: string;
}

export interface MatchResultDetails {
  id: string;
  order: number;
  participantOneScore: number;
  participantTwoScore: number;
  matchId: string;
}
