import fs from "fs";
import path from "path/posix";

export function textLog(textInput) {
  const filePath = path.join(
    process.cwd(),
    "logs.txt"
  );

  fs.appendFile(
    filePath,
    textInput + "\n",
    (err) => {
      if (err) {
        console.error("There is an error:", err);
        return Response.json(
          { message: "error text" },
          { status: 500 }
        );
      }
    }
  );
}
