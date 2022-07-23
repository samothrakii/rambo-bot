export const validateEnv = () => {
  if (!process.env.TOKEN) {
    console.error("Missing Discord bot token");
    return false;
  }

  if (!process.env.MONGO_URI) {
    console.error("Missing MongoDB URI");
    return false;
  }

  if (!process.env.APP_ID) {
    console.error("Missing Discord application ID");
    return false;
  }

  if (!process.env.GUILD_ID) {
    console.error("Missing Discord target guild ID");
    return false;
  }

  return true;
}
