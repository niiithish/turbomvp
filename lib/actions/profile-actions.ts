export function getProfileAction() {
  return {
    success: true,
    profile: {
      id: "mock-profile-id",
      user_id: "mock-user-id",
      email: "mock@example.com",
      first_name: "Mock",
      last_name: "User",
      username: "mockuser",
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    error: null as string | null,
  };
}

export function updateProfileAction(_data: unknown) {
  return {
    success: true,
    error: null as string | null,
    details: null,
  };
}
