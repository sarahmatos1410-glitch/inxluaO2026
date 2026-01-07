
export enum UserRole {
  ADMIN = 'ADMIN',
  ASSISTANT = 'ASSISTANT'
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  password?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  needs: string;
}

export interface DailyLog {
  id: string;
  date: string;
  studentId: string;
  assistantId: string;
  behavior: 'excelente' | 'bom' | 'regular' | 'dificil';
  
  // Campos pedagógicos detalhados
  realizouAtividadesAdaptadas: boolean;
  componentesCurriculares: string;
  metodoRealizacao: 'sozinho' | 'com_ajuda' | 'nao_realizado';
  tipoAjuda?: string;
  houveRecusa: boolean;
  comportamentosRecusa?: string;

  // Novos campos solicitados
  dificuldadeEntendimentoAuxiliar: boolean;
  participouAreasEspecificas: boolean;
  areasEspecificasDetalhadas?: string;
  
  activitiesDone: string;
  notes: string;
  timestamp: number;
}
