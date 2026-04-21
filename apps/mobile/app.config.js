const fs = require("node:fs");
const path = require("node:path");

const appJson = require("./app.json");

const publicEnvKeys = [
  "EXPO_PUBLIC_SUPABASE_ANON_KEY",
  "EXPO_PUBLIC_SUPABASE_ASSET_BUCKET",
  "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "EXPO_PUBLIC_SUPABASE_URL",
  "EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY",
  "EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY",
];

const rootEnv = readEnvFile(path.resolve(__dirname, "..", "..", ".env.local"));
const appEnv = readEnvFile(path.resolve(__dirname, ".env.local"));
const extra = {};

for (const key of publicEnvKeys) {
  extra[key] = process.env[key] || appEnv[key] || rootEnv[key] || "";
}

extra.EXPO_PUBLIC_SUPABASE_ASSET_BUCKET = extra.EXPO_PUBLIC_SUPABASE_ASSET_BUCKET || "song-assets";

module.exports = {
  ...appJson.expo,
  extra: {
    ...(appJson.expo.extra || {}),
    ...extra,
  },
};

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs.readFileSync(filePath, "utf8").split(/\r?\n/).reduce((accumulator, line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return accumulator;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex < 1) {
      return accumulator;
    }

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1);

    return {
      ...accumulator,
      [key]: value,
    };
  }, {});
}
