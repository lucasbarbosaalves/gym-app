export class MaxNumberOfCheckInsErrors extends Error {
  constructor() {
    super('Maximum number of check-ins reached');
  }
  name = 'MaxNumberOfCheckInsErrors';
}
