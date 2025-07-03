import JWT from "jsonwebtoken";
import IJwtProvider from "../../../domain/providers/IJwtProvider";
class JwtProvider implements IJwtProvider {
  async generateToken(id: number): Promise<string> {
    return JWT.sign({ user_id: id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1d",
    });
  }
  async verifyToken(
    token: string
  ): Promise<{ user_id: number; token: string }> {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string);

      if (typeof decoded == "string") throw new Error("Invalid token");

      return {
        user_id: decoded.user_id,
        token,
      };
    } catch (error) {
      if (error instanceof JWT.TokenExpiredError)
        throw new Error("Token expired");
      throw new Error("Invalid token");
    }
  }
}

export default JwtProvider;
