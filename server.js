require("dotenv").config();
const uuidv4 = require("uuid/v4");
const express = require("express");
const http = require("http");
const Websocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new Websocket.Server({ server });

const logger = require("morgan");
const userScript = require("./libs/modules/userScript");
const repl = require("./libs/modules/repl");

const db = require("./libs/modules/db");

app.use(logger("dev"));

const generateDelimiter = (language, delimiter) => {
  switch (language) {
    case "Ruby":
      return `puts "${delimiter}"\n`;
    case "Javascript":
      return `console.log('${delimiter}');\n`;
    case "Python":
      return `print('${delimiter}')\n`;
  }
};

wss.on("connection", ws => {
  const delimiter = uuidv4();
  const queue = [];

  ws.on("message", message => {
    message = JSON.parse(message);
    console.log(message);

    if (message.type === "saveNotebook") {
      handleSaveNotebook(message.notebook, ws);
    } else if (message.type === "loadNotebook") {
      handleLoadNotebook(message.id, ws);
    } else if (message.type === "executeCode") {
      if (queue.length === 0) {
        queue.push(message);
        executeQueue(queue, ws, delimiter);
      } else {
        queue.push(message);
      }
    }
  });
});

const saveNotebook = notebook => {
  return new Promise((resolve, reject) => {
    resolve(db("SAVE", notebook.id, notebook));
  });
};

const loadNotebook = notebookId => {
  return new Promise((resolve, reject) => {
    queryResult = db("LOAD", notebookId);
    console.log(`queryResult: ${queryResult}`);
    resolve(queryResult);
  });
};

const handleSaveNotebook = (notebook, ws) => {
  saveNotebook(notebook)
    .then(() => {
      ws.send(
        JSON.stringify({
          type: "saveResult",
          data: "Notebook has been saved"
        })
      );
    })
    .catch(error => {
      ws.send(JSON.stringify({ type: "saveResult", data: error }));
      console.log(error);
    });
};

const handleLoadNotebook = (id, ws) => {
  loadNotebook(id)
    .then(notebook => {
      ws.send(JSON.stringify({ type: "loadNotebook", data: notebook }));
    })
    .catch(error => {
      ws.send(JSON.stringify({ type: "loadError", data: error }));
      console.log(error);
    });
};

const handleExecuteCode = (message, ws, delimiter) => {
  return new Promise((resolve, reject) => {
    const { language, codeStrArray } = message;
    const codeString = codeStrArray.join("");
    const delimiterStatement = generateDelimiter(language, delimiter);
    const scriptString = codeStrArray.join(delimiterStatement);

    userScript.writeFile(scriptString, language).then(() => {
      userScript
        .execute(ws, delimiter, language, scriptString, codeStrArray)
        .then(() => repl.execute(codeString, language))
        .then(returnData => repl.parseOutput(returnData, language))
        .then(returnValue => {
          ws.send(
            JSON.stringify({ type: "return", language, data: returnValue })
          );
          resolve();
        })
        .catch((data, type) => {
          // ws.send(JSON.stringify({ language, type, data }));
          resolve();
        });
    });
  });
};

const executeQueue = (queue, ws, delimiter) => {
  handleExecuteCode(queue[0], ws, delimiter).then(() => {
    queue.shift();
    if (queue.length > 0) {
      executeQueue(queue, ws, delimiter);
    }
  });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(8000, () => {
  console.log("App started");
});
