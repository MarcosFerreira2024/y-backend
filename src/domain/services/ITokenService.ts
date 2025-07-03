interface ITokenService {
  generateToken(user_id: number): Promise<string>;
  verifyToken(token: string): Promise<{ user_id: number; token: string }>;
}

export default ITokenService;
