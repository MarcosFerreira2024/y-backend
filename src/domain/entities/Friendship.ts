class Friendship {
  constructor(
    private id: number,
    private user_id: number,
    private friend_id: number,
    private created_at: Date,
    accepted: boolean
  ) {}
}
