#!/usr/bin/env node



const fs = require("fs");
const path = require("path");

const root = process.cwd();
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
const newDir = "app-example";
const newAppDir = "app";
const newDirPath = path.join(root, newDir);

const indexContent = `import { Text, View } from "react-native";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const moveDirectories = async () => {
  try {
    // Create the app-example directory
    await fs.promises.mkdir(newDirPath, { recursive: true });
    console.log(`📁 /${newDir} directory created.`);

    // Move old directories to new app-example directory
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      const newDirPath = path.join(root, newDir, dir);
      if (fs.existsSync(oldDirPath)) {
        await fs.promises.rename(oldDirPath, newDirPath);
        console.log(`➡️ /${dir} moved to /${newDir}/${dir}.`);
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Create new /app directory
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /app directory created.");


      // Create Login.tsx
      const indexPath = path.join(newAppDirPath, "Login.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
      console.log("📄 app/Login.tsx created.");

      // Create _layoutAdmin.tsx
      const layoutPath = path.join(newAppDirPath, "_layoutAdmin.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
      console.log("📄 app/_layoutAdmin.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
        "1. Run `npx expo start` to start a development server.\n2. Edit app/Login.tsx to edit the main screen.\n3. Delete the /app-example directory when you're done referencing it."

    );
  } catch (error) {
    console.error(`Error during script execution: ${error}`);
  }
};

moveDirectories();
