export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isMale?: boolean;
  age?: number;
  contactPhone: string;
  role: 'client' | 'manager' | 'admin';
  refreshToken: string | null; // вероятно тоже лишнее, но уже не помню, надо проверить. Поидее из кук эта информация должна доставаться и никчему её хранить тут, даже в защищенном виде
  isActivated: boolean;
  activationLink: string; // лишнее тут
}
