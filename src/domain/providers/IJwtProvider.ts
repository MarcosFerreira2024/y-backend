interface IJwtProvider {
  generateToken(user_id: number): Promise<string>;
  verifyToken(token: string): Promise<string>;
}

export default IJwtProvider;
