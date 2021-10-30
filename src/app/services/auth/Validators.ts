export class Validator {
  static email = (email: string): string => {
    const validEmail =
      email.endsWith('@gmail.com') ||
      email.endsWith('@hotmail.com') ||
      email.endsWith('@outlook.com');
    if (!validEmail) {
      throw new Error('El nombre del proveedor no corresponde.');
    }
    return email;
  };
}

export const whiteList = [
  'admin@admin.com',
  'specialist@specialist.com',
  'tester@tester.com',
];
