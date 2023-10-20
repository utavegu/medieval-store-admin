export interface IUsersQueryParameters {
  limit?: string; // на сервере number, но там, вроде стоит преобразовывалка
  offset?: string; // на сервере number, но там, вроде стоит преобразовывалка
  email?: string;
  firstName?: string;
  contactPhone?: string;
}
